import React, { useEffect, useRef, useState } from 'react';
import { SITE_CONTENT } from '../config/siteContent';

interface HeaderProps {
  onNavigateToContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleContactActionClick = () => {
    setMobileMenuOpen(false);
    onNavigateToContact?.();
  };

  return (
    <header className="border-b border-[#292526]/12 bg-[#F7F6F2]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-5 md:px-10 md:py-6">
        {/* Zone 1: Plain text wordmark */}
        <a
          href="#"
          className="inline-flex min-h-[40px] shrink-0 items-center whitespace-nowrap text-lg font-semibold tracking-tight text-[#6D2135] transition-opacity duration-150 hover:opacity-85 md:text-xl"
        >
          {SITE_CONTENT.brandName}
        </a>

        {/* Zone 2: Desktop Navigation */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-[15px] font-medium text-[#292526] md:flex"
        >
          {SITE_CONTENT.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[40px] shrink-0 items-center whitespace-nowrap text-[#292526] underline-offset-8 transition-colors duration-150 hover:text-[#6D2135] hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Button */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={SITE_CONTENT.headerAction.href}
            onClick={handleContactActionClick}
            className="hidden min-h-[42px] shrink-0 whitespace-nowrap rounded-full bg-[#6D2135] px-6 py-2.5 text-sm font-medium text-[#F7F6F2] transition-opacity duration-150 hover:opacity-90 md:inline-flex md:items-center md:justify-center"
          >
            {SITE_CONTENT.headerAction.label}
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#292526]/20 px-4 py-2 text-sm font-medium text-[#6D2135] transition-colors duration-150 hover:border-[#6D2135] md:hidden"
          >
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Primary"
          className="mx-4 mb-4 rounded-2xl border border-[#292526]/12 bg-[#EFECE6]/75 px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col space-y-4">
            {SITE_CONTENT.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-[#292526] transition-colors duration-150 hover:text-[#6D2135]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={SITE_CONTENT.headerAction.href}
                onClick={handleContactActionClick}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#6D2135] px-5 py-3 text-center text-sm font-medium text-[#F7F6F2] transition-opacity duration-150 hover:opacity-90"
              >
                {SITE_CONTENT.headerAction.label}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
