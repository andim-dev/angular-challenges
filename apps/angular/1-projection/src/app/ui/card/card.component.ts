import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-container *ngTemplateOutlet="mainView"></ng-container>

      @for (item of list; track item.id) {
        <section>
          <ng-container
            *ngTemplateOutlet="
              listView;
              context: { item: item }
            "></ng-container>
        </section>
      }

      <ng-container *ngTemplateOutlet="btnView"></ng-container>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Input() mainView!: TemplateRef<any>;
  @Input() btnView!: TemplateRef<any>;
  @Input() listView!: TemplateRef<any>;

  item = null;
  CardType = CardType;
}
