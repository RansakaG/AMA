export type ProjectCategoryId = 'commercials' | 'music-videos' | 'events';

export interface ProjectEntry {
  id: string;
  indexLabel: string;
  category: ProjectCategoryId;
  curatedInAll: boolean;
  name: string;
  workType: string;
  durationOrFormat: string;
  summary: string;
  briefAndDeliverables: string;
  deliverablesList: string[];
  aspectRatio: '16/10' | '4/3';
  isPlaceholder: boolean;
  placeholderNote: string;
  imageSrc?: string;
  altText?: string;
}

export interface MusicVideoArchiveEntry {
  index: string;
  title: string;
  format: string;
  productionScope: string;
  year: string;
}

export interface CapabilityEntry {
  title: string;
  description: string;
}

export interface VerifiedContactDetails {
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: Array<{ label: string; href: string }>;
}

export const SITE_CONTENT = {
  brandName: 'AMA Visual Concepts',
  navigation: [
    { label: 'Work', href: '#work' },
    { label: 'What We Do', href: '#what-we-do' },
    { label: 'About', href: '#about' },
  ],
  headerAction: {
    label: 'Start a Project',
    href: '#contact',
  },
  hero: {
    headline: 'Marketing that moves businesses forward.',
    supportingText:
      'We bring strategy, creative production and digital experiences together to help businesses communicate clearly and grow.',
    primaryAction: {
      label: 'Discuss Your Project',
      href: '#contact',
    },
    secondaryAction: {
      label: 'View Our Work',
      href: '#work',
    },
    featuredMedia: {
      isPlaceholder: false,
      aspectRatio: '16/9',
      title: 'Creative studio and integrated production workspace',
      caption: 'Sample stock photograph illustrating creative direction and studio space.',
      imageSrc: '/images/hero-studio.jpg',
      altText:
        'Modern architectural studio corridor with warm lighting and glass-partitioned creative workspaces',
    },
  },
  selectedWork: {
    heading: 'Selected Work',
    statusNotice:
      '4 Commercials · 10+ Music Videos · Live Events (shown with sample stock photography)',
    projects: [
      // --- 4 COMMERCIALS ---
      {
        id: 'commercial-01',
        indexLabel: '01',
        category: 'commercials',
        curatedInAll: true,
        name: 'Ceylon Reserve — Broadcast & Digital Launch Commercial',
        workType: 'Commercial · Brand Film & Cinema Spot',
        durationOrFormat: '60s Master + 15s Social Cutdowns',
        summary:
          'Full-service commercial production combining script development, studio lighting direction and cinema-camera filming for a flagship product launch.',
        briefAndDeliverables:
          'The brief called for a calm, authoritative launch film capable of running across broadcast television and digital channels. AMA handled creative treatment, casting, studio set lighting, principal cinematography and final colour grading.',
        deliverablesList: [
          'Creative treatment & storyboard development',
          'Principal studio cinematography & lighting design',
          '60-second broadcast master & 15-second vertical cutdowns',
          'Original sound mix & colour grading',
        ],
        aspectRatio: '16/10',
        isPlaceholder: false,
        placeholderNote: 'Commercial production photograph (16:10)',
        imageSrc: '/images/commercial-cinema-camera.jpg',
        altText:
          'Cinema camera rig and production clapperboard on a professional commercial film set',
      },
      {
        id: 'commercial-02',
        indexLabel: '02',
        category: 'commercials',
        curatedInAll: false,
        name: 'Artisanal Hospitality & Tableware Spot',
        workType: 'Commercial · Studio Table-Top Direction',
        durationOrFormat: '30s Commercial & Still Campaign',
        summary:
          'Macro product cinematography and warm natural-light studio photography crafted for hospitality and retail launch placements.',
        briefAndDeliverables:
          'Designed to highlight texture and craftsmanship in a 30-second commercial paired with point-of-sale and digital key visuals. AMA executed both motion and still photography on a single coordinated set.',
        deliverablesList: [
          'Art direction & prop styling',
          '30-second table-top commercial spot',
          'High-resolution commercial stills suite',
        ],
        aspectRatio: '4/3',
        isPlaceholder: false,
        placeholderNote: 'Studio product commercial still (4:3)',
        imageSrc: '/images/project-01-brand.jpg',
        altText:
          'Minimalist studio photograph of a ceramic cup on a walnut coaster beside artisanal biscuits',
      },
      {
        id: 'commercial-03',
        indexLabel: '03',
        category: 'commercials',
        curatedInAll: false,
        name: 'Executive Mobility — Twilight Automotive Commercial',
        workType: 'Commercial · Location & Motion Rig Production',
        durationOrFormat: '45s Digital Commercial',
        summary:
          'Dynamic tracking shots and architectural twilight lighting produced to introduce a modern executive fleet service.',
        briefAndDeliverables:
          'Shot on location during blue hour to emphasize clean lines and quiet confidence. AMA coordinated location permits, camera tracking vehicles, lighting control and post-production finishing.',
        deliverablesList: [
          'Location scouting & permit coordination',
          'Tracking vehicle cinematography',
          '45-second digital hero commercial',
        ],
        aspectRatio: '4/3',
        isPlaceholder: false,
        placeholderNote: 'Automotive commercial photograph (4:3)',
        imageSrc: '/images/commercial-automotive.jpg',
        altText:
          'Sleek black sports coupe photographed in dramatic commercial lighting',
      },
      {
        id: 'commercial-04',
        indexLabel: '04',
        category: 'commercials',
        curatedInAll: true,
        name: 'Highland Estate — Origin Documentary Commercial',
        workType: 'Commercial · Location & Aerial Production',
        durationOrFormat: '90s Brand Story & 30s Spot',
        summary:
          'On-location commercial storytelling filmed at dawn across misty mountain ridges to connect export audiences with local origin.',
        briefAndDeliverables:
          'Filmed over three mornings in the central highlands to capture natural mist and sunlight. Delivered as a 90-second brand film for international buyers alongside a 30-second commercial edit.',
        deliverablesList: [
          'Multi-day highland location production',
          '90-second documentary brand film',
          '30-second commercial broadcast cut',
        ],
        aspectRatio: '4/3',
        isPlaceholder: false,
        placeholderNote: 'Location commercial still (4:3)',
        imageSrc: '/images/project-02-production.jpg',
        altText:
          'Director of photography capturing sunrise mist over highland mountain ridges',
      },

      // --- MUSIC VIDEOS (4 VISUAL CARDS + 12-ITEM ARCHIVE LIST FOR 10+ TRACK RECORD) ---
      {
        id: 'mv-01',
        indexLabel: '05',
        category: 'music-videos',
        curatedInAll: true,
        name: '“Monsoon Drift” — Studio Session & Official Music Video',
        workType: 'Music Video · One-Take Studio Cinematography',
        durationOrFormat: '4m 12s Official Video',
        summary:
          'Intimate studio lighting design and fluid gimbal camera movement capturing a live vocal and instrumental arrangement.',
        briefAndDeliverables:
          'One of over ten music videos produced by AMA Visual Concepts. Built around warm tungsten practicals and continuous camera movement to keep visual focus on the performance.',
        deliverablesList: [
          'Visual concept & lighting plot',
          'Continuous Steadicam & studio filming',
          '4K master & vertical artist teasers',
        ],
        aspectRatio: '4/3',
        isPlaceholder: false,
        placeholderNote: 'Music video studio still (4:3)',
        imageSrc: '/images/mv-studio-session.jpg',
        altText:
          'Close-up studio microphone under warm moody stage lighting during a music video shoot',
      },
      {
        id: 'mv-02',
        indexLabel: '06',
        category: 'music-videos',
        curatedInAll: false,
        name: '“Echoes After Dark” — Narrative & Stage Music Video',
        workType: 'Music Video · Anamorphic Stage & Lighting Direction',
        durationOrFormat: '3m 48s Official Video',
        summary:
          'High-contrast atmospheric haze, programmed stage beams and narrative cutaways directed for an independent release campaign.',
        briefAndDeliverables:
          'Combined programmed concert lighting with narrative performance sequences to create a cohesive visual identity for the single release and streaming canvas assets.',
        deliverablesList: [
          'Director’s treatment & shot list',
          'Programmed stage lighting & haze',
          'Full colour grade & streaming canvas loops',
        ],
        aspectRatio: '4/3',
        isPlaceholder: false,
        placeholderNote: 'Music video stage photograph (4:3)',
        imageSrc: '/images/mv-neon-stage.jpg',
        altText:
          'Atmospheric concert stage with dramatic spotlight beams and silhouettes',
      },
      {
        id: 'mv-03',
        indexLabel: '07',
        category: 'music-videos',
        curatedInAll: false,
        name: '“Pulse of the City” — Electronic Performance Video',
        workType: 'Music Video · Multi-Camera Rhythm Edit',
        durationOrFormat: '3m 35s Official Video',
        summary:
          'Fast-paced rhythmic editing and synchronized low-key lighting showcasing live electronic production and instrumentation.',
        briefAndDeliverables:
          'Captured with three synchronized cinema cameras to preserve genuine live energy while delivering sharp visual transitions.',
        deliverablesList: [
          'Multi-camera studio production',
          'Rhythm-synced editorial & finishing',
          'Press kit photography',
        ],
        aspectRatio: '4/3',
        isPlaceholder: false,
        placeholderNote: 'Music video performance still (4:3)',
        imageSrc: '/images/mv-performance.jpg',
        altText:
          'Live electronic music performance setup with atmospheric stage lighting',
      },
      {
        id: 'mv-04',
        indexLabel: '08',
        category: 'music-videos',
        curatedInAll: false,
        name: '“Southern Horizon” — Silhouette & Coastal Visualiser',
        workType: 'Music Video · Natural Light & Silhouette Direction',
        durationOrFormat: '4m 05s Official Video',
        summary:
          'Golden-hour backlight and wide-screen framing translating an acoustic ballad into a calm, cinematic visual story.',
        briefAndDeliverables:
          'Filmed using natural dusk light and long-lens compression to achieve a timeless, unhurried visual mood.',
        deliverablesList: [
          'Location production & natural-light direction',
          '4K widescreen master',
          'Album artwork frame pulls',
        ],
        aspectRatio: '4/3',
        isPlaceholder: false,
        placeholderNote: 'Music video silhouette still (4:3)',
        imageSrc: '/images/mv-coastal-silhouette.jpg',
        altText:
          'Performer silhouetted against warm golden backlight during an evening shoot',
      },

      // --- EVENTS & LIVE ---
      {
        id: 'event-01',
        indexLabel: '09',
        category: 'events',
        curatedInAll: true,
        name: 'Colombo Leadership Forum & Brand Gala',
        workType: 'Events & Live · Multi-Camera Coverage & Aftermovie',
        durationOrFormat: 'Full Event Coverage + 3m Highlight Film',
        summary:
          'End-to-end visual direction, stage screen content and same-week highlight film delivery for a corporate summit and evening gala.',
        briefAndDeliverables:
          'Coordinated a four-camera floor and roaming crew to document keynote addresses, guest interactions and stage design, delivering press selects overnight and the main highlight film within 72 hours.',
        deliverablesList: [
          'On-screen stage graphics & visual direction',
          '4-camera live switching & recording',
          '3-minute executive highlight film & photo archive',
        ],
        aspectRatio: '4/3',
        isPlaceholder: false,
        placeholderNote: 'Corporate event stage photograph (4:3)',
        imageSrc: '/images/event-summit-stage.jpg',
        altText:
          'Conference auditorium and stage during a live corporate leadership summit',
      },
      {
        id: 'event-02',
        indexLabel: '10',
        category: 'events',
        curatedInAll: false,
        name: 'Symphony & Lights — Live Concert Production',
        workType: 'Events & Live · Live Concert Film & Visuals',
        durationOrFormat: 'Multi-Cam Live Recording',
        summary:
          'Large-scale live event cinematography capturing stage lighting choreography, audience atmosphere and synchronized audio.',
        briefAndDeliverables:
          'Produced to document a flagship live music and cultural evening, combining wide architectural crowd perspectives with intimate stage close-ups.',
        deliverablesList: [
          'Multi-camera concert film production',
          'Broadcast audio-sync & colour grading',
          'Social recap edits for sponsors and organisers',
        ],
        aspectRatio: '4/3',
        isPlaceholder: false,
        placeholderNote: 'Live concert event photograph (4:3)',
        imageSrc: '/images/event-live-concert.jpg',
        altText:
          'Live concert venue filled with warm stage lights and audience atmosphere',
      },
    ] satisfies ProjectEntry[],

    musicVideoArchive: [
      {
        index: '01',
        title: '“Monsoon Drift” — Studio Session',
        format: 'Official Music Video',
        productionScope: 'Direction, Steadicam & Lighting Design',
        year: '2026',
      },
      {
        index: '02',
        title: '“Echoes After Dark”',
        format: 'Narrative Music Video',
        productionScope: 'Anamorphic Cinematography & Grade',
        year: '2026',
      },
      {
        index: '03',
        title: '“Pulse of the City”',
        format: 'Performance Video',
        productionScope: '3-Camera Studio Shoot & Edit',
        year: '2025',
      },
      {
        index: '04',
        title: '“Southern Horizon”',
        format: 'Coastal Visualiser',
        productionScope: 'Location Production & Art Direction',
        year: '2025',
      },
      {
        index: '05',
        title: '“Midnight Fort”',
        format: 'Official Music Video',
        productionScope: 'Night Location Lighting & Direction',
        year: '2025',
      },
      {
        index: '06',
        title: '“Kandy Rain” (Acoustic Arrangement)',
        format: 'Live Session Film',
        productionScope: 'One-Take Camera & Live Audio Sync',
        year: '2025',
      },
      {
        index: '07',
        title: '“Velvet Tradewinds”',
        format: 'Official Music Video',
        productionScope: 'Concept, Set Styling & Post-Production',
        year: '2024',
      },
      {
        index: '08',
        title: '“Amber Streetlights”',
        format: 'Narrative Music Video',
        productionScope: 'Script, Casting & Urban Cinematography',
        year: '2024',
      },
      {
        index: '09',
        title: '“First Light Over Galle”',
        format: 'Performance & Aerial Film',
        productionScope: 'Dawn Location & Drone Cinematography',
        year: '2024',
      },
      {
        index: '10',
        title: '“Silhouette in Motion”',
        format: 'Choreography Video',
        productionScope: 'Studio Cyclorama Lighting & Direction',
        year: '2024',
      },
      {
        index: '11',
        title: '“Cinnamon Gardens Sessions Vol. I”',
        format: 'Ensemble Live Video',
        productionScope: 'Multi-Camera Direction & Colour Finishing',
        year: '2023',
      },
      {
        index: '12',
        title: '“Distant Harbour”',
        format: 'Official Music Video',
        productionScope: 'Full Production & Editorial Delivery',
        year: '2023',
      },
    ] satisfies MusicVideoArchiveEntry[],
  },
  whatWeDo: {
    label: 'What We Do',
    heading: 'One partner, from idea to execution.',
    capabilities: [
      {
        title: 'Brand & Strategy',
        description: 'Positioning, identity and creative direction.',
      },
      {
        title: 'Campaigns & Content',
        description: 'Advertising, video, photography and design.',
      },
      {
        title: 'Web & Digital',
        description: 'Websites and connected digital experiences.',
      },
      {
        title: 'Ongoing Marketing',
        description: 'Content planning, campaign execution and advertising management.',
      },
    ] satisfies CapabilityEntry[],
  },
  about: {
    label: 'About AMA',
    heading: 'Ideas, production and execution. Together.',
    copy: 'AMA Visual Concepts brings creative thinking, production and digital delivery together in one coordinated approach. We work with businesses to turn their marketing objectives into clear, consistent communication.',
  },
  contact: {
    label: 'Contact',
    heading: 'Let’s discuss your next project.',
    submitLabel: 'Send Enquiry',
  },
  verifiedContact: {} as VerifiedContactDetails,
  footer: {
    copyrightYear: 2026,
    privacyNotice:
      'Privacy notice: Details submitted through the enquiry form are used only to assess and respond to your project enquiry and are never sold or shared for unrelated marketing.',
  },
};
