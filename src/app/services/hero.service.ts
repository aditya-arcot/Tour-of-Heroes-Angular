import { Injectable } from '@angular/core'
import { Observable, catchError, of, tap } from 'rxjs'
import { MessageService } from './message.service'
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http'
import { Hero } from '../models/hero'

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    private heroesUrl = 'api/heroes'
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl).pipe(
            tap(() => this.log('fetched heroes')),
            catchError(this.handleError<Hero[]>('getHeroes', []))
        )
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`
        return this.http.get<Hero>(url).pipe(
            tap(() => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        )
    }

    updateHero(hero: Hero): Observable<Hero> {
        return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
            tap(() => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<Hero>('updateHero'))
        )
    }

    addHero(hero: Hero): Observable<Hero> {
        return this.http
            .post<Hero>(this.heroesUrl, hero, this.httpOptions)
            .pipe(
                tap((newHero: Hero) =>
                    this.log(`added hero w/ id=${newHero.id}`)
                ),
                catchError(this.handleError<Hero>('addHero'))
            )
    }

    deleteHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`
        return this.http.delete<Hero>(url, this.httpOptions).pipe(
            tap(() => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
        )
    }

    searchHeroes(term: string): Observable<Hero[]> {
        term = term.trim()
        if (!term) return of([])
        const url = `${this.heroesUrl}/?name=${term}`
        return this.http.get<Hero[]>(url).pipe(
            tap((x) =>
                x.length
                    ? this.log(`found heroes matching "${term}"`)
                    : this.log(`no heroes matching "${term}"`)
            ),
            catchError(this.handleError<Hero[]>('searchHeroes', []))
        )
    }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`)
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: HttpErrorResponse): Observable<T> => {
            console.error(error)
            this.log(`${operation} failed: ${error.message}`)
            return of(result as T)
        }
    }
}
