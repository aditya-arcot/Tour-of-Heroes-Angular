import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, HeroSearchComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    constructor(private heroService: HeroService) { }
    ngOnInit(): void {
        this.getHeroes();
    }
    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    }
}

