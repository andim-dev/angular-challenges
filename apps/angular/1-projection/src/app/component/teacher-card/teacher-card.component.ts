import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <ng-template #teacherView>
      <img src="assets/img/teacher.png" width="200px" />
    </ng-template>

    <ng-template #listView let-item="item">
      <app-list-item
        [name]="item?.firstName"
        [id]="item?.id"
        [type]="cardType"
        [btnView]="delBtnView">
        <ng-template #delBtnView>
          <button
            class="rounded-sm border border-blue-500 bg-blue-300 p-2"
            (click)="deleteItem(item.id)">
            Delete
          </button>
        </ng-template>
      </app-list-item>
    </ng-template>

    <ng-template #addBtnView>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </ng-template>

    <app-card
      [list]="teachers"
      [type]="cardType"
      [mainView]="teacherView"
      [btnView]="addBtnView"
      [listView]="listView"
      customClass="bg-light-red"></app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
