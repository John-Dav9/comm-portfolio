import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () => import('./pages/home/home').then((m) => m.Home)
	},
	{
		path: 'about',
		loadComponent: () => import('./pages/about/about').then((m) => m.About)
	},
	{
		path: 'projects',
		loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects)
	},
	{
		path: 'blog',
		loadComponent: () => import('./pages/blog/blog').then((m) => m.Blog)
	},
	{
		path: 'contact',
		loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact)
	}
	,
	{
		path: 'admin',
		children: [
			{
				path: 'login',
				loadComponent: () => import('./admin/login/login').then((m) => m.Login)
			},
			{
				path: 'dashboard',
				loadComponent: () => import('./admin/dashboard/dashboard').then((m) => m.Dashboard),
				canActivate: [adminGuard]
			},
			{
				path: 'projects',
				loadComponent: () => import('./admin/projects-admin/projects-admin').then((m) => m.ProjectsAdmin),
				canActivate: [adminGuard]
			},
			{
				path: 'articles',
				loadComponent: () => import('./admin/articles-admin/articles-admin').then((m) => m.ArticlesAdmin),
				canActivate: [adminGuard]
			},
			{
				path: 'media',
				loadComponent: () => import('./admin/media-admin/media-admin').then((m) => m.MediaAdmin),
				canActivate: [adminGuard]
			}
		]
	}
];
