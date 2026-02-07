import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaLibraryService } from '../../services/media-library';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly i18n = inject(I18nService);
  private readonly mediaLibrary = inject(MediaLibraryService);

  readonly content = computed(() => {
    const lang = this.i18n.lang();
    return lang === 'fr'
      ? {
          hero: {
            eyebrow: 'Portfolio',
            title: 'Carnelle Nguepi, communicante et voix média.',
            lead:
              'Journalisme, radio, télévision, scène et communication digitale : je construis des histoires claires, des formats engageants et des preuves visibles.',
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
            lead:
              'Les contenus seront ajoutés depuis l’espace admin dès qu’ils sont disponibles.',
            photos: 'Photos presse',
            videos: 'Vidéos & showreels',
            docs: 'Documents',
            audio: 'Extraits audio',
            emptyPhotos: 'Aucune photo ajoutée pour le moment.',
            emptyVideos: 'Aucune vidéo ajoutée pour le moment.',
            emptyDocs: 'Aucun document ajouté pour le moment.',
            emptyAudio: 'Aucun extrait audio ajouté pour le moment.'
          }
        }
      : {
          hero: {
            eyebrow: 'Portfolio',
            title: 'Carnelle Nguepi, communication and media voice.',
            lead:
              'Journalism, radio, television, stage and digital communication: I build clear stories, engaging formats and visible proof.',
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
        };
  });

  readonly pressPhotos = computed(() => this.mediaLibrary.getByCategory('press-photo'));
  readonly showreelVideos = computed(() => this.mediaLibrary.getByCategory('showreel'));
  readonly pressDocuments = computed(() => this.mediaLibrary.getByCategory('publication-pdf'));
  readonly audioClips = computed(() => this.mediaLibrary.getByCategory('audio'));
}
