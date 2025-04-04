import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { WikiModel } from '../models/wikiModels';

@Injectable({
  providedIn: 'root',
})
export class WikiapiService {
  getPage(term: string): Observable<WikiModel> {
    const url = `https://es.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      term
    )}&format=json&prop=extracts|info|pageimages|links&inprop=url&exintro=true&explaintext=true&pllimit=max&piprop=thumbnail&pithumbsize=500&origin=*`;

    return fromFetch(url).pipe(
      switchMap((response) =>
        response.ok ? response.json() : of({ error: 'Error en la petición' })
      ),
      map((datos) => {
        const page: any = Object.values(datos.query.pages)[0];
        return this.makeResponse(page);
      }),
      catchError((err) => of(this.makeError()))
    );
  }
  getRandomPage(): Observable<WikiModel> {
    const url = `https://es.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&format=json&prop=extracts|info|pageimages|links&inprop=url&exintro=true&explaintext=true&pllimit=max&piprop=thumbnail&pithumbsize=500&origin=*`;

    return fromFetch(url).pipe(
      switchMap((response) =>
        response.ok ? response.json() : of({ error: 'Error en la petición' })
      ),
      map((datos) => {
        const page: any = Object.values(datos.query.pages)[0];
        return this.makeResponse(page);
      }),
      catchError((err) => of(this.makeError()))
    );
  }

  private makeResponse(page: any): WikiModel {
    return {
      titulo: page.title,
      descripcion: page.extract,
      url: page.fullurl,
      imagen: page.thumbnail?.source || null,
      enlacesInternos:
        page.links
          ?.map((link: any) => link.title)
          .filter((text: any) => !text.includes(':')) || [],
    } as WikiModel;
  }

  private makeError(): WikiModel {
    return {
      titulo: 'Error',
      descripcion: 'No se pudo obtener la información.',
      url: '',
      imagen: null,
      enlacesInternos: [],
    } as WikiModel;
  }
}
