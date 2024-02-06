import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/components/app/app.component'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter, Routes } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryDataService } from './app/services/in-memory-data.service'
import { HeroesComponent } from './app/components/heroes/heroes.component'
import { DashboardComponent } from './app/components/dashboard/dashboard.component'
import { HeroDetailComponent } from './app/components/hero-detail/hero-detail.component'

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'heroes', component: HeroesComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: HeroDetailComponent },
]
const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        importProvidersFrom(
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
                dataEncapsulation: false,
            })
        ),
    ],
}
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err))
