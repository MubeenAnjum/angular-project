import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GtmService {
  constructor() {
    this.ensureDataLayer();
  }

  private ensureDataLayer() {
    (window as any).dataLayer = (window as any).dataLayer || [];
  }

  public pushEvent(event: any) {
    (window as any).dataLayer.push(event);
  }
}
