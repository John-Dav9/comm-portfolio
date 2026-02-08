import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  readonly stats = [
    { label: 'Projets publiés', value: '9' },
    { label: 'Articles en brouillon', value: '3' },
    { label: 'Demandes reçues', value: '17' },
    { label: 'Temps de réponse', value: '48h' }
  ];

  readonly quickActions = [
    { label: 'Éditer le contenu', link: '/admin/content' },
    { label: 'Ajouter un projet', link: '/admin/projects' },
    { label: 'Rédiger un article', link: '/admin/articles' },
    { label: 'Gérer les médias', link: '/admin/media' },
    { label: 'Voir le portfolio', link: '/' }
  ];

  readonly latestUpdates = [
    { title: 'Showreel TV - Studio Visio', detail: 'Mis à jour il y a 2 jours.' },
    { title: 'Article : Portfolio journaliste', detail: 'Publié il y a 4 jours.' },
    { title: 'Projet Eventia Group', detail: 'Ajouté il y a 6 jours.' }
  ];
}
