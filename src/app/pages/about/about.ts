import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaLibraryService } from '../../services/media-library';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly i18n = inject(I18nService);
  private readonly mediaLibrary = inject(MediaLibraryService);

  readonly partnerMedia = computed(() => this.mediaLibrary.getByCategory('partner'));
  readonly publicationsPdf = computed(() => this.mediaLibrary.getByCategory('publication-pdf'));
  readonly showreelVideos = computed(() => this.mediaLibrary.getByCategory('showreel'));

  readonly content = computed(() => {
    const lang = this.i18n.lang();
    if (lang === 'fr') {
      return {
        hero: {
          eyebrow: 'À propos',
          title: 'Une communicante polyvalente, ancrée dans le terrain.',
          lead:
            'Carnelle Nguepi travaille à la croisée du journalisme, de la radio, de la télévision, de l’événementiel et du digital. Son objectif : rendre chaque message clair, humain et utile.',
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
          ]
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
      };
    }

    return {
      hero: {
        eyebrow: 'About',
        title: 'A versatile communicator rooted in real-world experience.',
        lead:
          'Carnelle Nguepi works across journalism, radio, television, events and digital. Her goal: make every message clear, human and useful.',
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
        ]
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
    };
  });
}
