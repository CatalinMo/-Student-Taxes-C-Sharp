// import {Component, HostListener, Inject, OnInit} from '@angular/core';
// import {DOCUMENT, ViewportScroller} from "@angular/common";
import { Vue } from 'vue-class-component';

export default class ScrollToTopComponent extends Vue {
  // windowScrolled = false;

  // constructor(
  //   @Inject(DOCUMENT) private document: Document,
  //   private scroll: ViewportScroller) {
  //   super();
  // }

  // @HostListener("window:scroll", [])
  // onWindowScroll() {
  //   if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
  //     this.windowScrolled = true;
  //   }
  //   else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
  //     this.windowScrolled = false;
  //   }
  // }

  // scrollToTop() {
  //   this.scroll.scrollToPosition([0,0]);
  // }

  // ngOnInit() {}
}
