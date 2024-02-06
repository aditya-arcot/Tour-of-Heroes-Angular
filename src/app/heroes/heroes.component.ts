import { Component } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-heroes',
    standalone: true,
    imports: [CommonModule, FormsModule, HeroDetailComponent, RouterModule],
    templateUrl: './heroes.component.html',
    styleUrl: './heroes.component.css'
})
export class HeroesComponent {
    heroes: Hero[] = [];
    constructor(private heroService: HeroService) { }
    ngOnInit(): void {
        this.getHeroes();
    }
    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }
    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.addHero({ name } as Hero)
            .subscribe(_ => this.getHeroes())
    }
    delete(hero: Hero): void {
        this.heroService.deleteHero(hero.id)
            .subscribe(_ => this.getHeroes());
    }
}