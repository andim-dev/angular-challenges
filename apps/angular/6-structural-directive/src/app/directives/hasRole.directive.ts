import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

class HasRoleContext<T = unknown> {
  $implicit: T | T[] = null!;
  hasRole: T | T[] = null!;
}
// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[hasRole]', standalone: true })
export class hasRoleDirective<T> {
  readonly ROLES = ['MANAGER', 'WRITER', 'READER', 'CLIENT'];
  private _context: HasRoleContext<T> = new HasRoleContext<T>();
  private templateRef: TemplateRef<HasRoleContext<T>> | null = null;
  private viewRef: EmbeddedViewRef<HasRoleContext<T>> | null = null;

  @Input()
  set ngIf(condition: T) {
    console.log('🚀 ~ hasRoleDirective<T> ~ setngIf ~ condition:', condition);
    this._context.$implicit = this._context.hasRole = condition;
    this._updateView();
  }

  constructor(
    private vcr: ViewContainerRef,
    private ref: TemplateRef<HasRoleContext<T>>,
  ) {}

  _updateView() {
    console.log(
      '🚀 ~ hasRoleDirective<T> ~ _updateView ~ this._context.$implicit:',
      this._context.$implicit,
    );

    if (
      (this._context.$implicit &&
        this.ROLES.includes(this._context.$implicit as string)) ||
      this.ROLES.some((role) =>
        (this._context.$implicit as string[]).includes(role),
      )
    ) {
      // Condition is true
      if (!this.templateRef) {
        this.vcr.clear(); // Clear existing views
        if (this.templateRef) {
          this.viewRef = this.vcr.createEmbeddedView(
            this.templateRef,
            this._context,
          );
        }
      }
    } else {
      // Condition is false
      this.vcr.clear(); // Clear existing views
    }
  }
}
