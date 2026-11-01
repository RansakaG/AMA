import React from 'react';
import { SITE_CONTENT } from '../config/siteContent';

export const AboutSection: React.FC = () => {
  const { about } = SITE_CONTENT;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-[1200px] border-t border-[#292526]/15 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="rounded-3xl border border-[#292526]/12 bg-[#EFECE6]/50 p-8 sm:p-10 md:p-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#6D2135]">{about.label}</p>
            <h2
              id="about-heading"
              className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-[#6D2135] [text-wrap:balance] md:text-3xl"
            >
              {about.heading}
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="max-w-[62ch] text-lg leading-relaxed text-[#292526] md:text-[19px] md:leading-[1.7]">
              {about.copy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
