import { ProjectEntry } from '../config/siteContent';

export type WorkCategory = 'commercials' | 'music-videos' | 'events';

export interface CategoryTab {
  id: WorkCategory;
  label: string;
  countLabel: string;
}

export const WORK_CATEGORY_TABS: CategoryTab[] = [
  { id: 'commercials', label: 'Commercials', countLabel: '4' },
  { id: 'music-videos', label: 'Music Videos', countLabel: '10+' },
  { id: 'events', label: 'Events & Live', countLabel: '2' },
];

export function filterProjectsByCategory(
  projects: ProjectEntry[],
  category: WorkCategory
): ProjectEntry[] {
  return projects.filter((project) => project.category === category);
}

export function getCategorySummaryText(category: WorkCategory): string {
  switch (category) {
    case 'commercials':
      return '4 broadcast and digital commercial productions — from concept development and storyboarding to cinema-grade execution.';
    case 'music-videos':
      return 'More than 10 music video productions spanning narrative direction, studio performance sessions and location cinematography.';
    case 'events':
      return 'Multi-camera live event coverage, stage visual direction and post-event highlight films.';
  }
}
