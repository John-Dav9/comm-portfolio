import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaLibraryService } from '../../services/media-library';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  private readonly i18n = inject(I18nService);
  private readonly mediaLibrary = inject(MediaLibraryService);

  readonly pdfResources = computed(() => this.mediaLibrary.getByCategory('publication-pdf'));
  readonly audioResources = computed(() => this.mediaLibrary.getByCategory('audio'));

  readonly content = computed(() => {
    const lang = this.i18n.lang();
    if (lang === 'fr') {
      return {
        hero: {
          eyebrow: 'Journal',
          title: 'Notes éditoriales de Carnelle.',
          lead:
            'Des observations terrain, des conseils et des formats utiles pour les métiers de la communication.',
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
      };
    }
    return {
      hero: {
        eyebrow: 'Journal',
        title: 'Carnelle’s editorial notes.',
        lead:
          'Field observations, advice and useful formats for communication roles.',
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
    };
  });

  readonly articles = computed(() => {
    const lang = this.i18n.lang();
    if (lang === 'fr') {
      return [
        {
          title: 'Journalisme : construire une preuve rapide et lisible',
          category: 'Journalisme',
          readTime: '6 min',
          author: 'Carnelle N.',
          date: '6 fév. 2026',
          summary: 'Comment structurer articles, enquêtes et chroniques pour convaincre vite.',
          tags: ['Structure', 'Enquêtes', 'Crédibilité']
        },
        {
          title: 'Radio : faire ressortir le ton et l’identité sonore',
          category: 'Radio',
          readTime: '4 min',
          author: 'Carnelle N.',
          date: '30 janv. 2026',
          summary: 'Extraits audio, concept d’émission et preuves d’audience en un seul récit.',
          tags: ['Audio', 'Identité', 'Audience']
        },
        {
          title: 'TV : un showreel court, une présence claire',
          category: 'TV',
          readTime: '5 min',
          author: 'Carnelle N.',
          date: '22 janv. 2026',
          summary: 'Comment faire ressortir la diction, le charisme et l’aisance caméra.',
          tags: ['Vidéo', 'Showreel', 'Présence']
        },
        {
          title: 'Événementiel : transformer un moment en expérience',
          category: 'Événementiel',
          readTime: '5 min',
          author: 'Carnelle N.',
          date: '12 janv. 2026',
          summary: 'Ce qui rassure un organisateur : avis clients, vidéos et structure.',
          tags: ['Événements', 'Avis clients', 'Preuves']
        },
        {
          title: 'Digital : montrer l’impact avec des chiffres simples',
          category: 'Digital',
          readTime: '7 min',
          author: 'Carnelle N.',
          date: '5 janv. 2026',
          summary: 'Études de cas, contenus viraux et croissance d’audience.',
          tags: ['Social media', 'KPI', 'Croissance']
        }
      ];
    }
    return [
      {
        title: 'Journalism: build fast, readable proof',
        category: 'Journalism',
        readTime: '6 min',
        author: 'Carnelle N.',
        date: 'Feb 6, 2026',
        summary: 'How to structure articles and investigations to convince quickly.',
        tags: ['Structure', 'Investigations', 'Credibility']
      },
      {
        title: 'Radio: highlight tone and sound identity',
        category: 'Radio',
        readTime: '4 min',
        author: 'Carnelle N.',
        date: 'Jan 30, 2026',
        summary: 'Audio extracts, show concept and audience proof in one story.',
        tags: ['Audio', 'Identity', 'Audience']
      },
      {
        title: 'TV: a short showreel, clear presence',
        category: 'TV',
        readTime: '5 min',
        author: 'Carnelle N.',
        date: 'Jan 22, 2026',
        summary: 'Bring out diction, charisma and camera ease.',
        tags: ['Video', 'Showreel', 'Presence']
      },
      {
        title: 'Events: turn a moment into an experience',
        category: 'Events',
        readTime: '5 min',
        author: 'Carnelle N.',
        date: 'Jan 12, 2026',
        summary: 'What reassures organizers: reviews, videos and structure.',
        tags: ['Events', 'Reviews', 'Proof']
      },
      {
        title: 'Digital: show impact with simple numbers',
        category: 'Digital',
        readTime: '7 min',
        author: 'Carnelle N.',
        date: 'Jan 5, 2026',
        summary: 'Case studies, viral content and audience growth.',
        tags: ['Social media', 'KPI', 'Growth']
      }
    ];
  });
}
