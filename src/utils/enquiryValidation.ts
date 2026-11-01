export interface EnquiryFormInput {
  name: string;
  email: string;
  company: string;
  projectDescription: string;
}

export interface EnquiryFieldErrors {
  name?: string;
  email?: string;
  company?: string;
  projectDescription?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: EnquiryFieldErrors;
  sanitized: EnquiryFormInput;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function sanitizeEnquiryInput(input: Partial<EnquiryFormInput>): EnquiryFormInput {
  return {
    name: typeof input.name === 'string' ? input.name.trim() : '',
    email: typeof input.email === 'string' ? input.email.trim() : '',
    company: typeof input.company === 'string' ? input.company.trim() : '',
    projectDescription:
      typeof input.projectDescription === 'string' ? input.projectDescription.trim() : '',
  };
}

export function validateEnquiryInput(input: Partial<EnquiryFormInput>): ValidationResult {
  const sanitized = sanitizeEnquiryInput(input);
  const errors: EnquiryFieldErrors = {};

  if (!sanitized.name) {
    errors.name = 'Please enter your name.';
  } else if (sanitized.name.length < 2) {
    errors.name = 'Please enter at least 2 characters for your name.';
  } else if (sanitized.name.length > 120) {
    errors.name = 'Name must be 120 characters or fewer.';
  }

  if (!sanitized.email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(sanitized.email) || sanitized.email.length > 254) {
    errors.email = 'Please enter a valid email address (for example, name@company.com).';
  }

  if (sanitized.company && sanitized.company.length > 160) {
    errors.company = 'Company name must be 160 characters or fewer.';
  }

  if (!sanitized.projectDescription) {
    errors.projectDescription = 'Please include a brief description of your project.';
  } else if (sanitized.projectDescription.length < 15) {
    errors.projectDescription =
      'Please share a little more detail about your project (at least 15 characters).';
  } else if (sanitized.projectDescription.length > 3000) {
    errors.projectDescription = 'Project description must be 3,000 characters or fewer.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}

export function isEnquiryBackendConfigured(env: Record<string, string | undefined>): boolean {
  const rawUrl = env.ENQUIRY_WEBHOOK_URL?.trim() ?? '';
  if (!rawUrl || rawUrl === 'MY_ENQUIRY_WEBHOOK_URL') {
    return false;
  }
  try {
    const parsed = new URL(rawUrl);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}
