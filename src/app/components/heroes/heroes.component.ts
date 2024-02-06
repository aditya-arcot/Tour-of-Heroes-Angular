import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HeroDetailComponent } from '../hero-detail/hero-detail.component'
import { RouterModule } from '@angular/router'
import { Hero } from '../../models/hero'
import { HeroService } from '../../services/hero.service'

@Component({
    selector: 'app-heroes',
    standalone: true,
    imports: [CommonModule, FormsModule, HeroDetailComponent, RouterModule],
    templateUrl: './heroes.component.html',
    styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
    heroes: Hero[] = []

    constructor(private heroService: HeroService) {}

    ngOnInit(): void {
        this.getHeroes()
    }

    getHeroes(): void {
        this.heroService
            .getHeroes()
            .subscribe((heroes) => (this.heroes = heroes))
    }

    add(name: string): void {
        name = name.trim()
        if (!name) {
            return
        }
        this.heroService
            .addHero({ name } as Hero)
            .subscribe(() => this.getHeroes())
    }

    delete(hero: Hero): void {
        this.heroService.deleteHero(hero.id).subscribe(() => this.getHeroes())
    }
}
