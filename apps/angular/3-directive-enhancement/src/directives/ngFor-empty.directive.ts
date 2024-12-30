/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngFor]',
  standalone: true,
})
export class NgForEmpptyDirective<T, U> implements DoCheck {
  ngForOf = input.required<T[] | undefined>();
  ngForEmpty = input<TemplateRef<U>>();

  vcr = inject(ViewContainerRef);
  viewRef: EmbeddedViewRef<U> | undefined = undefined;

  ngDoCheck(): void {
    this.viewRef?.destroy();
    const templateRef = this.ngForEmpty();
    console.log(
      '🚀 ~ NgForEmpptyDirective<T, ~ ngDoCheck ~ this.ngForOf:',
      this.ngForOf(),
    );
    if (!this.ngForOf() || this.ngForOf()?.length === 0) {
      templateRef &&
        (this.viewRef = this.vcr.createEmbeddedView<U>(templateRef));
    } else {
      this.viewRef?.destroy();
    }
  }
}

export { NgForEmpptyDirective as NgForEmpty };
