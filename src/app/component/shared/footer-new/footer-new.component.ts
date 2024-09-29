import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FooterLinksService } from 'src/app/service/footer-links.service';

@Component({
  selector: 'app-footer-new',
  templateUrl: './footer-new.component.html',
  styleUrls: ['./footer-new.component.css']
})
export class FooterNewComponent implements OnInit {
  currentYear=0;
  activeNav: string = '';

  @ViewChild('btntermsncondition') btntermsncondition:any;
  @ViewChild('btnprivacypolicy') btnprivacypolicy:any;
  @ViewChild('btncancellationpolicy') btncancellationpolicy:any;
  @ViewChild('btnsafety') btnsafety:any;
  constructor(private footerLinksService: FooterLinksService, private router: Router) {
    // Listen for route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeNav = event.urlAfterRedirects;
      }
    });
  }
  footerLinks: any[] = [];

  ngOnInit(): void {
    this.footerLinksService.getFooterLinks().subscribe((data) => {
      this.footerLinks = data;
    });
    this.footerLinksService.getFooterLinks().subscribe(
      data => {
        this.footerLinks = data.footerLinks; // Ensure 'footerLinks' matches your JSON structure
        console.log('Data received:', this.footerLinks);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.currentYear=(new Date()).getFullYear();
    this.activeNav = this.router.url;
  }
  isActive(route: string): boolean {
    return this.activeNav === route;
  }

  setActiveNav(route: string) {
    this.activeNav = route;
  }

  ///////////////////////////////////////////////////////
  openDropdown: string | null = null;
  toggleDropdown(menu: string) {
    this.openDropdown = this.openDropdown === menu ? null : menu;
  }
  //////////////////////////////////////////////////////
  
  reloadPage(url: string) {
    this.router.navigateByUrl(url).then(() => {
      window.location.reload();
    });
  }
  GetTermAndCondition(val:any){
    if(val=='term'){
      this.btntermsncondition.nativeElement.click();
    }
    if(val=='privacy'){
      this.btnprivacypolicy.nativeElement.click();
    }
    if(val=='cancellation'){
      this.btncancellationpolicy.nativeElement.click();
    }
    if(val=='safety'){
      this.btnsafety.nativeElement.click();
    }
  }
  

}
