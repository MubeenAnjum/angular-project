import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { GtmService } from '../../../service/gtm.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor( private title: Title,  
      @Inject(DOCUMENT) private document: Document,
      private renderer: Renderer2,
      private gtmService: GtmService,
      private route: ActivatedRoute
 ) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
   this.updateCanonicalLink("https://www.mirrorsbeautyacademy.com/about-us")
   this.updateMetaDescription("hhhLooking for professional beautician courses in dubai?Mirrors Beauty is a training institute in Dubai. Get trained withadvanced beauty therapy courses at our academy. Full time, part time or weekend batch available. Hurry Up! Enter into the world of beauty.");
   this.gtmService.pushEvent({
    event: 'pageView',
    page: 'about-us'
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
    this.renderer.setAttribute(metaDescription, 'content', newDescription);
  }
}
}
