/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { WhatWeDo } from './components/WhatWeDo';

export default function App() {
  const contactNameInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedReferenceProject, setSelectedReferenceProject] = useState<string | null>(
    null
  );

  const handleFocusContactForm = (projectTitle?: string) => {
    if (projectTitle) {
      setSelectedReferenceProject(projectTitle);
    }
    window.setTimeout(() => {
      contactNameInputRef.current?.focus({ preventScroll: true });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#292526]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#6D2135] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#F7F6F2]"
      >
        Skip to main content
      </a>

      <Header onNavigateToContact={() => handleFocusContactForm()} />

      <main id="main-content">
        <Hero onDiscussProjectClick={() => handleFocusContactForm()} />
        <SelectedWork onEnquireProject={(title) => handleFocusContactForm(title)} />
        <WhatWeDo />
        <AboutSection />
        <ContactSection
          nameInputRef={contactNameInputRef}
          selectedReferenceProject={selectedReferenceProject}
          onClearReferenceProject={() => setSelectedReferenceProject(null)}
        />
      </main>

      <Footer />
    </div>
  );
}
