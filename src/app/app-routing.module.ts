import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'showPage',
    loadChildren: () => import('./page/first-page/first-page.module').then(m => m.FirstPagePageModule)
  },
  {
    path: 'allEpisodeList',
    loadChildren: () => import('./page/episodes-list/episodes-list.module').then(m => m.EpisodesListPageModule)
  },
  {
    path: 'episodeSpecific',
    loadChildren: () => import('./page/episode-details/episode-details.module').then(m => m.EpisodeDetailsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
