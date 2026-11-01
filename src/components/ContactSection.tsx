import React, { useEffect, useState } from 'react';
import { SITE_CONTENT } from '../config/siteContent';
import {
  EnquiryFieldErrors,
  EnquiryFormInput,
  validateEnquiryInput,
} from '../utils/enquiryValidation';

interface ContactSectionProps {
  nameInputRef?: React.RefObject<HTMLInputElement | null>;
  selectedReferenceProject?: string | null;
  onClearReferenceProject?: () => void;
}

type SubmissionState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'accepted'; message: string }
  | { status: 'unavailable'; message: string }
  | { status: 'error'; message: string };

export const ContactSection: React.FC<ContactSectionProps> = ({
  nameInputRef,
  selectedReferenceProject,
  onClearReferenceProject,
}) => {
  const { contact, verifiedContact } = SITE_CONTENT;

  const [formData, setFormData] = useState<EnquiryFormInput>({
    name: '',
    email: '',
    company: '',
    projectDescription: '',
  });

  const [fieldErrors, setFieldErrors] = useState<EnquiryFieldErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>({ status: 'idle' });

  useEffect(() => {
    if (!selectedReferenceProject) return;
    setFormData((prev) => {
      if (prev.projectDescription.trim().length > 0) {
        return prev;
      }
      return {
        ...prev,
        projectDescription: `We are interested in planning a production similar to "${selectedReferenceProject}". `,
      };
    });
  }, [selectedReferenceProject]);

  const hasVerifiedContactDetails = Boolean(
    verifiedContact.email || verifiedContact.phone || verifiedContact.address
  );

  const handleFieldChange = (field: keyof EnquiryFormInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submissionState.status !== 'idle' && submissionState.status !== 'submitting') {
      setSubmissionState({ status: 'idle' });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateEnquiryInput(formData);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      setSubmissionState({
        status: 'error',
        message: 'Please check the required fields highlighted below.',
      });
      return;
    }

    setFieldErrors({});
    setSubmissionState({ status: 'submitting' });

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json().catch(() => null);

      if (response.ok && payload?.accepted === true) {
        setSubmissionState({
          status: 'accepted',
          message:
            payload.message ||
            'Thank you. Your enquiry has been received by AMA Visual Concepts.',
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          projectDescription: '',
        });
        onClearReferenceProject?.();
        return;
      }

      if (response.status === 400 && payload?.errors) {
        setFieldErrors(payload.errors);
        setSubmissionState({
          status: 'error',
          message: payload.message || 'Please review the highlighted fields.',
        });
        return;
      }

      if (response.status === 503 || payload?.code === 'BACKEND_NOT_CONFIGURED') {
        setSubmissionState({
          status: 'unavailable',
          message:
            payload?.message ||
            'Enquiry delivery is currently unavailable in this preview because the server-side enquiry endpoint (ENQUIRY_WEBHOOK_URL) has not been configured yet. Your entered details have been preserved in the form.',
        });
        return;
      }

      setSubmissionState({
        status: 'error',
        message:
          payload?.message ||
          'We could not complete your enquiry submission right now. Your entered information has been kept in the form.',
      });
    } catch {
      setSubmissionState({
        status: 'unavailable',
        message:
          'Unable to reach the enquiry server in this preview environment. Your entered details remain in the form below until backend enquiry processing is configured.',
      });
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-[1200px] border-t border-[#292526]/15 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-[#6D2135]">{contact.label}</p>
          <h2
            id="contact-heading"
            className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-[#6D2135] [text-wrap:balance] md:text-3xl"
          >
            {contact.heading}
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#292526]/85">
            Share a few details about your business and what you are planning.
          </p>

          {hasVerifiedContactDetails && (
            <div className="mt-8 space-y-3 border-t border-[#292526]/12 pt-6 text-sm text-[#292526]">
              {verifiedContact.email && (
                <div>
                  <span className="font-medium text-[#6D2135]">Email: </span>
                  <a
                    href={`mailto:${verifiedContact.email}`}
                    className="underline underline-offset-4 hover:text-[#6D2135]"
                  >
                    {verifiedContact.email}
                  </a>
                </div>
              )}
              {verifiedContact.phone && (
                <div>
                  <span className="font-medium text-[#6D2135]">Phone: </span>
                  <a
                    href={`tel:${verifiedContact.phone}`}
                    className="underline underline-offset-4 hover:text-[#6D2135]"
                  >
                    {verifiedContact.phone}
                  </a>
                </div>
              )}
              {verifiedContact.address && (
                <div>
                  <span className="font-medium text-[#6D2135]">Address: </span>
                  <span>{verifiedContact.address}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="max-w-xl space-y-6 rounded-3xl border border-[#292526]/12 bg-[#EFECE6]/55 p-6 sm:p-8 md:p-10"
            aria-describedby={
              submissionState.status !== 'idle' ? 'enquiry-form-status' : undefined
            }
          >
            {selectedReferenceProject && (
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#6D2135]/25 bg-[#F7F6F2] px-4 py-3 text-xs text-[#292526]">
                <div>
                  <span className="font-semibold text-[#6D2135]">Reference production: </span>
                  <span>{selectedReferenceProject}</span>
                </div>
                {onClearReferenceProject && (
                  <button
                    type="button"
                    onClick={onClearReferenceProject}
                    className="shrink-0 font-medium text-[#6D2135] underline underline-offset-4"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}

            {submissionState.status !== 'idle' &&
              submissionState.status !== 'submitting' && (
                <div
                  id="enquiry-form-status"
                  role="alert"
                  aria-live="polite"
                  className="rounded-2xl border border-[#6D2135]/35 bg-[#F7F6F2] p-4 text-sm leading-relaxed text-[#292526]"
                >
                  <p className="font-semibold text-[#6D2135]">
                    {submissionState.status === 'accepted'
                      ? 'Enquiry sent'
                      : submissionState.status === 'unavailable'
                        ? 'Enquiry backend not yet configured (Preview State)'
                        : 'Please check your enquiry details'}
                  </p>
                  <p className="mt-1">{submissionState.message}</p>
                </div>
              )}

            {/* Name (Required) */}
            <div>
              <label
                htmlFor="enquiry-name"
                className="block text-sm font-medium text-[#292526]"
              >
                Name <span className="text-[#6D2135]">*</span>
              </label>
              <input
                ref={nameInputRef}
                id="enquiry-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'enquiry-name-error' : undefined}
                disabled={submissionState.status === 'submitting'}
                className="mt-2 block w-full rounded-xl border border-[#292526]/25 bg-[#F7F6F2] px-4 py-3 text-base text-[#292526] placeholder:text-[#292526]/45 focus:border-[#6D2135] disabled:opacity-60"
              />
              {fieldErrors.name && (
                <p
                  id="enquiry-name-error"
                  role="alert"
                  className="mt-1.5 text-sm font-medium text-[#6D2135]"
                >
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email (Required) */}
            <div>
              <label
                htmlFor="enquiry-email"
                className="block text-sm font-medium text-[#292526]"
              >
                Email <span className="text-[#6D2135]">*</span>
              </label>
              <input
                id="enquiry-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'enquiry-email-error' : undefined}
                disabled={submissionState.status === 'submitting'}
                className="mt-2 block w-full rounded-xl border border-[#292526]/25 bg-[#F7F6F2] px-4 py-3 text-base text-[#292526] placeholder:text-[#292526]/45 focus:border-[#6D2135] disabled:opacity-60"
              />
              {fieldErrors.email && (
                <p
                  id="enquiry-email-error"
                  role="alert"
                  className="mt-1.5 text-sm font-medium text-[#6D2135]"
                >
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Company (Optional) */}
            <div>
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="enquiry-company"
                  className="block text-sm font-medium text-[#292526]"
                >
                  Company
                </label>
                <span className="text-xs text-[#292526]/65">Optional</span>
              </div>
              <input
                id="enquiry-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={(e) => handleFieldChange('company', e.target.value)}
                aria-invalid={Boolean(fieldErrors.company)}
                aria-describedby={fieldErrors.company ? 'enquiry-company-error' : undefined}
                disabled={submissionState.status === 'submitting'}
                className="mt-2 block w-full rounded-xl border border-[#292526]/25 bg-[#F7F6F2] px-4 py-3 text-base text-[#292526] placeholder:text-[#292526]/45 focus:border-[#6D2135] disabled:opacity-60"
              />
              {fieldErrors.company && (
                <p
                  id="enquiry-company-error"
                  role="alert"
                  className="mt-1.5 text-sm font-medium text-[#6D2135]"
                >
                  {fieldErrors.company}
                </p>
              )}
            </div>

            {/* Project Description (Required) */}
            <div>
              <label
                htmlFor="enquiry-description"
                className="block text-sm font-medium text-[#292526]"
              >
                Project description <span className="text-[#6D2135]">*</span>
              </label>
              <textarea
                id="enquiry-description"
                name="projectDescription"
                rows={5}
                required
                value={formData.projectDescription}
                onChange={(e) => handleFieldChange('projectDescription', e.target.value)}
                aria-invalid={Boolean(fieldErrors.projectDescription)}
                aria-describedby={
                  fieldErrors.projectDescription ? 'enquiry-description-error' : undefined
                }
                disabled={submissionState.status === 'submitting'}
                className="mt-2 block w-full resize-y rounded-xl border border-[#292526]/25 bg-[#F7F6F2] px-4 py-3 text-base leading-relaxed text-[#292526] placeholder:text-[#292526]/45 focus:border-[#6D2135] disabled:opacity-60"
              />
              {fieldErrors.projectDescription && (
                <p
                  id="enquiry-description-error"
                  role="alert"
                  className="mt-1.5 text-sm font-medium text-[#6D2135]"
                >
                  {fieldErrors.projectDescription}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submissionState.status === 'submitting'}
                className="inline-flex min-h-[46px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#6D2135] px-7 py-3.5 text-[15px] font-medium text-[#F7F6F2] transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-65"
              >
                {submissionState.status === 'submitting'
                  ? 'Sending Enquiry…'
                  : contact.submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
