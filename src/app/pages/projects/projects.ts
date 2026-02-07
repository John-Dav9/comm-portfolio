import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaLibraryService } from '../../services/media-library';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  private readonly i18n = inject(I18nService);
  private readonly mediaLibrary = inject(MediaLibraryService);

  readonly projectPhotos = computed(() => [
    ...this.mediaLibrary.getByCategory('press-photo'),
    ...this.mediaLibrary.getByCategory('event-photo')
  ]);
  readonly projectVideos = computed(() => this.mediaLibrary.getByCategory('showreel'));
  readonly projectDocuments = computed(() => this.mediaLibrary.getByCategory('publication-pdf'));

  readonly content = computed(() => {
    const lang = this.i18n.lang();
    if (lang === 'fr') {
      return {
        hero: {
          eyebrow: 'Projets',
          title: 'Des expériences concrètes, racontées avec clarté.',
          lead:
            'Journalisme, radio, télévision, scène, digital : chaque mission révèle une facette de la communication de Carnelle.',
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
      };
    }
    return {
      hero: {
        eyebrow: 'Projects',
        title: 'Concrete experiences, told clearly.',
        lead:
          'Journalism, radio, television, stage, digital: each mission reveals a facet of Carnelle’s communication.',
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
    };
  });

  readonly caseStudies = computed(() => {
    const lang = this.i18n.lang();
    if (lang === 'fr') {
      return [
        {
          category: 'Journalisme',
          title: 'Enquête sociétale long format',
          client: 'Rédaction partenaire',
          year: '2026',
          context: 'Sujets sensibles à forte portée sociale avec besoin de clarté.',
          mission: 'Construire une narration solide et des preuves vérifiables.',
          deliverables: ['Dossier PDF', 'Synthèse éditoriale', 'Chronique audio'],
          results: ['Reprises médias', 'Crédibilité renforcée']
        },
        {
          category: 'Radio',
          title: 'Concept d’émission quotidienne',
          client: 'Radio locale',
          year: '2025',
          context: 'Renforcer l’identité sonore et la ligne éditoriale.',
          mission: 'Créer un format dynamique et facilement mémorisable.',
          deliverables: ['Extraits audio', 'Concept d’émission', 'Retours d’audience'],
          results: ['Engagement accru', 'Nouveaux partenariats']
        },
        {
          category: 'TV',
          title: 'Showreel présentatrice',
          client: 'Studio TV',
          year: '2026',
          context: 'Présence caméra et diction à mettre en avant.',
          mission: 'Montrer les moments forts et la posture d’antenne.',
          deliverables: ['Showreel 90 secondes', 'Passages TV', 'Interviews'],
          results: ['Portfolio TV clarifié', 'Demandes de collaboration']
        },
        {
          category: 'Événementiel',
          title: 'Maître de cérémonie',
          client: 'Agence événementielle',
          year: '2024',
          context: 'Montrer la capacité à transformer un événement en expérience.',
          mission: 'Valoriser la dynamique de scène et la relation public.',
          deliverables: ['Vidéos d’événements', 'Avis clients', 'Photos pro'],
          results: ['Confiance renforcée', 'Références solides']
        },
        {
          category: 'Communication digitale',
          title: 'Stratégie social media',
          client: 'Marque digitale',
          year: '2025',
          context: 'Besoin de preuves avant/après sur l’audience.',
          mission: 'Montrer les résultats, les formats et les stratégies mises en place.',
          deliverables: ['Études de cas', 'Statistiques', 'Contenus viraux'],
          results: ['Croissance d’audience', 'Engagement mesuré']
        }
      ];
    }
    return [
      {
        category: 'Journalism',
        title: 'Long‑form social investigation',
        client: 'Partner newsroom',
        year: '2026',
        context: 'Sensitive topics with a strong social impact and need for clarity.',
        mission: 'Build a solid narrative and verifiable proof.',
        deliverables: ['PDF dossier', 'Editorial summary', 'Audio column'],
        results: ['Media pick‑ups', 'Stronger credibility']
      },
      {
        category: 'Radio',
        title: 'Daily show concept',
        client: 'Local radio',
        year: '2025',
        context: 'Strengthen sound identity and editorial line.',
        mission: 'Create a dynamic, memorable format.',
        deliverables: ['Audio extracts', 'Show concept', 'Audience feedback'],
        results: ['Higher engagement', 'New partnerships']
      },
      {
        category: 'TV',
        title: 'Presenter showreel',
        client: 'TV studio',
        year: '2026',
        context: 'Camera presence and diction to highlight.',
        mission: 'Show key moments and on‑air posture.',
        deliverables: ['90‑second showreel', 'TV moments', 'Interviews'],
        results: ['Clear TV portfolio', 'Collaboration requests']
      },
      {
        category: 'Events',
        title: 'Master of ceremonies',
        client: 'Event agency',
        year: '2024',
        context: 'Show the ability to turn an event into an experience.',
        mission: 'Highlight stage dynamics and audience connection.',
        deliverables: ['Event videos', 'Client reviews', 'Pro photos'],
        results: ['Stronger trust', 'Solid references']
      },
      {
        category: 'Digital communication',
        title: 'Social media strategy',
        client: 'Digital brand',
        year: '2025',
        context: 'Need for before/after audience proof.',
        mission: 'Show results, formats and strategies implemented.',
        deliverables: ['Case studies', 'Statistics', 'Viral content'],
        results: ['Audience growth', 'Measured engagement']
      }
    ];
  });
}
