import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'information',
        children: [
          {
            path: '',
            loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
          }
        ]
      },
      {
        path: 'world',
        children: [
          {
            path: '',
            loadChildren: () => import('./world/world.module').then(m => m.WorldModule)
          }
        ]
      },
      {
        path: 'europe',
        children: [
          {
            path: '',
            loadChildren: () => import('./europe/europe.module').then( m => m.EuropePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
