import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { NgOtpInputComponent } from 'ng-otp-input';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { SharedService } from 'src/app/service/shared.service';
import { SwiperOptions } from 'swiper';
import { CategoryService } from 'src/app/service/category.service';

import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay
} from "swiper";

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home-trial',
  templateUrl: './home-trial.component.html',
  styleUrls: ['./home-trial.component.css']
})
export class HomeTrialComponent implements OnInit {

  catList: any = [];
  loading = true;
  IsLocationExist = true;
  mobileNo: any;

  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput: any;
  @ViewChild('btnClose') btnClose: any;
  @ViewChild('btnLocation') btnLocation: any;
  @ViewChild('btnCategory') btnCategory: any;
  @ViewChild('btnClosemobileapp') btnClosemobileapp: any;
  @ViewChild('btnCloseMobileNo') btnCloseMobileNo: any;
  @ViewChild('btnCloseLaunchingSoon') btnCloseLaunchingSoon: any;
  @ViewChild('btnLogin') btnLogin: any;
  @ViewChild('btntermsncondition') btntermsncondition: any;
  @ViewChild('btnprivacypolicy') btnprivacypolicy: any;
  @ViewChild('btncancellationpolicy') btncancellationpolicy: any;
  @ViewChild('btnsafety') btnsafety: any;
  @ViewChild('btnmarina') btnmarina: any;
  @ViewChild('btninvalidotp') btninvalidotp: any;

  // Define interfaces for Swiper options
  config: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 20,
    grabCursor: true,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    }

  };
  IsMobile = false;

  constructor(private title: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private scroller: ViewportScroller,
    private categoryService: CategoryService,
    private ls: LocalStoreService) { }

  ngOnInit(): void {

    this.sharedService.AddLog('home', 'home');
    this.title.setTitle(" Mirrors Institute of Aesthetics | Home"); // <-- Update the title
    if (window.innerWidth >= 1080) {
      this.IsMobile = false;
    }
    else {
      this.IsMobile = true;
    }

    if (this.ls.getItem('LocationId')) {
      this.IsLocationExist = true;
      if (this.ls.getItem('LocationId') == '3') {
        this.meta.updateTag({
          name: 'description',
          content: 'Best Salon Beauty Services at home in Dubai For Ladies Only - we provide professional hair, facial, eyelash, threading, nail, wax, massage, henna, Moroccan bath and makeup services.'
        });
        this.meta.updateTag({
          name: 'keywords',
          content: 'beauty services at home, beauty parlour services at home, beauty salon home services, home service salon near me, beauty treatments at home Dubai, salon at home, salon services at home, facial at home, at home eyelash extensions, nails home service, manicure and pedicure at home service Dubai, at home nail service, keratin treatment at home, waxing service at home,  home hairdresser, home massage in Dubai, hair and makeup home service, home spa, massage home service Dubai, home service nail salon spa,'
        });
      }
      else {
        this.meta.updateTag({
          name: 'description',
          content: 'Mirrors Beauty Lounge is the best Ladies Salon in Dubai, We are Dubai based ladies beauty salon providing broad range of beauty services.'
        });
        this.meta.updateTag({
          name: 'keywords',
          content: 'beauty services at home, beauty parlour services at home, beauty salon home services, home service salon near me, beauty treatments at home Dubai, salon at home, salon services at home, facial at home, at home eyelash extensions, nails home service, manicure and pedicure at home service Dubai, at home nail service, keratin treatment at home, waxing service at home,  home hairdresser, home massage in Dubai, hair and makeup home service, home spa, massage home service Dubai, home service nail salon spa,'
        });
      }
    }

    let id = this.activatedRoute.snapshot.queryParams['ref'];
    if (id) {
      this.ls.setItem('ReferId', id);
    }

    this.categoryService.GetCategory().subscribe((data: any) => {
      this.catList = data.filter((x: any) => x.status == 1 && x.id != 50);
      this.loading = false;

    });

  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
  }

  // Define your Swiper configurations

  educationslider: SwiperOptions = {
    slidesPerView: 1,
    effect: "fade",
    freeMode: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    }
  };
  reviewslidernew: SwiperOptions = {
    slidesPerView: 3.5,
    spaceBetween: 20,
    grabCursor: true,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.3,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      },
    },
  };
  teamslidernew: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 20,
    grabCursor: true,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 2.1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  };
  offerslider: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    grabCursor: true,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  };
  services_based_slider: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    grabCursor: true,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  };

  GetCategory(gender: any) {
    let IsHomeCate = 0;
    if (this.ls.getItem('LocationId')) {
      if (this.ls.getItem('LocationId') == '3') {
        IsHomeCate = 1;
        let model = { PageName: 'Category', Title: 'Salon at home', IsSearch: false }
        this.sharedService.setPageName(model);
      }
    }
    else {
      let model = { PageName: 'Category', Title: 'Salon Service', IsSearch: false }
      this.sharedService.setPageName(model);
      this.btnLocation.nativeElement.click();
    }
    if (IsHomeCate == 0) {
      this.categoryService.GetCategory().subscribe((data: any) => {
        this.catList = data.filter((x: any) => x.status == 1 && x.id != 48 && x.gender == gender);
        this.loading = false;

      });
    }
    else {
      this.categoryService.GetHomeCategory().subscribe((data: any) => {
        this.catList = data.filter((x: any) => x.status == 1 && x.id != 50);
        this.loading = false;

      });
    }
  }

  GetCategoryList(gender: any) {
    let IsHomeCate = 0;
    this.categoryService.GetCategory().subscribe((data: any) => {
      this.catList = data.filter((x: any) => x.status == 1 && x.id != 50);
      this.loading = false;

    });
  }
}
