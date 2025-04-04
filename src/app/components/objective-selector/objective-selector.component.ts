import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-objective-selector',
  imports: [NgFor, RouterModule],
  templateUrl: './objective-selector.component.html',
  styleUrl: './objective-selector.component.scss',
})
export class ObjectiveSelectorComponent {
  gameService = inject(GameService);
  selectorItems = [
    {
      name: 'Albert Einstein',
      img: 'https://pbs.twimg.com/media/DgXr0_SWAAAYQhu.jpg',
      description: 'Es muy majo',
    },
    {
      name: 'Isaac Newton',
      img: 'https://i.seadn.io/gae/QLm9rQNos6D8bFrg_oxp3YilnNcUsKWtAml5ZZ2czdNrRiLVc67bqWzerHXEdc7Mkq5xotaCCj9pIKFdiO4cjiQ-J6sYh-FxRvs9mg?auto=format&dpr=1&w=1000',
      description: 'Es muy majo',
    },
    {
      name: 'Galileo Galilei',
      img: 'https://i.seadn.io/gae/DBScex9xqXTUtavHOmKu8VzvNPCLng7yLQceZsRb6ct9U9dQ5erdwpZ9jYx7efcCFga5Tqw3W9E8UO9Sd3bPv-FuZUU4dJRDjHU2-w?auto=format&dpr=1&w=1000',
      description: 'No es muy majo',
    },
    {
      name: 'Marie Curie',
      img: 'https://cache.teia.rocks/ipfs/bafkreib6yoifrk765em3lhr3vpttjo7cfvfqhy5esoh7eia6bmlf7voooi',
      description: 'Es muy majo',
    },
    {
      name: 'Stephen Hawking',
      img: 'https://i.seadn.io/gae/fMSK1jBqFg68HV8lIajF-9aUNPJQhLQu6Dv8wENvsbpl5B59CLj0lOs14ZtXj4TvDefMYL2r5w14PvtsppDukBPsJPc5_GVzSwg_Gw?auto=format&dpr=1&w=1000',
      description: 'Es muy majo',
    },
    {
      name: 'Nikola Tesla',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7bbskPZSeL1eBdEIzrisCAKx9xKITTDA2Kg&s',
      description: 'Es muy majo',
    },
  ];

  currentIndex = 0;

  ngOnInit() {
    this.currentIndex = 0;
    this.gameService.objective = this.selectorItems[this.currentIndex].name;
  }

  updateTransform() {
    const container = document.querySelector('.cards-container') as HTMLElement;
    const cards = container.querySelectorAll(
      '.card'
    ) as NodeListOf<HTMLElement>;

    if (!container || cards.length === 0) {
      return;
    }

    const containerWidth = container.clientWidth;

    // Obtén la tarjeta central
    const centralCard = cards[this.currentIndex];
    const centralCardWidth = centralCard ? centralCard.clientWidth : 0;

    // Calcula el desplazamiento inicial para centrar la tarjeta activa
    let offset = (containerWidth - centralCardWidth) / 2;

    // Ajusta el desplazamiento acumulando los anchos de las tarjetas anteriores
    for (let i = 0; i < this.currentIndex; i++) {
      const cardWidth = cards[i].clientWidth;
      const margin = parseFloat(getComputedStyle(cards[i]).marginRight || '0');
      offset -= cardWidth + margin;
    }

    // Aplica el desplazamiento al contenedor
    container.style.transform = `translateX(${offset}px)`;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.gameService.objective = this.selectorItems[this.currentIndex].name;
      this.updateTransform();
    }
  }

  next() {
    if (this.currentIndex < this.selectorItems.length - 1) {
      this.currentIndex++;
      this.gameService.objective = this.selectorItems[this.currentIndex].name;
      this.updateTransform();
    }
  }
}
