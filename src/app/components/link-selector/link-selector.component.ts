import { Component, HostListener, inject, Input } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-link-selector',
  imports: [NgFor],
  templateUrl: './link-selector.component.html',
  styleUrls: ['./link-selector.component.scss'],
})
export class LinkSelectorComponent {
  public gameService = inject(GameService);
  @Input() enlacesInternos!: string[];
  itemsPerPage = 3; // Número de elementos a mostrar por página

  ngOnInit() {
    this.updateItemsPerPage();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateItemsPerPage();
  }

  updateItemsPerPage() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      this.itemsPerPage = 5; // 5 elementos en pantallas grandes (PC)
    } else {
      this.itemsPerPage = 3; // 3 elementos en pantallas pequeñas (móvil)
    }
  }

  moveBefore() {
    if (this.gameService.currentIndex > 0) {
      this.gameService.currentIndex--;
    }
  }

  moveAfter() {
    const maxIndex =
      Math.ceil(this.enlacesInternos.length / this.itemsPerPage) - 1;
    if (this.gameService.currentIndex < maxIndex) {
      this.gameService.currentIndex++;
    }
  }
}
