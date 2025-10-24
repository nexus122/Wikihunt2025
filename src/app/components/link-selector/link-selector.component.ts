import { Component, HostListener, inject, Input } from '@angular/core';
import { NgClass, NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-link-selector',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './link-selector.component.html',
  styleUrls: ['./link-selector.component.scss'],
})
export class LinkSelectorComponent {
  public gameService = inject(GameService);
  @Input() enlacesInternos!: string[];
  searchTerm: string = '';

  get filteredLinks(): string[] {
    if (!this.searchTerm) return this.enlacesInternos;
    const searchLower = this.searchTerm.toLowerCase();
    return this.enlacesInternos.filter((enlace) =>
      enlace.toLowerCase().includes(searchLower)
    );
  }

  selectLink(enlace: string) {
    this.gameService.getPage(enlace);
    this.searchTerm = '';
  }
}
