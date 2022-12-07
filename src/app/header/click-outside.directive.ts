import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.target']) onClick(
    event: MouseEvent,
    targetElement: HTMLElement
  ) {
    if (!targetElement) return;

    const clickedInside = this.elRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}
