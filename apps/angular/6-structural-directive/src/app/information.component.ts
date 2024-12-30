import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { hasRoleDirective } from './directives/hasRole.directive';
import { UserStore } from './user.store';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, hasRoleDirective],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div>visible only for super admin</div>
    <div *hasRole="'MANAGER'">visible if manager</div>
    <div *hasRole="['MANAGER', 'WRITER']">visible if manager and/or reader</div>
    <div *hasRole="['MANAGER', 'WRITER']">visible if manager and/or writer</div>
    <div *hasRole="'CLIENT'">visible if client</div>
    <div>visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  user$ = this.userStore.user$;
  constructor(private userStore: UserStore) {}
}
