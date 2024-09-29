import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisibilityScrollService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initializeVideoEvents(videoElement: HTMLVideoElement) {
    this.renderer.listen('document', 'visibilitychange', () => {
      if (document.visibilityState === 'visible' && videoElement.paused) {
        videoElement.play();
      }
    });

    this.renderer.listen('window', 'scroll', () => {
      if (videoElement.paused) {
        videoElement.play();
        console.log('play');
      }
    });
  }
}
