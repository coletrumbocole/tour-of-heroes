import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';


@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(http: Http) {
    
  }


  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
    .toPromise()
    .then(response => response.json().data as Hero[])
    .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
                .then(heroes => heroes.find(hero => hero.id === id));
  }
}
