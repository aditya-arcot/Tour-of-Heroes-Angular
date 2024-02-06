import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { Hero } from '../../models/hero'
import { HeroService } from '../../services/hero.service'

@Component({
    selector: 'app-hero-detail',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './hero-detail.component.html',
    styleUrl: './hero-detail.component.css',
})
export class HeroDetailComponent implements OnInit {
    @Input() hero?: Hero

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private location: Location
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'))
        this.heroService.getHero(id).subscribe((hero) => (this.hero = hero))
    }

    save(): void {
        if (this.hero) {
            this.heroService
                .updateHero(this.hero)
                .subscribe(() => this.goBack())
        }
    }

    goBack(): void {
        this.location.back()
    }
}
