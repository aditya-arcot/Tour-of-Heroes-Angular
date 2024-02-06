import { Component } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-heroes',
    standalone: true,
    imports: [CommonModule, FormsModule, HeroDetailComponent],
    templateUrl: './heroes.component.html',
    styleUrl: './heroes.component.css'
})
export class HeroesComponent {
    heroes: Hero[] = [];
    selectedHero?: Hero;
    constructor(private heroService: HeroService, private messageService: MessageService) { }
    ngOnInit(): void {
        this.getHeroes();
    }
    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }
    onSelect(hero: Hero): void {
        this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
        this.selectedHero = hero;
    }
}
