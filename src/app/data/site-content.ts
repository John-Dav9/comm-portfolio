export type Language = 'fr' | 'en';

export interface NavLabels {
  home: string;
  about: string;
  projects: string;
  blog: string;
  contact: string;
  admin: string;
}

export interface HeaderContent {
  brandTitle: string;
  subtitle: string;
  brandLogoUrl: string;
  brandLogoAlt: string;
  nav: NavLabels;
}

export interface FooterContent {
  rights: string;
  contactLabel: string;
  email: string;
  copyright: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    imageUrl: string;
    imageAlt: string;
    actions: {
      primary: string;
      secondary: string;
    };
    tags: string[];
  };
  panel: {
    pill: string;
    title: string;
    list: string[];
    micro: Array<{ value: string; label: string }>;
  };
  proof: {
    cards: Array<{ pill: string; title: string; text: string }>;
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: Array<{ title: string; text: string; items: string[] }>;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: Array<{ number: string; title: string; text: string }>;
  };
  showcase: {
    eyebrow: string;
    title: string;
    cards: Array<{ pill: string; title: string; text: string; meta: string }>;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: Array<{ text: string; author: string }>;
  };
  cta: {
    eyebrow: string;
    title: string;
    lead: string;
    button: string;
  };
  media: {
    eyebrow: string;
    title: string;
    lead: string;
    photos: string;
    videos: string;
    docs: string;
    audio: string;
    emptyPhotos: string;
    emptyVideos: string;
    emptyDocs: string;
    emptyAudio: string;
  };
}

export interface AboutContent {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    imageUrl: string;
    imageAlt: string;
    metrics: Array<{ value: string; label: string }>;
    cardTitle: string;
    cardList: string[];
  };
  values: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  timeline: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; detail: string }>;
  };
  highlights: {
    title: string;
    items: Array<{ title: string; detail: string }>;
  };
  partners: {
    eyebrow: string;
    title: string;
    items: string[];
    logos: Array<{ name: string; url: string }>;
  };
  partnerMedia: {
    eyebrow: string;
    title: string;
    empty: string;
  };
  publications: {
    eyebrow: string;
    title: string;
    empty: string;
  };
  showreel: {
    eyebrow: string;
    title: string;
    empty: string;
  };
  pressKit: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  cta: {
    eyebrow: string;
    title: string;
    lead: string;
    button: string;
  };
}

export interface ProjectsContent {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    imageUrl: string;
    imageAlt: string;
    panelTitle: string;
    bullets: string[];
  };
  media: {
    eyebrow: string;
    title: string;
    emptyPhoto: string;
    emptyVideo: string;
    emptyDoc: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    lead: string;
    button: string;
  };
}

export interface BlogContent {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    imageUrl: string;
    imageAlt: string;
    listTitle: string;
    list: string[];
  };
  resources: {
    eyebrow: string;
    title: string;
    pdfTitle: string;
    audioTitle: string;
    emptyPdf: string;
    emptyAudio: string;
    hint: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    lead: string;
    button: string;
  };
}

export interface ContactContent {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  cards: Array<{
    title: string;
    lines: string[];
  }>;
  form: {
    fullName: string;
    email: string;
    phone: string;
    profile: string;
    projectType: string;
    message: string;
    consent: string;
    submit: string;
    success: string;
  };
  errors: {
    fullName: string;
    email: string;
    message: string;
    consent: string;
  };
  profileOptions: Array<{ value: string; label: string }>;
  projectOptions: Array<{ value: string; label: string }>;
}

export interface SiteContent {
  theme: string;
  header: HeaderContent;
  footer: FooterContent;
  home: HomeContent;
  about: AboutContent;
  projects: ProjectsContent;
  blog: BlogContent;
  contact: ContactContent;
}

export interface LocalizedSiteContent {
  fr: SiteContent;
  en: SiteContent;
}

