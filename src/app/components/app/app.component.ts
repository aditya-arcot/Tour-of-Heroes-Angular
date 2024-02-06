import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HeroesComponent } from '../heroes/heroes.component'
import { MessagesComponent } from '../messages/messages.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeroesComponent, MessagesComponent, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'Tour of Heroes'
}
