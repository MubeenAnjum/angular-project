import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import { ImagekitUrlEndpoint, vatPercent } from 'src/environments/environment';
import Swal from 'sweetalert2'
import SwiperCore, { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-dha',
  templateUrl: './dha.component.html',
  styleUrls: ['./dha.component.css']
})
export class DhaComponent implements OnInit {
  cartItem: any = {};
  instituteData: any;
  mainList: any = [];
  optionList: any = [];
  IsMobile = false;
  editList: any = [];
  locationList: any;
  SubCategoryServicesList: any;
  IsLoading = true;
  IsMinMenu = false;
  IsOptionFooterShow = false;
  IsEditFooterShow = false;
  locationName = '';
  IsAdded: any = [];
  categoryId: any;
  serviceId = '0'
  TotalService = 0;
  ServiceAmount: any = [];
  TotalPrice = 0;
  Service: any;
  count: any = {};
  isDisable: any = [];
  IsCartExist = false;
  optionCount = 0;
  editCount = 0;
  parentCount: any = {};
  totalOption = 0;
  totalEdit = 0;
  totalAddedEdit = 0;
  totalAmtOption = 0;
  totalAmtEdit = 0;
  totalEditPackage = 0;
  catOrder = 0;
  classAdd: any = [];
  isButtonScroll = 0;
  IsStripAmt = 0;
  optionIds = '';
  editIds = '';
  h1_tag = '';
  LocationName = '';
  IsPreLoading = true;
  IsViewDetailLoading = true;
  IsPackage = false;
  SubCatCount = 0;
  meet_artist = '';
  look_book = '';
  fixed_top = false;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 3,
    pagination: {
      clickable: true,
      el: ".swiper-pagination",
      type: "progressbar"
    },
  };
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.scrollY >= 395) {
      this.fixed_top = true;
    }
    else {
      this.fixed_top = false;
    }
    if (this.isButtonScroll > 75) {
      this.classAdd = [];
    }
    this.isButtonScroll++;
  }
  titleName = '';
  optionName = '';
  optionTotal = '';
  optionImg = '';
  editName = '';
  editTotal = '';
  editImg = '';
  optionLoader = true;
  editLoader = true;
  imagekitUrlEndpoint = '';
  @ViewChild('btntermsncondition') btntermsncondition: any;
  @ViewChild('btnprivacypolicy') btnprivacypolicy: any;
  @ViewChild('btncancellationpolicy') btncancellationpolicy: any;
  @ViewChild('btnLocation') btnLocation: any;
  constructor(private title: Title, private meta: Meta, private scroller: ViewportScroller, private activatedRoute: ActivatedRoute, private sharedService: SharedService, private categoryService: CategoryService, private locationService: LocationService, private ls: LocalStoreService, private router: Router) { }
  ngOnInit(): void {
    this.ls.setItem('CatId', '46')
    this.ls.setItem('LocationId', '5')

    this.instituteData = this.categoryService.getInstituteData();

    if (window.innerWidth >= 1080) {
      this.IsMobile = false;
    }
    else {
      this.IsMobile = true;
    }
    if (this.activatedRoute.snapshot.paramMap.get('slug')) {

      this.sharedService.AddLog('sub-category', this.activatedRoute.snapshot.paramMap.get('slug'));

      this.GetCategoryBySlug(this.activatedRoute.snapshot.paramMap.get('slug'));


    }
    else {
      if (this.ls.getItem('LocationId')) {
        this.categoryId = this.ls.getItem('CatId');
        this.titleName = this.ls.getItem('CatName');

        this.sharedService.AddLog('sub-category', this.ls.getItem('CatName'));
        let model = { PageName: 'Category', Title: this.ls.getItem('CatName'), IsSearch: true }
        this.sharedService.setPageName(model);
        this.SubCategory(this.categoryId, 0);
        this.GetServiceCart();
        this.GetBookingSubCategoryCount();
        this.GetCategory();
        this.GetCartService();
      }
      else {
        this.GetLocation();
      }
    }

    this.imagekitUrlEndpoint = ImagekitUrlEndpoint



  }
  GetLocation() {

    this.locationService.GetLocation().subscribe((data: any) => {

      this.locationList = data;
      setTimeout(() => {

        this.btnLocation.nativeElement.click();

      }, 1000);


    });
  }


  GetCategoryBySlug(slug: any) {
    let locationId = 5;

    if (slug == 'salon-for-men' || slug == 'spa-for-men') {
      this.ls.setItem('LocationId', '9')
      locationId = 9
    }
    if (this.ls.getItem('LocationId')) {
      locationId = this.ls.getItem('LocationId');
    }
    if (locationId == 0) {
      this.GetLocation();
    }
    else {
      this.ls.setItem('LocationId', '5')
      let model = {
        p_slug: slug,
        p_location_id: 5
      }
      this.categoryService.GetCategoryBySlug(model).subscribe((data: any) => {

        if (data.length > 0) {
          this.ls.setItem('CatId', data[0].id)
          this.ls.setItem('CatName', data[0].category_name)

          this.categoryId = this.ls.getItem('CatId');
          this.titleName = this.ls.getItem('CatName');
          let model = { PageName: 'Category', Title: this.ls.getItem('CatName'), IsSearch: true }
          this.sharedService.setPageName(model);
          this.SubCategory(this.categoryId, 0);
          this.GetServiceCart();
          this.GetBookingSubCategoryCount();
          this.GetCategory();
        }
        else if (this.ls.getItem('CatId')) {

          this.categoryId = this.ls.getItem('CatId');
          this.titleName = this.ls.getItem('CatName');
          let model = { PageName: 'Category', Title: this.ls.getItem('CatName'), IsSearch: true }
          this.sharedService.setPageName(model);
          this.SubCategory(this.categoryId, 0);
          this.GetServiceCart();
          this.GetBookingSubCategoryCount();
          this.GetCategory();

        }
      });
    }
    this.GetCartService();
  }
  GetCategory() {
    this.categoryService.GetAcademyCategory().subscribe((data: any) => {
      let lst = data.filter((x: any) => x.id == this.categoryId);
      this.title.setTitle(" Mirrors Institute of Aesthetics | " + lst[0].category_name); // <-- Update the title 

      this.meta.updateTag({
        name: 'title',
        content: lst[0].meta_title
      });
      this.meta.updateTag({
        name: 'keywords',
        content: lst[0].meta_keywords
      });
      this.meta.updateTag({
        name: 'description',
        content: lst[0].meta_description
      });
    })
  }
  SubCategory(p_category_id: any, p_sub_category_id: any) {



    let model = {
      p_category_id: p_category_id,
      p_sub_category_id: p_sub_category_id,
      p_location: 5

    }

    this.categoryService.SubCategory(model).subscribe((data: any) => {
      let master_service_ids = '';
      this.GetPakage();
      this.mainList = data;
      this.h1_tag = this.mainList[0].h1_tag;
      this.mainList = this.mainList.sort((a: any, b: any) => a['position'] - b['position']);

      this.categoryService.GetService('0', p_category_id, p_sub_category_id, '5').subscribe((x: any) => {
        let SubCatId = 0;

        this.SubCategoryServicesList = x;
        this.SubCategoryServicesList = this.SubCategoryServicesList.sort((a: any, b: any) => a['sub_category_id'] - b['sub_category_id']);
        for (let index = 0; index < this.SubCategoryServicesList.length; index++) {
          this.isDisable[this.SubCategoryServicesList[index].master_service_id] = false;
        }
        // for (let index = 0; index < this.SubCategoryServicesList.length; index++) {
        //   master_service_ids+=this.SubCategoryServicesList[index].master_service_id+',';
        //   if(this.SubCategoryServicesList[index].sub_category_id!=SubCatId){
        //   SubCatId=this.SubCategoryServicesList[index].sub_category_id;
        //   this.SubCategoryServicesList[index]['is_first']=1;
        //   // if(this.SubCategoryServicesList[index].position==1){
        //   // this.SubCategoryServicesList[index]['is_first']=1; 
        //   // }
        //   // else{
        //   //   this.SubCategoryServicesList[index]['is_first']=0;
        //   // }
        //   }
        //   else{
        //     this.SubCategoryServicesList[index]['is_first']=0;
        //   }

        // }
        // master_service_ids = master_service_ids.replace(/,\s*$/, "");

        this.SubCategoryServicesList = this.SubCategoryServicesList.sort(
          function (a: any, b: any) {
            if (a.sub_category_id === b.sub_category_id) {
              // Price is only important when cities are the same
              return a.position - b.position;
            }
            return a.sub_category_position > b.sub_category_position ? 1 : -1;
          });

        if (this.categoryService.GetServiceId()) {
          let serId = this.categoryService.GetServiceId();
          this.categoryService.SetServiceId(null)
          this.GetServiceSearch(serId);
        }

        else if (this.categoryService.GetSubCategoryValue()) {
          let subCatId = this.categoryService.GetSubCategoryValue();
          this.categoryService.SetSubCategoryValue(null)
          this.jumpToService(subCatId);
        }
        else {
          this.jumpToService(0);

        }
      });

      this.IsLoading = false;

    });
  }

  GetServiceCart() {

    this.TotalPrice = 0;
    let cart = this.ls.getItem('cart')
    if (this.ls.getItem('LocationId')) {
      if (cart) {
        if (cart.length > 0) {
          let p_master_service_ids = '';
          for (let ab = 0; ab < cart.length; ab++) {
            const c = cart[ab];
            p_master_service_ids += c.master_service_id + ',';
          }
          p_master_service_ids = p_master_service_ids.replace(/,\s*$/, "");
          let model = {
            p_location_id: 5,
            p_master_service_ids: p_master_service_ids
          }
          // this.categoryService.GetService('0','0','0',this.ls.getItem('LocationId')).subscribe((data:any)=>{
          this.categoryService.GetServiceAmountByLocation(model).subscribe((data: any) => {
            let newcart: any = [];

            for (let ab = 0; ab < cart.length; ab++) {

              const c = cart[ab]
              for (let index = 0; index < data.length; index++) {

                const d = data[index];
                if (d.master_service_id == c.master_service_id) {
                  newcart.push(c);
                  this.ServiceAmount[c.master_service_id] = d.amount;
                  this.TotalPrice += (this.ServiceAmount[c.master_service_id] * c.qty);
                  break;
                }

              }
            }
            this.ls.setItem('cart', newcart);
            this.TotalService = this.ls.getItem('cart').reduce((total: any, line: any) => total + line.qty, 0);
          });

          this.IsCartExist = true;
        }
        else this.IsCartExist = false;



      }
      else {
        this.IsCartExist = false;
      }
    }
    // else{
    //   this.router.navigate(['/location']);
    // }.

  }

  GetServiceSearch(serviceId: any) {
    this.IsMinMenu = false;

    //this.categoryService.GetService(serviceId,'0','0',this.ls.getItem('LocationId')).subscribe((data:any)=>{

    this.sharedService.AddLog('sub-category', 'serviceId=' + serviceId);
    // this.SubCategoryServicesList=data;
    let data = this.SubCategoryServicesList;
    let cart = this.ls.getItem('cart')

    this.IsMinMenu = true;
    if (cart) {

      cart.forEach((c: any) => {
        this.IsAdded[c.master_service_id] = true;
        for (let index = 0; index < data.length; index++) {

          if (!this.IsAdded[c.master_service_id]) this.IsAdded[c.master_service_id] = false;
          const d = data[index];
          if (d.master_service_id == c.master_service_id) {

            this.count[d.master_service_id] = c.qty;

            break;
          }
          // else if(d.is_options!='1'){
          //   d.is_options.split(',').forEach((e:any) => {

          //     if(e==c.master_service_id){

          //   if(!this.parentCount[d.master_service_id]) this.parentCount[d.master_service_id]=0;
          //       this.parentCount[d.master_service_id]+=c.qty;

          //     }

          //   });
          // }

        }
      });

    }
    this.IsLoading = false;

    setTimeout(() => {

      this.classAdd['s-' + serviceId] = true;
      this.scroller.scrollToAnchor('s-' + serviceId);

      this.isButtonScroll = 0;
    }, 250);

  }
  jumpToService(id: any) {
    this.IsMinMenu = false;

    //this.categoryService.GetService('0','0',id,this.ls.getItem('LocationId')).subscribe((data:any)=>{
    // this.SubCategoryServicesList=data; 
    this.parentCount = {};
    let data = this.SubCategoryServicesList;

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
          if (d.is_count > 1) {
            for (let p = 0; p < d.is_options.split(',').length; p++) {
              const e = d.is_options.split(',')[p];


              if (e == c.master_service_id) {

                if (!this.parentCount[d.master_service_id]) this.parentCount[d.master_service_id] = 0;
                this.parentCount[d.master_service_id] += c.qty;

              }

            }
            if (this.parentCount[d.master_service_id] > 0) {
              this.IsAdded[d.master_service_id] = true;
            }
          }
          if (d.master_service_id == c.master_service_id) {

            this.count[d.master_service_id] = c.qty;
            break;
          }

        }
      });

    }

    this.IsLoading = false;
    if (id != 0) {



      this.classAdd[id] = true;
      setTimeout(() => {

        this.scroller.scrollToAnchor(id);

        this.isButtonScroll = 0;
        //this.classAdd[id]=false;
        //if(this.SubCategoryServicesList.length>0)   window.scrollTo(window.scrollX, window.scrollY - 115);

      }, 250);
    }
    // });

  }

  SelectedLocation(Id: any = 5) {
    let LocationName = this.locationList.filter((x: any) => x.id == Id).map((y: any) => y.location_name)
    this.ls.setItem('LocationId', Id);
    this.ls.setItem('LocationName', LocationName);
    this.ngOnInit();
  }
  GoTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return false;
  }

  ServiceDetail(service: any, Id: string) {

    this.serviceId = Id;
    this.Service = service;
    this.sharedService.setreload(this.Service);

  }

  SubCategoryServices(id: any) {
    let cart = this.ls.getItem('cart')

    this.TotalService = this.ls.getItem('cart').reduce((total: any, line: any) => total + line.qty, 0);
    if (cart) {

      cart.forEach((element: any) => {

        //this.categoryService.GetService(element.master_service_id,'0','0',this.ls.getItem('LocationId')).subscribe((obj:any)=>{
        let obj;
        obj = this.SubCategoryServicesList;
        this.isDisable[obj.master_service_id] = false;
        if (obj.length > 0) {
          obj = obj[0];
          this.count[obj.master_service_id] = element.qty;
          this.IsAdded[obj.master_service_id] = true;
        }
      });

      //});
    }
  }

  UpdateService(e: any) {

    if (!this.count[e.master_service_id]) this.count[e.master_service_id] = 0;
    this.count[e.master_service_id] += e.qty;
    let TolSerAmt = this.ServiceAmount[e.master_service_id];
    if (!TolSerAmt) TolSerAmt = e.amount;
    if (e.qty == -1) TolSerAmt = -TolSerAmt;
    this.TotalPrice += TolSerAmt;
    this.TotalService = this.ls.getItem('cart').reduce((total: any, line: any) => total + line.qty, 0);
    if (this.count[e.master_service_id] == 0) this.IsAdded[e.master_service_id] = false;
    else this.IsAdded[e.master_service_id] = true;
    //this.updateCart(e.master_service_id,e.qty);
  }

  onImgError(event: any) {
    event.target.src = './assets/img/image-not-available.jpg';
  }
  ViewCart() {

    if (this.ls.getItem('LocationId') == 3) {
      if (this.TotalPrice <= 199) {
        this.sharedService.Message('Minimum AED 199 for Home service', 'error');

      }
      else {
        this.router.navigate(['/view-cart']);
      }

    } else {
      this.router.navigate(['/view-cart']);
    }
  }
  GetOption(ids: any, name: any, total: any, image: any) {
    this.IsOptionFooterShow = false;
    this.totalOption = 0;
    this.totalAmtOption = 0;
    this.optionName = name;
    this.optionTotal = total;
    this.optionImg = image;
    this.optionLoader = true;
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

      this.optionLoader = false;
      this.optionIds = '';
      if (this.optionList[0].option_position) {
        this.optionList = this.optionList.sort((a: any, b: any) => a['option_position'] - b['option_position']);
      }
      else {
        this.optionList = this.optionList.sort((a: any, b: any) => a['amount'] - b['amount']);
      }
      this.optionCount = this.optionList.length;
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
    });
  }

  UpdateOption(id: any) {

    this.IsMinMenu = false;
    this.categoryService.GetService('0', '0', id, '5').subscribe((data: any) => {
      this.parentCount = {};
      //let data=this.SubCategoryServicesList
      //  this.SubCategoryServicesList=data;

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
            if (d.is_count > 1) {
              for (let p = 0; p < d.is_options.split(',').length; p++) {
                const e = d.is_options.split(',')[p];


                if (e == c.master_service_id) {

                  if (!this.parentCount[d.master_service_id]) this.parentCount[d.master_service_id] = 0;
                  this.parentCount[d.master_service_id] += c.qty;

                }

              }
              if (this.parentCount[d.master_service_id] > 0) {
                this.IsAdded[d.master_service_id] = true;
              }
            }
            if (d.master_service_id == c.master_service_id) {

              this.count[d.master_service_id] = c.qty;
              break;
            }

          }
        });

      }

      this.IsLoading = false;


    });

  }
  ViewDetailUpdateOption(e: any) {

    //this.UpdateOption(e.id);
    this.ngOnInit();

  }
  search() {
    this.router.navigate(['/search-service']);
  }
  Back() {
    if (this.IsMobile) {
      this.router.navigate(['/category']);
    }
    else {
      this.router.navigate(['/']);
    }
  }

  //#region Edit

  GetEdit(ids: any, name: any, total: any, image: any, package_count: any) {
    this.IsPreLoading = true;
    this.IsEditFooterShow = false;
    this.totalAddedEdit = 0;
    this.totalEdit = 0;
    this.totalAmtEdit = 0;
    this.editName = name;
    this.editTotal = total;
    this.editImg = image;
    this.totalEditPackage = package_count;
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
      this.editList = data;
      this.editIds = '';
      // if(this.editList[0].option_position){
      //   this.optionList=this.optionList.sort((a:any,b:any)=> a['option_position'] - b['option_position']);
      // }
      // else{
      // this.optionList=this.optionList.sort((a:any,b:any)=> a['amount'] - b['amount']);
      // }

      this.editList = this.editList.sort((a: any, b: any) => a['amount'] - b['amount']);
      this.editCount = this.editList.length;
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
              this.editIds += d.master_service_id + ',';
              this.count[d.master_service_id] = c.qty;
              this.totalAddedEdit = this.totalAddedEdit + 1
              this.totalEdit += c.qty;
              this.totalAmtEdit += d.amount;
              this.IsEditFooterShow = true;
              break;
            }

          }
        });

      }
      this.IsPreLoading = false;
    });
  }

  UpdateEdit(id: any) {
    this.IsMinMenu = false;
    this.categoryService.GetService('0', '0', id, '5').subscribe((data: any) => {
      this.parentCount = {};
      //let data=this.SubCategoryServicesList
      //  this.SubCategoryServicesList=data;

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
            if (d.is_count > 1) {
              for (let p = 0; p < d.is_options.split(',').length; p++) {
                const e = d.is_options.split(',')[p];


                if (e == c.master_service_id) {

                  if (!this.parentCount[d.master_service_id]) this.parentCount[d.master_service_id] = 0;
                  this.parentCount[d.master_service_id] += c.qty;

                }

              }
              if (this.parentCount[d.master_service_id] > 0) {
                this.IsAdded[d.master_service_id] = true;
              }
            }
            if (d.master_service_id == c.master_service_id) {

              this.count[d.master_service_id] = c.qty;
              break;
            }

          }
        });

      }

      this.IsLoading = false;


    });

  }

  GetBookingSubCategoryCount() {
    let model = {
      p_category_id: this.categoryId,
      p_location_id: 5
    }

    this.categoryService.GetBookingSubCategoryCount(model).subscribe((data: any) => {
      this.catOrder = data[0].count;
    });
  }
  //#endregion
  GetTermAndCondition(val: any) {

    this.sharedService.AddLog('sub-category', 'GetTermAndCondition=' + val);
    if (val == 'term') {
      this.btntermsncondition.nativeElement.click();
    }
    if (val == 'privacy') {
      this.btnprivacypolicy.nativeElement.click();
    }
    if (val == 'cancellation') {
      this.btncancellationpolicy.nativeElement.click();
    }
  }
  getMeetArtist(val: any) {
    this.meet_artist = val;

    this.sharedService.AddLog('sub-category', 'getMeetArtist=' + val);
  }
  getLookBook(val: any) {

    this.sharedService.AddLog('sub-category', 'getLookBook=' + val);
    this.look_book = val;
  }
  GetPakage() {
    if (this.ls.getItem('LocationId')) {
      if (this.ls.getItem('LocationId') == 3) {
        if (this.ls.getItem('CatId') == 48) this.IsPackage = true;
        else this.IsPackage = false;
      }
      else {
        if (this.ls.getItem('CatId') == 1) this.IsPackage = true;
        else this.IsPackage = false;
      }
    }
  }
  SelectService(catId: any, serviceId: any) {
    this.ls.setItem('CatId', catId)
    this.categoryService.SetServiceId(serviceId);
    this.router.navigate(['/service-detail'], { fragment: serviceId });
  }

  GetCartService() {

    let cart = this.ls.getItem('cart')

    if (cart) {

      if (cart.length > 0) {
        let model = {
          p_location_id: this.ls.getItem('LocationId'),
          p_master_service_ids: cart.map((item: any) => item.master_service_id).join(',')
        }
        this.categoryService.GetServiceAmountByLocation(model).subscribe((obj: any) => {

          this.cartItem = obj;
          this.cartItem.forEach((item: any) => {
            this.IsAdded[item.master_service_id] = true;
            //this.isDisable[item.master_service_id]=true;
            this.count[item.master_service_id] = item.quantity = cart.find((x: any) => x.master_service_id == item.master_service_id).qty

          });




        });
      }

    }
  }
}
