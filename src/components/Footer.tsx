import React from 'react';
import { SITE_CONTENT } from '../config/siteContent';

export const Footer: React.FC = () => {
  const { brandName, verifiedContact, footer } = SITE_CONTENT;
  const socialLinks = verifiedContact.socialLinks ?? [];

  return (
    <footer className="border-t border-[#292526]/15 bg-[#F7F6F2]">
      <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 md:py-14">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-baseline">
          <p className="text-base font-semibold tracking-tight text-[#6D2135]">
            {brandName}
          </p>

          <p className="text-sm text-[#292526]/80">
            &copy; {footer.copyrightYear} {brandName}. All rights reserved.
          </p>
        </div>

        {socialLinks.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-6 text-sm text-[#292526]">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors duration-150 hover:text-[#6D2135]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[#292526]/75">
          {footer.privacyNotice}
        </p>
      </div>
    </footer>
  );
};
