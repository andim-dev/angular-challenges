import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name }}
      <ng-container *ngTemplateOutlet="btnView"></ng-container>
    </div>
  `,
  imports: [NgTemplateOutlet],
  standalone: true,
})
export class ListItemComponent implements OnInit {
  @Input() id!: number;
  @Input() name!: string;
  @Input() type!: CardType;
  @Input() btnView: TemplateRef<any> | null = null;
  deleteFn!: (id: number) => void;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  ngOnInit() {
    switch (this.type) {
      case CardType.TEACHER:
        this.deleteFn = this.teacherStore.deleteOne;
        break;
      case CardType.STUDENT:
        this.deleteFn = this.studentStore.deleteOne;
        break;
      case CardType.CITY:
        this.deleteFn = this.cityStore.deleteOne;
        break;
    }
  }

  delete(id: number) {
    this.deleteFn(id);
  }
}