export const DEFAULT_SITE_CONTENT: LocalizedSiteContent = {
  fr: {
    theme: 'sable',
    header: {
      brandTitle: 'Carnelle Nguepi',
      subtitle: 'Communication · Journalisme · Présentation média',
      brandLogoUrl: '',
      brandLogoAlt: 'Logo Carnelle Nguepi',
      nav: {
        home: 'Accueil',
        about: 'À propos',
        projects: 'Projets',
        blog: 'Journal',
        contact: 'Contact',
        admin: 'Espace admin'
      }
    },
    footer: {
      rights: 'Tous droits réservés.',
      contactLabel: 'Contact presse',
      email: 'contact@carnellenguepi.com',
      copyright: '© 2026 Carnelle Nguepi.'
    },
    home: {
      hero: {
        eyebrow: 'Portfolio',
        title: 'Carnelle Nguepi, communicante et voix média.',
        lead:
          'Journalisme, radio, télévision, scène et communication digitale : je construis des histoires claires, des formats engageants et des preuves visibles.',
        imageUrl: '',
        imageAlt: 'Portrait de Carnelle Nguepi',
        actions: {
          primary: 'Me contacter',
          secondary: 'Voir mes expertises'
        },
        tags: ['Journalisme', 'Radio & TV', 'Événementiel']
      },
      panel: {
        pill: 'Ce que vous découvrez',
        title: 'Un profil complet et crédible',
        list: [
          'Des publications et enquêtes mises en contexte.',
          'Des extraits audio/vidéo qui résument l’essentiel.',
          'Des preuves chiffrées et des retours terrain.'
        ],
        micro: [
          { value: '5 formats', label: 'Presse · radio · TV · scène · digital' },
          { value: '1 mission', label: 'Rendre l’impact lisible' }
        ]
      },
      proof: {
        cards: [
          {
            pill: 'Éditorial',
            title: 'Publications',
            text: 'Articles, enquêtes et chroniques structurés par thématiques.'
          },
          {
            pill: 'Radio',
            title: 'Identité sonore',
            text: 'Extraits audio, concept d’émission et preuves d’audience.'
          },
          {
            pill: 'TV & scène',
            title: 'Présence',
            text: 'Showreel court, passages TV et interventions événementielles.'
          }
        ]
      },
      services: {
        eyebrow: 'Expertises',
        title: 'Une communication plurimédia, ancrée dans le réel.',
        lead:
          'Carnelle réunit le fond journalistique, la voix radio, la présence TV et la puissance du digital pour donner du sens aux messages.',
        cards: [
          {
            title: 'Journalisme',
            text: 'Articles, enquêtes, chroniques et sujets de fond avec rigueur.',
            items: ['Publications PDF et liens', 'Thématiques couvertes', 'Médias partenaires']
          },
          {
            title: 'Radio & TV',
            text: 'Animateur radio, présentatrice TV et format court impactant.',
            items: ['Extraits audio et vidéo', 'Concept d’émission', 'Présence caméra & diction']
          },
          {
            title: 'Événementiel & digital',
            text: 'Maître de cérémonie et communication sociale orientée résultats.',
            items: ['Vidéos d’événements', 'Études de cas digitales', 'Statistiques avant/après']
          }
        ]
      },
      process: {
        eyebrow: 'Manière de travailler',
        title: 'Une communication claire, humaine et structurée.',
        steps: [
          { number: '01', title: 'Écoute', text: 'Comprendre les enjeux et le contexte réel.' },
          { number: '02', title: 'Rigueur', text: 'Construire un récit précis et fiable.' },
          { number: '03', title: 'Impact', text: 'Mettre en avant les preuves décisives.' }
        ]
      },
      showcase: {
        eyebrow: 'Sélections',
        title: 'Ce que vous trouverez dans son portfolio.',
        cards: [
          {
            pill: 'Journalisme',
            title: 'Enquêtes & reportages',
            text: 'Articles publiés, chroniques audio et dossiers thématiques.',
            meta: 'Publications, PDF et liens'
          },
          {
            pill: 'Radio',
            title: 'Animateur radio',
            text: 'Extraits audio, concept d’émission et identité sonore.',
            meta: 'Ton, énergie, audiences'
          },
          {
            pill: 'TV & scène',
            title: 'Présentatrice & MC',
            text: 'Showreel, passages TV et interventions événementielles.',
            meta: 'Présence caméra et charisme'
          }
        ]
      },
      testimonials: {
        eyebrow: 'Témoignages',
        title: 'Ce que disent ses partenaires.',
        items: [
          {
            text: '“Une voix claire, une présence forte et un vrai sens de l’éditorial.”',
            author: 'Rédaction partenaire'
          },
          {
            text: '“Sa façon d’animer fédère le public et fluidifie l’événement.”',
            author: 'Organisateur d’événement'
          },
          {
            text: '“Professionnelle, structurée, et toujours orientée impact.”',
            author: 'Client digital'
          }
        ]
      },
      cta: {
        eyebrow: 'Contact',
        title: 'Pour une collaboration presse, radio ou événement.',
        lead: 'Échangeons sur votre projet et vos besoins éditoriaux.',
        button: 'Contacter Carnelle'
      },
      media: {
        eyebrow: 'Médias',
        title: 'Espaces prêts pour photos, vidéos et documents.',
        lead: 'Les contenus seront ajoutés depuis l’espace admin dès qu’ils sont disponibles.',
        photos: 'Photos presse',
        videos: 'Vidéos & showreels',
        docs: 'Documents',
        audio: 'Extraits audio',
        emptyPhotos: 'Aucune photo ajoutée pour le moment.',
        emptyVideos: 'Aucune vidéo ajoutée pour le moment.',
        emptyDocs: 'Aucun document ajouté pour le moment.',
        emptyAudio: 'Aucun extrait audio ajouté pour le moment.'
      }
    },
    about: {
      hero: {
        eyebrow: 'À propos',
        title: 'Une communicante polyvalente, ancrée dans le terrain.',
        lead:
          'Carnelle Nguepi travaille à la croisée du journalisme, de la radio, de la télévision, de l’événementiel et du digital. Son objectif : rendre chaque message clair, humain et utile.',
        imageUrl: '',
        imageAlt: 'Carnelle Nguepi en situation de présentation',
        metrics: [
          { value: 'Plurimédia', label: 'presse, radio, TV, scène, digital' },
          { value: 'Éditoriale', label: 'rigueur, vérification, clarté' },
          { value: 'Présence', label: 'voix, diction, charisme' }
        ],
        cardTitle: 'Ce qui guide son travail',
        cardList: [
          'Informer avec précision, sans perdre l’humain.',
          'Créer des formats lisibles et engageants.',
          'Valoriser l’impact et la crédibilité.'
        ]
      },
      values: {
        eyebrow: 'Principes',
        title: 'Des choix éditoriaux assumés.',
        items: [
          {
            title: 'Crédibilité journalistique',
            description: 'Informer avec rigueur et donner des repères fiables.'
          },
          {
            title: 'Narration claire',
            description: 'Structurer le message pour être compris sans effort.'
          },
          {
            title: 'Présence authentique',
            description: 'Une communication humaine, professionnelle et accessible.'
          }
        ]
      },
      timeline: {
        eyebrow: 'Méthode',
        title: 'Une démarche structurée, quel que soit le format.',
        items: [
          { title: 'Cadrage', detail: 'Comprendre le contexte, la cible et les objectifs.' },
          {
            title: 'Construction',
            detail: 'Éditer le contenu, choisir les preuves, raconter l’essentiel.'
          },
          { title: 'Diffusion', detail: 'Mettre en forme et diffuser sur les bons canaux.' }
        ]
      },
      highlights: {
        title: 'Ce qui fait la différence',
        items: [
          {
            title: 'Polyvalence média',
            detail: 'Presse, radio, TV et digital avec un fil conducteur éditorial.'
          },
          {
            title: 'Voix et présence',
            detail: 'Ton, diction et charisme pour porter un message sur scène ou à l’écran.'
          },
          {
            title: 'Impact mesurable',
            detail: 'Résultats, audiences et retours concrets mis en avant.'
          }
        ]
      },
      partners: {
        eyebrow: 'Réseau',
        title: 'Médias & partenaires.',
        items: [
          'Rédactions & médias partenaires',
          'Studios radio & TV',
          'Organisateurs d’événements',
          'Marques & acteurs digitaux'
        ],
        logos: []
      },
      partnerMedia: {
        eyebrow: 'Médias partenaires',
        title: 'Logos et supports associés.',
        empty: 'Aucun média partenaire ajouté pour le moment.'
      },
      publications: {
        eyebrow: 'Publications PDF',
        title: 'Articles et dossiers téléchargeables.',
        empty: 'Aucune publication PDF ajoutée pour le moment.'
      },
      showreel: {
        eyebrow: 'Showreel vidéo',
        title: 'Présence caméra et passages TV.',
        empty: 'Aucune vidéo ajoutée pour le moment.'
      },
      pressKit: {
        eyebrow: 'Kit presse',
        title: 'Documents et médias prêts à partager.',
        items: [
          { title: 'Bio courte', description: '100 mots pour dossiers de presse.' },
          { title: 'Bio longue', description: 'Version complète pour médias et partenaires.' },
          { title: 'Photos presse', description: 'Portraits HD, formats paysage et carré.' },
          { title: 'Showreel', description: 'Extraits TV et animation scène.' }
        ]
      },
      cta: {
        eyebrow: 'Échange',
        title: 'Besoin d’une communicante engagée ?',
        lead: 'Contact presse, animation, contenu digital : parlons de votre projet.',
        button: 'Prendre contact'
      }
    },
    projects: {
      hero: {
        eyebrow: 'Projets',
        title: 'Des expériences concrètes, racontées avec clarté.',
        lead:
          'Journalisme, radio, télévision, scène, digital : chaque mission révèle une facette de la communication de Carnelle.',
        imageUrl: '',
        imageAlt: 'Montage de projets médias',
        panelTitle: 'Ce qui ressort',
        bullets: [
          'Une narration claire et structurée.',
          'Des preuves visibles et contextualisées.',
          'Une présence qui engage le public.'
        ]
      },
      media: {
        eyebrow: 'Médias',
        title: 'Espaces prévus pour les médias du portfolio.',
        emptyPhoto: 'Aucune photo ajoutée pour le moment.',
        emptyVideo: 'Aucune vidéo ajoutée pour le moment.',
        emptyDoc: 'Aucun document ajouté pour le moment.'
      },
      cta: {
        eyebrow: 'Contact',
        title: 'Vous avez un projet média ou événementiel ?',
        lead: 'Discutons de vos besoins éditoriaux et de votre audience.',
        button: 'Échanger'
      }
    },
    blog: {
      hero: {
        eyebrow: 'Journal',
        title: 'Notes éditoriales de Carnelle.',
        lead:
          'Des observations terrain, des conseils et des formats utiles pour les métiers de la communication.',
        imageUrl: '',
        imageAlt: 'Carnet éditorial',
        listTitle: 'Vous trouverez ici',
        list: [
          'Des retours d’expérience concrets.',
          'Des pistes pour mieux raconter vos projets.',
          'Des méthodes pour renforcer la crédibilité.'
        ]
      },
      resources: {
        eyebrow: 'Ressources',
        title: 'Espaces pour médias et documents.',
        pdfTitle: 'PDF presse',
        audioTitle: 'Extraits audio',
        emptyPdf: 'Aucun PDF ajouté pour le moment.',
        emptyAudio: 'Aucun audio ajouté pour le moment.',
        hint: 'Ajout possible depuis l’espace admin.'
      },
      cta: {
        eyebrow: 'Audit',
        title: 'Vous avez besoin d’un regard éditorial ?',
        lead: 'Contactez Carnelle pour un échange rapide.',
        button: 'Prendre contact'
      }
    },
    contact: {
      hero: {
        eyebrow: 'Contact',
        title: 'Parlons de votre projet de communication.',
        lead:
          'Décrivez votre besoin (presse, radio, TV, événementiel ou digital). Carnelle revient vers vous avec une proposition claire.'
      },
      cards: [
        {
          title: 'Coordonnées',
          lines: ['contact@carnellenguepi.com', '+33 6 42 18 77 10']
        },
        {
          title: 'Disponibilité',
          lines: ['Réponse sous 48h ouvrées.', 'Premier échange en visio (20 min).']
        },
        {
          title: 'Zone de travail',
          lines: ['Paris · Lyon · À distance', 'Interventions francophones']
        }
      ],
      form: {
        fullName: 'Nom complet',
        email: 'Email professionnel',
        phone: 'Téléphone',
        profile: 'Profil',
        projectType: 'Type de besoin',
        message: 'Votre message',
        consent: 'J’accepte d’être recontacté(e) à propos de mon projet.',
        submit: 'Envoyer la demande',
        success: 'Merci ! Je reviens vers vous très vite.'
      },
      errors: {
        fullName: 'Merci d’indiquer votre nom.',
        email: 'Veuillez saisir un email valide.',
        message: 'Merci d’ajouter un message détaillé.',
        consent: 'Merci de confirmer votre accord.'
      },
      profileOptions: [
        { value: 'journalisme', label: 'Journalisme' },
        { value: 'radio', label: 'Animateur radio' },
        { value: 'tv', label: 'Animateur TV / Présentateur' },
        { value: 'ceremonie', label: 'Maître de cérémonie' },
        { value: 'digital', label: 'Communication digitale' }
      ],
      projectOptions: [
        { value: 'portfolio', label: 'Portfolio complet' },
        { value: 'audit', label: 'Audit du portfolio' },
        { value: 'showreel', label: 'Showreel / montage vidéo' },
        { value: 'social', label: 'Stratégie social media' },
        { value: 'presse', label: 'Demande presse / médias' },
        { value: 'autre', label: 'Autre besoin' }
      ]
    }
  },
  en: {
    theme: 'sable',
    header: {
      brandTitle: 'Carnelle Nguepi',
      subtitle: 'Communication · Journalism · Media presentation',
      brandLogoUrl: '',
      brandLogoAlt: 'Carnelle Nguepi logo',
      nav: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        blog: 'Journal',
        contact: 'Contact',
        admin: 'Admin'
      }
    },
    footer: {
      rights: 'All rights reserved.',
      contactLabel: 'Press contact',
      email: 'contact@carnellenguepi.com',
      copyright: '© 2026 Carnelle Nguepi.'
    },
    home: {
      hero: {
        eyebrow: 'Portfolio',
        title: 'Carnelle Nguepi, communication and media voice.',
        lead:
          'Journalism, radio, television, stage and digital communication: I build clear stories, engaging formats and visible proof.',
        imageUrl: '',
        imageAlt: 'Portrait of Carnelle Nguepi',
        actions: {
          primary: 'Contact me',
          secondary: 'View my expertise'
        },
        tags: ['Journalism', 'Radio & TV', 'Events']
      },
      panel: {
        pill: 'What you will see',
        title: 'A complete and credible profile',
        list: [
          'Publications and investigations in context.',
          'Audio/video extracts that summarize the essentials.',
          'Metrics and real-world feedback.'
        ],
        micro: [
          { value: '5 formats', label: 'Press · radio · TV · stage · digital' },
          { value: '1 mission', label: 'Make impact readable' }
        ]
      },
      proof: {
        cards: [
          {
            pill: 'Editorial',
            title: 'Publications',
            text: 'Articles, investigations and columns by themes.'
          },
          {
            pill: 'Radio',
            title: 'Sound identity',
            text: 'Audio extracts, show concept and audience proof.'
          },
          {
            pill: 'TV & stage',
            title: 'Presence',
            text: 'Short showreel, TV moments and live events.'
          }
        ]
      },
      services: {
        eyebrow: 'Expertise',
        title: 'A real-world, multi‑media communication.',
        lead:
          'Carnelle combines journalistic depth, radio voice, TV presence and digital power to bring meaning to messages.',
        cards: [
          {
            title: 'Journalism',
            text: 'Articles, investigations, columns and in‑depth topics.',
            items: ['PDF publications and links', 'Covered topics', 'Media partners']
          },
          {
            title: 'Radio & TV',
            text: 'Radio host, TV presenter and impactful short formats.',
            items: ['Audio and video extracts', 'Show concept', 'Camera presence & diction']
          },
          {
            title: 'Events & digital',
            text: 'Master of ceremonies and results‑driven social media.',
            items: ['Event videos', 'Digital case studies', 'Before/after stats']
          }
        ]
      },
      process: {
        eyebrow: 'How I work',
        title: 'Clear, human and structured communication.',
        steps: [
          { number: '01', title: 'Listening', text: 'Understand the real context.' },
          { number: '02', title: 'Rigor', text: 'Build a precise, reliable story.' },
          { number: '03', title: 'Impact', text: 'Highlight decisive proof.' }
        ]
      },
      showcase: {
        eyebrow: 'Selections',
        title: 'What you will find in her portfolio.',
        cards: [
          {
            pill: 'Journalism',
            title: 'Investigations & reports',
            text: 'Published articles, audio columns and thematic dossiers.',
            meta: 'Publications, PDFs and links'
          },
          {
            pill: 'Radio',
            title: 'Radio host',
            text: 'Audio extracts, show concept and sound identity.',
            meta: 'Tone, energy, audiences'
          },
          {
            pill: 'TV & stage',
            title: 'Presenter & MC',
            text: 'Showreel, TV moments and live events.',
            meta: 'Camera presence and charisma'
          }
        ]
      },
      testimonials: {
        eyebrow: 'Testimonials',
        title: 'What partners say.',
        items: [
          {
            text: '“A clear voice, strong presence and true editorial sense.”',
            author: 'Media partner'
          },
          {
            text: '“Her hosting brings people together and elevates events.”',
            author: 'Event organizer'
          },
          {
            text: '“Professional, structured, always impact‑oriented.”',
            author: 'Digital client'
          }
        ]
      },
      cta: {
        eyebrow: 'Contact',
        title: 'For press, radio or event collaborations.',
        lead: 'Let’s discuss your project and editorial needs.',
        button: 'Contact Carnelle'
      },
      media: {
        eyebrow: 'Media',
        title: 'Ready spaces for photos, videos and documents.',
        lead: 'Content will be added from the admin space as soon as available.',
        photos: 'Press photos',
        videos: 'Videos & showreels',
        docs: 'Documents',
        audio: 'Audio clips',
        emptyPhotos: 'No photos added yet.',
        emptyVideos: 'No videos added yet.',
        emptyDocs: 'No documents added yet.',
        emptyAudio: 'No audio clips added yet.'
      }
    },
    about: {
      hero: {
        eyebrow: 'About',
        title: 'A versatile communicator rooted in real-world experience.',
        lead:
          'Carnelle Nguepi works across journalism, radio, television, events and digital. Her goal: make every message clear, human and useful.',
        imageUrl: '',
        imageAlt: 'Carnelle Nguepi on stage',
        metrics: [
          { value: 'Multimedia', label: 'press, radio, TV, stage, digital' },
          { value: 'Editorial', label: 'rigor, verification, clarity' },
          { value: 'Presence', label: 'voice, diction, charisma' }
        ],
        cardTitle: 'What guides her work',
        cardList: [
          'Inform with precision without losing the human side.',
          'Create readable and engaging formats.',
          'Highlight impact and credibility.'
        ]
      },
      values: {
        eyebrow: 'Principles',
        title: 'Clear editorial choices.',
        items: [
          {
            title: 'Journalistic credibility',
            description: 'Inform with rigor and provide reliable benchmarks.'
          },
          {
            title: 'Clear storytelling',
            description: 'Structure the message so it is understood effortlessly.'
          },
          {
            title: 'Authentic presence',
            description: 'Human, professional and accessible communication.'
          }
        ]
      },
      timeline: {
        eyebrow: 'Method',
        title: 'A structured approach for any format.',
        items: [
          { title: 'Framing', detail: 'Understand context, target and objectives.' },
          { title: 'Building', detail: 'Edit content, select proof, tell the essentials.' },
          { title: 'Distribution', detail: 'Format and publish on the right channels.' }
        ]
      },
      highlights: {
        title: 'What makes the difference',
        items: [
          {
            title: 'Media versatility',
            detail: 'Press, radio, TV and digital with a strong editorial thread.'
          },
          {
            title: 'Voice and presence',
            detail: 'Tone, diction and charisma for stage or screen.'
          },
          {
            title: 'Measurable impact',
            detail: 'Results, audiences and tangible feedback highlighted.'
          }
        ]
      },
      partners: {
        eyebrow: 'Network',
        title: 'Media & partners.',
        items: [
          'Newsrooms & media partners',
          'Radio & TV studios',
          'Event organizers',
          'Brands & digital players'
        ],
        logos: []
      },
      partnerMedia: {
        eyebrow: 'Media partners',
        title: 'Logos and associated supports.',
        empty: 'No media partner added yet.'
      },
      publications: {
        eyebrow: 'PDF publications',
        title: 'Articles and downloadable dossiers.',
        empty: 'No PDF publication added yet.'
      },
      showreel: {
        eyebrow: 'Video showreel',
        title: 'Camera presence and TV moments.',
        empty: 'No video added yet.'
      },
      pressKit: {
        eyebrow: 'Press kit',
        title: 'Documents and media ready to share.',
        items: [
          { title: 'Short bio', description: '100 words for press kits.' },
          { title: 'Long bio', description: 'Full version for media and partners.' },
          { title: 'Press photos', description: 'HD portraits, landscape and square.' },
          { title: 'Showreel', description: 'TV extracts and stage hosting.' }
        ]
      },
      cta: {
        eyebrow: 'Contact',
        title: 'Need a committed communicator?',
        lead: 'Press, hosting, digital content: let’s talk about your project.',
        button: 'Get in touch'
      }
    },
    projects: {
      hero: {
        eyebrow: 'Projects',
        title: 'Concrete experiences, told clearly.',
        lead:
          'Journalism, radio, television, stage, digital: each mission reveals a facet of Carnelle’s communication.',
        imageUrl: '',
        imageAlt: 'Media project collage',
        panelTitle: 'Key takeaways',
        bullets: [
          'A clear and structured narrative.',
          'Visible, contextualized proof.',
          'A presence that engages the audience.'
        ]
      },
      media: {
        eyebrow: 'Media',
        title: 'Spaces reserved for portfolio media.',
        emptyPhoto: 'No photo added yet.',
        emptyVideo: 'No video added yet.',
        emptyDoc: 'No document added yet.'
      },
      cta: {
        eyebrow: 'Contact',
        title: 'Do you have a media or event project?',
        lead: 'Let’s discuss your editorial needs and audience.',
        button: 'Let’s talk'
      }
    },
    blog: {
      hero: {
        eyebrow: 'Journal',
        title: 'Carnelle’s editorial notes.',
        lead: 'Field observations, advice and useful formats for communication roles.',
        imageUrl: '',
        imageAlt: 'Editorial notes background',
        listTitle: 'You will find here',
        list: [
          'Concrete experience feedback.',
          'Ways to tell your projects better.',
          'Methods to reinforce credibility.'
        ]
      },
      resources: {
        eyebrow: 'Resources',
        title: 'Spaces for media and documents.',
        pdfTitle: 'Press PDFs',
        audioTitle: 'Audio clips',
        emptyPdf: 'No PDF added yet.',
        emptyAudio: 'No audio added yet.',
        hint: 'Add from the admin area.'
      },
      cta: {
        eyebrow: 'Audit',
        title: 'Need an editorial review?',
        lead: 'Contact Carnelle for a quick exchange.',
        button: 'Get in touch'
      }
    },
    contact: {
      hero: {
        eyebrow: 'Contact',
        title: 'Let’s talk about your communication project.',
        lead:
          'Describe your need (press, radio, TV, events or digital). Carnelle will get back with a clear proposal.'
      },
      cards: [
        {
          title: 'Contact',
          lines: ['contact@carnellenguepi.com', '+33 6 42 18 77 10']
        },
        {
          title: 'Availability',
          lines: ['Reply within 48 business hours.', 'First video call (20 min).']
        },
        {
          title: 'Working area',
          lines: ['Paris · Lyon · Remote', 'Francophone projects']
        }
      ],
      form: {
        fullName: 'Full name',
        email: 'Professional email',
        phone: 'Phone',
        profile: 'Profile',
        projectType: 'Project type',
        message: 'Your message',
        consent: 'I agree to be contacted about my project.',
        submit: 'Send request',
        success: 'Thank you! I will get back to you soon.'
      },
      errors: {
        fullName: 'Please provide your name.',
        email: 'Please enter a valid email.',
        message: 'Please add a detailed message.',
        consent: 'Please confirm your agreement.'
      },
      profileOptions: [
        { value: 'journalisme', label: 'Journalism' },
        { value: 'radio', label: 'Radio host' },
        { value: 'tv', label: 'TV host / Presenter' },
        { value: 'ceremonie', label: 'Master of ceremonies' },
        { value: 'digital', label: 'Digital communication' }
      ],
      projectOptions: [
        { value: 'portfolio', label: 'Full portfolio' },
        { value: 'audit', label: 'Portfolio audit' },
        { value: 'showreel', label: 'Showreel / video edit' },
        { value: 'social', label: 'Social media strategy' },
        { value: 'presse', label: 'Press / media request' },
        { value: 'autre', label: 'Other' }
      ]
    }
  }
};
