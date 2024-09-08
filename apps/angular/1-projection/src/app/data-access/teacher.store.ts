import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private teachers = new BehaviorSubject<Teacher[]>([]);
  teachers$ = this.teachers.asObservable();

  addAll(teachers: Teacher[]) {
    this.teachers.next(teachers);
  }

  addOne(teacher: Teacher) {
    this.teachers.next([...this.teachers.value, teacher]);
  }

  deleteOne(id: number) {
    console.log(
      '🚀 ~ TeacherStore ~ deleteOne ~ this.teachers:',
      this.teachers,
    );
    this.teachers.next(this.teachers.value.filter((t) => t.id !== id));
  }
}
