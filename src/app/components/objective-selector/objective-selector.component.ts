import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { NgFor, NgIf, CommonModule, SlicePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-objective-selector',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, CommonModule, SlicePipe],
  templateUrl: './objective-selector.component.html',
  styleUrl: './objective-selector.component.scss',
})
export class ObjectiveSelectorComponent {
  gameService = inject(GameService);
  selectorItems = [
    {
      name: 'Albert Einstein',
      img: 'https://pbs.twimg.com/media/DgXr0_SWAAAYQhu.jpg',
      description:
        'Físico teórico alemán que desarrolló la teoría de la relatividad, uno de los pilares fundamentales de la física moderna. Su famosa ecuación E=mc² revolucionó nuestra comprensión del universo. Recibió el Premio Nobel de Física en 1921 por sus contribuciones a la física teórica y el efecto fotoeléctrico.',
    },
    {
      name: 'Isaac Newton',
      img: 'https://i.seadn.io/gae/QLm9rQNos6D8bFrg_oxp3YilnNcUsKWtAml5ZZ2czdNrRiLVc67bqWzerHXEdc7Mkq5xotaCCj9pIKFdiO4cjiQ-J6sYh-FxRvs9mg?auto=format&dpr=1&w=1000',
      description:
        'Físico y matemático inglés, considerado uno de los científicos más influyentes de todos los tiempos. Formuló las leyes del movimiento y la gravitación universal, desarrolló el cálculo infinitesimal y realizó importantes descubrimientos en óptica. La leyenda cuenta que se inspiró para su teoría de la gravedad cuando una manzana cayó de un árbol.',
    },
    {
      name: 'Galileo Galilei',
      img: 'https://i.seadn.io/gae/DBScex9xqXTUtavHOmKu8VzvNPCLng7yLQceZsRb6ct9U9dQ5erdwpZ9jYx7efcCFga5Tqw3W9E8UO9Sd3bPv-FuZUU4dJRDjHU2-w?auto=format&dpr=1&w=1000',
      description:
        'Astrónomo, físico y matemático italiano, pionero del método científico experimental. Sus observaciones telescópicas confirmaron la teoría heliocéntrica de Copérnico. Enfrentó la persecución de la Iglesia por sus ideas revolucionarias, pero se le atribuye la famosa frase "Y sin embargo, se mueve" al referirse al movimiento de la Tierra.',
    },
    {
      name: 'Marie Curie',
      img: 'https://cache.teia.rocks/ipfs/bafkreib6yoifrk765em3lhr3vpttjo7cfvfqhy5esoh7eia6bmlf7voooi',
      description:
        'Física y química polaca-francesa, pionera en el campo de la radiactividad. Primera mujer en ganar un Premio Nobel y única en recibir dos Nobel en distintas especialidades (Física y Química). Descubrió los elementos radio y polonio, y sus investigaciones sentaron las bases para el desarrollo de la radiología médica.',
    },
    {
      name: 'Stephen Hawking',
      img: 'https://i.seadn.io/gae/fMSK1jBqFg68HV8lIajF-9aUNPJQhLQu6Dv8wENvsbpl5B59CLj0lOs14ZtXj4TvDefMYL2r5w14PvtsppDukBPsJPc5_GVzSwg_Gw?auto=format&dpr=1&w=1000',
      description:
        'Físico teórico británico que realizó importantes contribuciones a la cosmología y la mecánica cuántica. A pesar de sufrir una enfermedad neuromotora degenerativa, revolucionó nuestra comprensión de los agujeros negros y el origen del universo. Su libro "Breve historia del tiempo" acercó la ciencia compleja al público general.',
    },
    {
      name: 'Nikola Tesla',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7bbskPZSeL1eBdEIzrisCAKx9xKITTDA2Kg&s',
      description:
        'Inventor e ingeniero serbio-estadounidense, pionero en la electricidad moderna. Sus inventos y descubrimientos incluyen la corriente alterna (CA), la bobina Tesla y contribuciones fundamentales a la radio y el control remoto. Visionario adelantado a su tiempo, muchas de sus ideas sobre la energía inalámbrica siguen inspirando a científicos actuales.',
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
