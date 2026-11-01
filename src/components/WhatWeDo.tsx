import React from 'react';
import { SITE_CONTENT } from '../config/siteContent';

export const WhatWeDo: React.FC = () => {
  const { whatWeDo } = SITE_CONTENT;

  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className="mx-auto max-w-[1200px] border-t border-[#292526]/15 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-[#6D2135]">{whatWeDo.label}</p>
          <h2
            id="what-we-do-heading"
            className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-[#6D2135] [text-wrap:balance] md:text-3xl"
          >
            {whatWeDo.heading}
          </h2>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-[#292526]/12 bg-[#EFECE6]/60 px-6 py-2 sm:px-8">
            <dl className="divide-y divide-[#292526]/12">
              {whatWeDo.capabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6 md:py-7"
                >
                  <dt className="text-lg font-semibold tracking-tight text-[#6D2135] sm:col-span-5">
                    {capability.title}
                  </dt>
                  <dd className="text-base leading-relaxed text-[#292526] sm:col-span-7">
                    {capability.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
