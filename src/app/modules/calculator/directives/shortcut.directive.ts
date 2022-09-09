import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appShortcut]',
})
export class ShortcutDirective {
  @Input('appShortcut') shortcude!: string;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('window:keydown', ['$event'])
  handleKeypressedEvent(event: KeyboardEvent) {
    if (event.key === this.shortcude) {
      this.elementRef.nativeElement.click();
    }
  }
}
