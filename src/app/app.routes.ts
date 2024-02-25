import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ScraperComponent } from './scraper/scraper.component';
import { PlannerComponent } from './planner/planner.component';

export const routes: Routes = [
    {
      path: '',
      component: AppComponent,
      title: 'Home page'
    },
    {
      path: 'scrape',
      component: ScraperComponent,
      title: 'Recipe Scraper'
    },
    {
        path: 'plan',
        component: PlannerComponent,
        title: 'Recipe Planner'
    }
  ];  
