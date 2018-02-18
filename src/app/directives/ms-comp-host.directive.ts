import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMsCompHost]'
})
export class MsCompHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
