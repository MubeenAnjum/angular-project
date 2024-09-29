import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { GtmService } from '../../../service/gtm.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private title: Title,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private gtmService: GtmService) { }

  ngOnInit(): void {
    this.title.setTitle("Professional Beautician Courses in Dubai | Mirrors Institute of Aesthetics | Account"); 
    this.updateCanonicalLink("https://www.mirrorsbeautyacademy.com/account")
    this.updateMetaDescription('Looking for professional beautician courses in dubai?Mirrors Beauty is a training institute in Dubai. Get trained withadvanced beauty therapy courses at our academy. Full time, part time or weekend batch available. Hurry Up! Enter into the world of beauty.');
    this.gtmService.pushEvent({
     event: 'pageView',
     page: 'account page'
   });
  }
  updateCanonicalLink(newCanonicalUrl: string) {
    const canonicalLink = this.document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      this.renderer.setAttribute(canonicalLink, 'href', newCanonicalUrl);
    }
  }
  updateMetaDescription(newDescription: string) {
    let metaDescription = this.document.querySelector('meta[name="description"]');
    if (metaDescription) {
      // If meta description exists, update the content attribute
      this.renderer.setAttribute(metaDescription, 'content', newDescription);
    }
}
}