import React, { useState } from 'react';
import { SITE_CONTENT } from '../config/siteContent';

interface HeroProps {
  onDiscussProjectClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscussProjectClick }) => {
  const { hero } = SITE_CONTENT;
  const [imageFailed, setImageFailed] = useState(false);
  const showRealImage =
    !hero.featuredMedia.isPlaceholder && Boolean(hero.featuredMedia.imageSrc) && !imageFailed;

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-[1200px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24"
    >
      <div className="max-w-3xl">
        <h1
          id="hero-heading"
          className="text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.12] tracking-tight text-[#6D2135] [text-wrap:balance]"
        >
          {hero.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#292526] md:text-xl md:leading-[1.65]">
          {hero.supportingText}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={hero.primaryAction.href}
            onClick={onDiscussProjectClick}
            className="inline-flex min-h-[46px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#6D2135] px-7 py-3.5 text-[15px] font-medium text-[#F7F6F2] transition-opacity duration-150 hover:opacity-90"
          >
            {hero.primaryAction.label}
          </a>

          <a
            href={hero.secondaryAction.href}
            className="inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap py-2 text-[15px] font-medium text-[#6D2135] underline decoration-[#6D2135]/45 underline-offset-8 transition-colors duration-150 hover:decoration-[#6D2135]"
          >
            {hero.secondaryAction.label}
          </a>
        </div>
      </div>

      {/* Reserved 16:9 lead visual frame below introduction */}
      <figure className="mt-14 md:mt-16">
        <div className="relative aspect-[16/9] max-h-[480px] w-full overflow-hidden rounded-3xl border border-[#292526]/15 bg-[#EFECE6]">
          {showRealImage ? (
            <img
              src={hero.featuredMedia.imageSrc}
              alt={hero.featuredMedia.altText || hero.featuredMedia.title}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-between p-6 sm:p-10 md:p-12">
              <div className="flex items-center justify-between border-b border-[#292526]/12 pb-4 text-xs text-[#292526]/75">
                <span>AMA Visual Concepts — Lead Visual Frame</span>
                <span className="tabular-nums">16 : 9 Proportion</span>
              </div>

              <div className="max-w-xl py-4">
                <p className="text-base font-semibold text-[#6D2135]">
                  {hero.featuredMedia.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#292526]/80">
                  {hero.featuredMedia.caption}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#292526]/12 pt-4 text-xs text-[#292526]/70">
                <span>Asset status: Awaiting approved AMA production photography</span>
                <span>No sample stock photography used</span>
              </div>
            </div>
          )}
        </div>
        <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-[#292526]/70">
          <span>{hero.featuredMedia.title}</span>
          <span>Colombo, Sri Lanka · Strategy, Production &amp; Digital</span>
        </figcaption>
      </figure>
    </section>
  );
};
