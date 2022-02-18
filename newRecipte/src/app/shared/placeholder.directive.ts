import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
 // ViewcontainerRef를 사용하면 자동으로 현재 적용하고자 하는 HTML문서에 위치하고 이것은 반드시 public으로 선언하여
 // 전 project내 모든 html container Ref에 위치할수 있도록 한다
 
}
