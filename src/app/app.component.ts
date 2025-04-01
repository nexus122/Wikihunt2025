import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { WikiapiService } from './services/wikiapi.service';
import { BehaviorSubject } from 'rxjs';
import { WikiModel } from './models/wikiModels';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  wikiApiService = inject(WikiapiService);

  // Almacena los datos de la página
  pageData$ = new BehaviorSubject<WikiModel | null>(null);
  ngOnInit() {
    this.getRandomPage();
  }

  getPage(term: string) {
    this.wikiApiService.getPage(term).subscribe((data) => {
      this.pageData$.next(data); // Actualiza los datos
    });
  }

  getRandomPage() {
    this.wikiApiService.getRandomPage().subscribe((data) => {
      this.pageData$.next(data); // Actualiza los datos
    });
  }
}
