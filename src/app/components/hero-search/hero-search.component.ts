import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { CommonModule } from '@angular/common'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { Hero } from '../../models/hero'
import { HeroService } from '../../services/hero.service'

@Component({
    selector: 'app-hero-search',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './hero-search.component.html',
    styleUrl: './hero-search.component.css',
})
export class HeroSearchComponent implements OnInit {
    heroes$!: Observable<Hero[]>

    private searchTerms = new Subject<string>()

    constructor(private heroService: HeroService) {}

    ngOnInit(): void {
        this.heroes$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.heroService.searchHeroes(term))
        )
    }

    search(term: string): void {
        this.searchTerms.next(term)
    }
}
