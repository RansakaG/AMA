import React, { useEffect, useRef, useState } from 'react';
import { ProjectEntry, SITE_CONTENT } from '../config/siteContent';
import {
  filterProjectsByCategory,
  getCategorySummaryText,
  WORK_CATEGORY_TABS,
  WorkCategory,
} from '../utils/workPortfolio';

interface SelectedWorkProps {
  onEnquireProject?: (projectTitle: string) => void;
}

const ProjectEditorialCard: React.FC<{
  project: ProjectEntry;
  onSelectProject: (project: ProjectEntry) => void;
}> = ({ project, onSelectProject }) => {
  const [imgError, setImgError] = useState(false);
  const hasRealImage = !project.isPlaceholder && Boolean(project.imageSrc) && !imgError;

  return (
    <article className="flex flex-col justify-between border-t border-[#292526]/12 pt-7 md:pt-8">
      <div>
        {/* Clickable large project photograph with smooth hover scale */}
        <button
          type="button"
          onClick={() => onSelectProject(project)}
          aria-label={`View production brief for ${project.name}`}
          className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#292526]/15 bg-[#EFECE6] text-left"
        >
          {hasRealImage ? (
            <img
              src={project.imageSrc}
              alt={project.altText || project.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.015]"
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-between p-6">
              <span className="text-xs font-medium text-[#6D2135]">
                Portfolio Slot {project.indexLabel}
              </span>
              <p className="text-sm font-medium text-[#292526]">{project.placeholderNote}</p>
            </div>
          )}
        </button>

        {/* Minimal editorial project details */}
        <div className="mt-5 space-y-2.5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6D2135]">
              <span>{project.workType}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#292526]/70 tabular-nums">{project.durationOrFormat}</span>
            </div>
            <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-[#292526] [text-wrap:balance]">
              {project.name}
            </h3>
          </div>

          <div>
            <p className="max-w-[65ch] text-[15px] leading-relaxed text-[#292526]/90">
              {project.summary}
            </p>
            <div className="mt-3.5">
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="inline-flex min-h-[40px] items-center text-sm font-medium text-[#6D2135] underline decoration-[#6D2135]/40 underline-offset-6 transition-colors duration-150 hover:decoration-[#6D2135]"
              >
                View production brief
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onEnquireProject }) => {
  const { selectedWork } = SITE_CONTENT;
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('commercials');
  const [selectedProject, setSelectedProject] = useState<ProjectEntry | null>(null);
  const closeModalButtonRef = useRef<HTMLButtonElement>(null);

  const visibleProjects = filterProjectsByCategory(selectedWork.projects, activeCategory);

  const selectedIndex = selectedProject
    ? visibleProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handleStepProject = (delta: number) => {
    if (visibleProjects.length === 0 || selectedIndex === -1) return;
    const nextIndex = (selectedIndex + delta + visibleProjects.length) % visibleProjects.length;
    setSelectedProject(visibleProjects[nextIndex]);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeModalButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      } else if (event.key === 'ArrowRight') {
        handleStepProject(1);
      } else if (event.key === 'ArrowLeft') {
        handleStepProject(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject, selectedIndex]);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto max-w-[1200px] border-t border-[#292526]/15 px-6 py-20 md:px-10 md:py-28"
    >
      {/* Header & Single-Row Segmented Filter Control */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-medium text-[#6D2135]">{selectedWork.statusNotice}</p>
          <h2
            id="work-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-[#6D2135] md:text-3xl"
          >
            {selectedWork.heading}
          </h2>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#292526]/80">
            {getCategorySummaryText(activeCategory)}
          </p>
        </div>

        {/* Single-line segmented filter bar with Commercials, Music Videos, and Events & Live */}
        <div
          role="group"
          aria-label="Filter selected work by production category"
          className="inline-flex flex-wrap items-center gap-1 self-start rounded-2xl border border-[#292526]/15 bg-[#EFECE6]/85 p-1.5 sm:rounded-full md:flex-nowrap lg:self-auto"
        >
          {WORK_CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(tab.id)}
                className={`inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#6D2135] text-[#F7F6F2]'
                    : 'text-[#292526] hover:bg-[#292526]/8 hover:text-[#6D2135]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-xs tabular-nums ${
                    isActive ? 'text-[#F7F6F2]/80' : 'text-[#6D2135]'
                  }`}
                >
                  · {tab.countLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editorial 2-Column Project Showcase Grid */}
      <div className="mt-12 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-2 md:gap-10">
        {visibleProjects.map((project) => (
          <ProjectEditorialCard
            key={project.id}
            project={project}
            onSelectProject={setSelectedProject}
          />
        ))}
      </div>

      {/* 10+ Music Videos Complete Production Index (shown in Music Videos category) */}
      {activeCategory === 'music-videos' && (
        <div className="mt-14 rounded-3xl border border-[#292526]/12 bg-[#EFECE6]/60 p-6 sm:p-8 md:p-10">
          <div>
            <p className="text-xs font-medium text-[#6D2135]">Music Video Production Index</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#292526]">
              12 Completed Music Video Productions (10+ Track Record)
            </h3>
          </div>

          <div className="mt-6 divide-y divide-[#292526]/12 border-b border-t border-[#292526]/12">
            {selectedWork.musicVideoArchive.map((item) => (
              <div
                key={item.index}
                className="grid grid-cols-1 gap-1.5 py-3.5 text-sm sm:grid-cols-12 sm:items-baseline sm:gap-4"
              >
                <span className="font-medium text-[#6D2135] tabular-nums sm:col-span-1">
                  {item.index}
                </span>
                <span className="font-semibold text-[#292526] sm:col-span-4">{item.title}</span>
                <span className="text-[#292526]/75 sm:col-span-3">{item.format}</span>
                <span className="text-[#292526]/80 sm:col-span-3">{item.productionScope}</span>
                <span className="text-xs text-[#292526]/65 tabular-nums sm:col-span-1 sm:text-right">
                  {item.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Production Brief Modal with Keyboard & Prev/Next Stepping */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#292526]/60 p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#292526]/15 bg-[#F7F6F2] p-6 text-[#292526] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#6D2135]">
                  {selectedProject.workType} · {selectedProject.durationOrFormat}
                </p>
                <h3
                  id="modal-project-title"
                  className="mt-1.5 text-xl font-semibold tracking-tight text-[#292526] sm:text-2xl"
                >
                  {selectedProject.name}
                </h3>
              </div>
              <button
                ref={closeModalButtonRef}
                type="button"
                aria-label="Close production brief"
                onClick={() => setSelectedProject(null)}
                className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-full border border-[#292526]/20 px-4 py-1.5 text-xs font-medium text-[#6D2135] transition-colors hover:border-[#6D2135]"
              >
                Close
              </button>
            </div>

            {selectedProject.imageSrc && (
              <div className="mt-5 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#292526]/12 bg-[#EFECE6]">
                <img
                  src={selectedProject.imageSrc}
                  alt={selectedProject.altText || selectedProject.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-[#6D2135]">
                  Brief &amp; Production Approach
                </h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[#292526]/90">
                  {selectedProject.briefAndDeliverables}
                </p>
              </div>

              <div className="border-t border-[#292526]/12 pt-4">
                <h4 className="text-xs font-semibold text-[#6D2135]">Delivered Scope</h4>
                <ul className="mt-2 space-y-1.5 text-sm text-[#292526]/85">
                  {selectedProject.deliverablesList.map((deliverable) => (
                    <li key={deliverable} className="flex items-baseline gap-2">
                      <span aria-hidden="true" className="text-[#6D2135]">
                        ·
                      </span>
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#292526]/12 pt-5">
              <a
                href="#contact"
                onClick={() => {
                  const title = selectedProject.name;
                  setSelectedProject(null);
                  onEnquireProject?.(title);
                }}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#6D2135] px-6 py-2.5 text-sm font-medium text-[#F7F6F2] transition-opacity hover:opacity-90"
              >
                Discuss a Similar Production
              </a>

              {visibleProjects.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStepProject(-1)}
                    aria-label="Previous project in list"
                    className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-[#292526]/20 px-4 py-1.5 text-xs font-medium text-[#292526] transition-colors hover:border-[#6D2135] hover:text-[#6D2135]"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepProject(1)}
                    aria-label="Next project in list"
                    className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-[#292526]/20 px-4 py-1.5 text-xs font-medium text-[#292526] transition-colors hover:border-[#6D2135] hover:text-[#6D2135]"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
