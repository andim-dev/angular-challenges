import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardType } from './../../model/card.model';

@Component({
  selector: 'app-student-card',
  template: `
    <ng-template #studentView>
      <img src="assets/img/student.webp" width="200px" />
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
      [list]="students"
      [type]="cardType"
      [mainView]="studentView"
      [btnView]="addBtnView"
      [listView]="listView"
      customClass="bg-light-green"></app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    public store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
