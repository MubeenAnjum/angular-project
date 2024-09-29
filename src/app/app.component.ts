import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
// import { VisibilityScrollService } from '../app/service/visibility-scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myVideo', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;

  title = ' Mirrors Institute of Aesthetics';
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    setTimeout(() => {
      const waButton = document.getElementById('aisensy-wa-widget');
      if (waButton) {
        this.renderer.listen(waButton, 'click', () => {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: 'waChatClick',
            category: 'Button Click',
            action: 'WhatsApp Chat Click'
          });
        });
      }
    }, 1000); 
  }
  // ngAfterViewInit() {
  //   this.visibilityScrollService.initializeVideoEvents(this.videoElement.nativeElement);
  // }

  // ngOnDestroy() {
  //   // Cleanup if needed
  // }
}
