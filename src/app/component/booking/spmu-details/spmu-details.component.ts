import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { SharedService } from 'src/app/service/shared.service';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { GtmService } from '../../../service/gtm.service';
import { Subject } from 'rxjs';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-spmu-details',
  templateUrl: './spmu-details.component.html',
  styleUrls: ['./spmu-details.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SpmuDetailsComponent implements OnInit {
  @Input() Service: any;
  @Output() UpdateService = new EventEmitter<any>();
  @Output() ViewDetailUpdateOption = new EventEmitter<any>();
  @ViewChild('h1') h1: any;
  private destroy$ = new Subject<void>();
  public safeToolsImages: SafeHtml | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private categoryService: CategoryService,
    private ls: LocalStoreService,
    private sharedService: SharedService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private gtmService: GtmService ,
    private router: Router
  ) { }
  IsLoading = true;
  serviceProcedure: SafeHtml | undefined;
  count: any = {};
  isDisable: any = []
  IsAdded: any = [];
  optionList: any;
  ServiceAmount: any = [];
  TotalPrice = 0;
  TotalService = 0;
  faqList: any = [];
  whyList: any = [];
  IsMinMenu = false;
  IsOptionFooterShow = false;
  optionIds = '';
  optionName = '';
  optionTotal = '';
  optionImg = '';
  optionCount = 0;
  parentCount: any = {};
  totalOption = 0;
  totalAmtOption = 0;
  IsCartExist = false;
  IsSingle = false;
  recommended: any;
  CatId: any;
  isModalVisible = false; // Control the modal visibility

  ngOnInit(): void {
    this.updateCanonicalLink("https://www.mirrorsinstituteofaesthetics.com/service-detail/permanent-makeup-courses")
    this.updateMetaDescription('Mirrors Beauty Makeup School offers specialized semi-permanent makeup courses in Dubai. Our expert-led training covers techniques for eyebrows, eyeliner, and lip tinting to enhance your skills in the world of semi-permanent beauty solutions. Whether you are a beginner or looking to advance your skills, our tailored classes are designed to meet your needs.');
    this.gtmService.pushEvent({
      event: 'pageView',
      category: 'user',
      action: 'submit',
      label: 'spmu courses'
    });
    this.showModal();
    this.IsLoading = true;
    this.sharedService.getreload().subscribe((p: any) => {
      this.CatId = this.ls.getItem('CatId');
      this.IsLoading = true;
      this.LoadData();
      this.GoTop(p);
    });
    this.LoadData();
    // this.loadServiceContent();
    this.getFAQ(this.Service.master_service_id)
  }

  // loadServiceContent(): void {
  //   const contentFromDb = this.Service.service_procedure;
  //   this.serviceProcedure = this.sanitizer.bypassSecurityTrustHtml(contentFromDb);
  // }

  ngAfterViewInit(): void {
    fromEvent($('#view_page'), 'shown.bs.modal')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('Modal shown, initializing Slick sliders after delay...');
        this.initializeSlickSlidersWithDelay();
      });
  }

  private initializeSlickSlidersWithDelay(): void {
    
    this.safeToolsImages = this.sanitizer.bypassSecurityTrustHtml(this.Service.tools_images);
    setTimeout(() => {
      console.log('Initializing Slick sliders...');
      const sliderElements = $('.slider, .slider-2');
      console.log('Slider elements found:', sliderElements.length);
      sliderElements.each((index: number, element: any) => {
        console.log('Element:', element);
      });

      if (sliderElements.length) {
        sliderElements.slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true,
          autoplay: true,
          autoplaySpeed: 2000,
          arrows: false
        });
        console.log('Slick sliders initialized.');
      } else {
        console.warn('Slider elements not found.');
      }
    }, 3000); // Adjust the delay as needed
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFAQ(p_service_id: any) {
    let model = {
      p_service_id: p_service_id,
      p_location_id: this.ls.getItem('LocationId')
    }

    this.categoryService.GetMasterServiceFaq(model).subscribe((x: any) => {

      setTimeout(() => {

        this.IsLoading = false;

      }, 2000);
      this.faqList = x;
    });

  }

  //#region Option 
  LoadData() {
    let data = this.Service;
    let cart = this.ls.getItem('cart')
    this.IsAdded[data.master_service_id] = false;
    this.recommended = this.Service.recommended;
    if (cart) {
      let isExists = cart.filter((x: any) => x.master_service_id == data.master_service_id);
      if (isExists && isExists.length > 0) {
        this.IsAdded[data.master_service_id] = true;
        this.IsSingle = true;
        this.count[data.master_service_id] = isExists[0].qty;
      }
      else {
        this.IsSingle = false;
      }
    }

  }
  senitizerFunction(content : any) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
  GetOption(ids: any, name: any, total: any, image: any) {
    this.IsOptionFooterShow = false;
    this.optionList = [];
    this.totalOption = 0;
    this.totalAmtOption = 0;
    this.optionName = name;
    this.optionTotal = total;
    this.optionImg = image;
    //   let model={
    //     p_location_id:this.ls.getItem('LocationId'),
    //     p_master_service_ids:ids
    //   }
    // this.categoryService.GetServiceOption(model).subscribe((data:any)=>{
    let model = {
      p_location_id: 5,
      p_master_service_ids: ids
    }
    this.categoryService.GetServiceAmountByLocation(model).subscribe((data: any) => {
      this.optionList = data;
      this.optionIds = '';

      if (this.optionList[0].option_position) {
        this.optionList = this.optionList.sort((a: any, b: any) => a['option_position'] - b['option_position']);
      }
      else {
        this.optionList = this.optionList.sort((a: any, b: any) => a['amount'] - b['amount']);
      }
      this.optionCount = this.optionList.length;
      if (this.optionCount > 0) {
        this.recommended = this.optionList[0].recommended;
      }
      let cart = this.ls.getItem('cart')
      this.IsMinMenu = true;
      if (cart) {

        if (cart.length > 0) this.IsCartExist = true;
        else this.IsCartExist = false;
        cart.forEach((c: any) => {
          this.IsAdded[c.master_service_id] = true;
          for (let index = 0; index < data.length; index++) {

            if (!this.IsAdded[c.master_service_id]) this.IsAdded[c.master_service_id] = false;
            const d = data[index];

            if (d.master_service_id == c.master_service_id) {
              this.optionIds += d.master_service_id + ',';
              this.count[d.master_service_id] = c.qty;
              this.totalOption += c.qty;
              this.totalAmtOption += d.amount;
              this.IsOptionFooterShow = true;
              break;
            }

          }
        });

      }

      setTimeout(() => {

        this.IsLoading = false;

      }, 2000);
    });
  }

  onImgError(event: any) {
    event.target.src = './assets/img/image-not-available.jpg';
  }
  GoTop(model: any) {
    if (model) {

      this.getFAQ(model.master_service_id);
      // this.getwhyMirror(model.category_id);
      this.GetOption(model.is_options, model.name, model.is_count, model.option_image);

      setTimeout(() => {

        if (this.h1) {
          this.h1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })

          setTimeout(() => {

            this.IsLoading = false;

          }, 2000);

          return false;
        }
        return;
      }, 500);
    }
  }
  
 
  //#endregion
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

  // Method to show the modal (e.g., triggered by a button)
  showModal() {
    this.isModalVisible = true;
  }

  // Method to handle the enroll button click
  enroll() {
    this.isModalVisible = false; // Hide the modal
    this.router.navigate(['/register-new']); // Navigate to the new route
  }
}


