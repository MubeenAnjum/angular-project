import { Component, ElementRef, HostListener, OnInit, ViewChild ,OnDestroy,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header-create',
  templateUrl: './header-create.component.html',
  styleUrls: ['./header-create.component.css']
})
export class HeaderCreateComponent implements OnInit ,OnDestroy {

  timeLeft: number = 30;
  interval: any;
  IsResendOTP = false;
  otpDetail: any = {};
  mobileNos = ''
  IsNameExist = true;
  mobiletxt = '';
  IsOTPProceed = false;
  IsOTP = false;
  IsValidNo = false;
  homeBannerList: any;
  IsLoggedIn = false;
  SignUpClick = false;
  Is1Loader = true;
  Is2Loader = true;
  Is3Loader = true;
  Is4Loader = true;
  Is5Loader = true;
  Is6Loader = true;
  locationList: any;
  catList: any = [];
  searchList: any = [];
  locationName = '';
  locationAdd = '';
  locationBannerImage = '';
  loading = true;
  IsNoResult = false;
  txtSearch = '';
  IsSearch = false;
  IsReset = false;
  currentLocation: any;
  IsLocationExist = true;
  timeout: any;
  mobileNo: any;
  searchLoader = false;
  comingSoonImg = ''
  txtMobileNo = ''
  currentYear = 0;
  salonforwomenList = [2, 6, 3, 9, 28]
  offerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  locationTitle = 'Best Salon & Home services in Dubai';
  NameDetail: any = { name: '', email: '' }


  ProcessName = "";
  LocationName = "";
  LocationAddress = "";
  IsOTPLogin = false;
  IsPreLoading = true;
  IsLoading = false;

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

  IsMobile = false;

  constructor(private title: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    private eRef: ElementRef,
    private route: Router,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private locationService: LocationService,
    private ls: LocalStoreService) { }

    placeholderIndex: number = 0;
    placeholders: string[] = [
      // 'Courses',
      '"Hair Courses"',
      '"Facial Courses"',
      '"SPMU Courses"',
      '"Eyelash Extensions Courses"',
      '"Makeup Courses"',
      '"Beauty Therapy Courses"',
      '"Spa Courses"',
      '"Salon Management Courses"'
    ];
  intervalId: any;


  ngOnInit(): void {
    this.currentYear = (new Date()).getFullYear();


    if (this.activatedRoute.snapshot.url.length > 0) {
      if (this.activatedRoute.snapshot.url[0].path == 'home-service') {
        this.RedirectToLocation('Home Service')
      }
    }

    this.sharedService.AddLog('home', 'home');
    
    if (window.innerWidth >= 1080) {
      this.IsMobile = false;
    }
    else {
      this.IsMobile = true;
    }

    if (this.ls.getItem('LocationId')) {
      this.IsLocationExist = true;

    }
    if (this.ls.getItem('customer')) {
      this.IsLoggedIn = true;
    }
    else {

      this.IsLoggedIn = false;

      //this.SignUpClick=false;


    }

    let id = this.activatedRoute.snapshot.queryParams['ref'];
    if (id) {
      this.ls.setItem('ReferId', id);
    }

    this.intervalId = setInterval(() => {
      this.cyclePlaceholder();
    }, 5000);

    this.closeSearch();
  }

  ngOnDestroy(): void {
    // Clear interval when component is destroyed
    clearInterval(this.intervalId);
  }

  cyclePlaceholder(): void {
    this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholders.length;
  }

  RedirectToLocation(name: any) {
    this.locationService.GetLocation().subscribe((data: any) => {
      
      this.locationList = data;
      let loc = this.locationList.filter((x: any) => x.location_name == name);
      this.SelectedLocation(loc[0].id);
    });
  }
  closeSearch() {
    this.txtSearch = '';
    this.IsNoResult = false;
    this.IsSearch = false;
    this.searchList = [];
    this.searchLoader = false;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (event.target.id != 'dropdownList' && event.target.name != 'pub') {
      this.closeSearch();
    }
  }

  GetServiceId(serviceId: any) {
    this.categoryService.SetServiceId(serviceId);
    this.route.navigate(['/service-detail'], { fragment: serviceId });
  }

  SelectService(catId: any, serviceId: any) {
    this.ls.setItem('CatId', catId)
    this.categoryService.SetServiceId(serviceId);
    this.route.navigate(['/service-detail'], { fragment: serviceId });
  }

  GetType(type: any) {

    if (type == 'salon') {
      this.locationService.SetType(type);
      this.route.navigate(['/location']);
    }
    if (type == 'home') {
      this.ls.setItem('LocationId', 3);
      this.ls.setItem('LocationName', 'Home Service');
      this.ls.setItem('LocationAddress', 'Home Service');
      this.locationBannerImage = this.locationList.filter((x: any) => x.id == 3).map((y: any) => y.banner)
      this.route.navigate(['/category']);
    }
    if (type == 'retail') {
      this.route.navigate(['/retail']);
    }

    if (type == 'package') {

      this.ls.setItem('CatName', 'Packages');
      this.ls.setItem('CatId', 11);
      this.route.navigate(['/service-detail/package']);

    }
    if (type == '33') {

      this.ls.setItem('CatName', 'Hair');
      this.ls.setItem('CatId', 33);
      this.route.navigate(['/service-detail/Hair']);

    }
  }

  HomeSubCategory(catId: any, subCatId: any, name: any) {
    this.ls.setItem('LocationId', 3);
    this.ls.setItem('LocationName', 'Home');
    this.locationBannerImage = this.locationList.filter((x: any) => x.id == 3).map((y: any) => y.banner)
    this.getSubCategory(catId, subCatId, name, '');
  }

  getSubCategory(catId: any, subCatId: any, name: any, slug: any) {

    this.categoryService.SetSubCategoryValue(subCatId);
    let location = '1';
    if (this.ls.getItem('LocationId')) {
      location = this.ls.getItem('LocationId');
    }
    if (location == '3') {
      if (catId == 35 || catId == 46) {
        this.route.navigate(['/expert-consultation/' + slug]);
      }
      else {
        this.route.navigate(['/service-detail/' + slug]);
      }
    }
    else {

      if (catId == 30 || catId == 3) {
        this.route.navigate(['/expert-consultation/' + slug]);
      }
      else {

        this.route.navigate(['/service-detail/' + slug]);
      }
    }
    this.ls.setItem('CatName', name);
    this.ls.setItem('CatId', catId);

  }

  getSubCategoryForHomeService(catId: any, subCatId: any, name: any, slug: any) {
    if (this.ls.getItem('LocationId')) {

      if (this.ls.getItem('LocationId') == '3') {

        this.btnLocation.nativeElement.click();
      }
      else {

        this.categoryService.SetSubCategoryValue(subCatId);
        let location = '1';
        if (this.ls.getItem('LocationId')) {
          location = this.ls.getItem('LocationId');
        }
        if (location == '3') {
          if (catId == 35 || catId == 46) {
            this.route.navigate(['/expert-consultation/' + slug]);
          }
          else {
            this.route.navigate(['/service-detail/' + slug]);
          }
        }
        else {

          if (catId == 30 || catId == 3) {
            this.route.navigate(['/expert-consultation/' + slug]);
          }
          else {

            this.route.navigate(['/service-detail/' + slug]);
          }
        }
        this.ls.setItem('CatName', name);
        this.ls.setItem('CatId', catId);
      }
    }

  }

  onImgError(event: any) {
    event.target.src = './assets/img/image-not-available.jpg';
  }

  SelectedLocation(Id: any) {

    let LocationName = this.locationList.filter((x: any) => x.id == Id).map((y: any) => y.location_name)
    this.ls.setItem('LocationId', Id);
    this.ls.setItem('LocationName', LocationName);
    this.locationBannerImage = this.locationList.filter((x: any) => x.id == Id).map((y: any) => y.banner)
    this.locationName = LocationName;
    this.locationTitle = this.locationList.filter((x: any) => x.id == Id).map((y: any) => y.heading)
    this.locationAdd = this.locationList.filter((x: any) => x.id == Id).map((y: any) => y.address);
    this.sharedService.AddLog('home', 'change location');
    this.ls.setItem('LocationAddress', this.locationAdd);

  }

  SearchService() {

    clearTimeout(parseInt(this.timeout));
    this.timeout = setTimeout(() => {

      this.sharedService.AddLog('home', 'search text ' + this.txtSearch);
      this.searchLoader = true;
      this.searchList = [];
      this.IsNoResult = false;
      this.IsSearch = false;
      if (this.txtSearch != '') {
        if (this.txtSearch.length > 1) {
          this.IsSearch = true;
          this.IsReset = true;
          this.categoryService.SearchService('0', this.txtSearch, this.ls.getItem('LocationId')).subscribe((data: any) => {
            this.searchLoader = false;
            this.searchList = data;

            if (this.searchList.length == 0) this.Clear();
            else this.IsNoResult = false;
            //  this.IsSearch=false; 

          });
        }
        else {
          this.searchList = [];

          this.searchLoader = false;
          this.IsNoResult = false;
          this.IsSearch = false;
          this.IsReset = false;
        }
      }
      else {
        this.searchList = [];
        this.IsNoResult = false;
        this.IsSearch = false;
        this.IsReset = false;

        this.searchLoader = false;
      }
    }, 500);
  }

  Clear() {
    this.searchList = [];
    this.IsNoResult = true;
  }

  MobileSearch() {
    let size = window.innerWidth;
    if (size < 1080) {
      this.ls.setItem('CatId', '0');
      this.ls.setItem('CatName', '');
      this.route.navigate(['/search-service']);
    }
  }

  Notify(val: any) {

    if (val == '') {

      this.sharedService.Message('Please enter value', 'error');
      return;
    }
    else {
      let model = {
        p_mobile: val
      }
      this.categoryService.Notify(model).subscribe((data: any) => {
        this.txtMobileNo = '';


        this.sharedService.Message(data[0].msg, 'success');
        this.btnClosemobileapp.nativeElement.click();
        this.btnCloseMobileNo.nativeElement.click();
        this.btnCloseLaunchingSoon.nativeElement.click();

      });
    }
  }

  GetLocationRedirection() {

    if (this.ls.getItem('LocationId')) {

      this.route.navigate(['/category']);
    }
    else {
      this.route.navigate(['/location']);
    }
  }

  getlogin(pageName: any) {
    
    this.sharedService.setLoginRedirect(pageName);
    if (this.SignUpClick) {
      this.SignUpClick = false;
    }
    else {
      this.SignUpClick = true;
    }
    if (this.ls.getItem('customer')) {
      this.route.navigate(['/account']);
      this.IsLoggedIn = true;
    }
    else {

      this.IsLoggedIn = false;

      //this.SignUpClick=false;


    }
  }

  GetTermAndCondition(val: any) {
    if (val == 'term') {
      this.btntermsncondition.nativeElement.click();
    }
    if (val == 'privacy') {
      this.btnprivacypolicy.nativeElement.click();
    }
    if (val == 'cancellation') {
      this.btncancellationpolicy.nativeElement.click();
    }
    if (val == 'safety') {
      this.btnsafety.nativeElement.click();
    }
  }

  SetLoginPage(pageName: any) {
    
    this.sharedService.setLoginRedirect(pageName);
  }

  clearOTP() {
    this.ngOtpInput.setValue('');
  }

  ResendOTP() {
    if (this.otpDetail.mobile) {
      this.IsLoading = true;
      let MobileNo = this.otpDetail.mobile;
      MobileNo = MobileNo.replace(/\s/g, '');
      if (MobileNo.substring(0, 3) != "+971") {
        if (MobileNo.substring(0, 4) == "00971") {
          MobileNo = "+971" + MobileNo.substring(4)
          this.IsValidNo = true;
        }
        else if (MobileNo.length == 10 && MobileNo.substring(0, 1) == "0") {
          MobileNo = "+971" + MobileNo.substring(1)
          this.IsValidNo = true;
        }
        else {
          this.IsValidNo = false;
        }
      }
      else {
        this.IsValidNo = false;
      }
      if (MobileNo.trim() != "") {

        let otp = (Math.floor(1000 + Math.random() * 9000).toString())
        let smodel = {
          MobileNo: MobileNo,
          otp:otp,
          CartSession: "Login Header"
        }

        this.categoryService.SendWhatsappSMS(smodel).subscribe((data: any) => {
          // let otp = data.data.messages[0].message.split(" ")[1];
          MobileNo = MobileNo.replace(/\s/g, '');
          if (data.success == "true") {
            let otpDetail = {
              otp: otp,
              msg: "OTP has been sent succesfully to +971 ** *** **" + MobileNo.slice(-2),
              mobile: MobileNo
            }
            this.categoryService.SetOTPDetail(otpDetail);
            this.sharedService.Message(otpDetail.msg, 'success')
          }
          else {
            this.sharedService.Message('Invalid mobile no.', 'error')
            this.mobileNo = '';
          }
          this.IsLoading = false;
        });
      }
      else {
        this.sharedService.Message('Enter mobile no.', 'error')
      }
    }
  }

  login(otp: string) {
    if (otp.length == 4) {
      this.IsOTPLogin = true;
      if (this.otpDetail.otp == otp) {
        let chmodel = {
          p_phone: this.otpDetail.mobile
        }
        this.categoryService.CheckCustomers(chmodel).subscribe((data: any) => {
          if (this.NameDetail.name != '' && this.NameDetail.email != '') {
            let model = {
              p_customer_id: data[0].id,
              p_name: this.NameDetail.name,
              p_phone: this.mobileNos,
              p_email: this.NameDetail.email,
              p_image: data[0].image
            }
            this.categoryService.UpdateProfile(model).subscribe((x: any) => {
              this.IsLoggedIn = true;

              this.sharedService.Message('Logged in successfully', 'success');
              this.btnClose.nativeElement.click();
              
              this.ls.setItem('customer', data);

              if (this.ls.getItem('slot')) {
                this.route.navigate(['/checkout']);
              }

              this.IsOTPLogin = false;
            })
          }
          else {
            this.IsLoggedIn = true;
            if (this.ls.getItem('LocationId') == '3') {
              this.ProcessName = "Add address";
              this.LocationName = "Home";
            }
            else {
              this.ProcessName = "Select Date & Slot";
              this.LocationName = "Salon";
              this.LocationAddress = this.ls.getItem('LocationName');
            }
            this.sharedService.Message('Logged in successfully', 'success');
            this.btnClose.nativeElement.click();
            this.ls.setItem('customer', data);
            if (this.ls.getItem('LocationId') == '3') {
              //this.route.navigate(['/address']);
            }
            else {
              if (this.ls.getItem('slot')) {
                this.route.navigate(['/checkout']);
              }
              else {
                // this.route.navigate(['/date-slot']);

              }
            }
            this.IsOTPLogin = false;
          }
        })
      }
      else {

        this.btninvalidotp.nativeElement.click();
      }
    }
    else {
      this.IsOTPLogin = false;
    }
  }

  EditNo() {
    this.timeLeft = 30;
    this.IsValidNo = false;
    this.IsOTP = false;
    this.IsOTPProceed = false;

    this.IsNameExist = true;
  }

  clearIsOTP() {
    this.IsOTP = false;
    this.btnClose.nativeElement.click();
    this.mobiletxt = ''
  }

  ResetLogin() {
    this.mobiletxt = ''
    this.IsOTP = false;
    this.btnClose.nativeElement.click();
    this.ngOtpInput.setValue('');
  }

  SaveNameDetail() {
    if (this.NameDetail.name != '' && this.NameDetail.email != '') {
      this.IsNameExist = true;
      let MobileNo = this.mobileNos;

      let otp = (Math.floor(1000 + Math.random() * 9000).toString())
      let smodel = {
        MobileNo: MobileNo,
        otp:otp,
        CartSession: "Login Header"
      }

      this.categoryService.SendWhatsappSMS(smodel).subscribe((data: any) => {
        // let otp = data.data.messages[0].message.split(" ")[1];
        MobileNo = MobileNo.replace(/\s/g, '');
        if (data.success == "true") {
          let otpDetail = {
            otp: otp,
            msg: "OTP has been sent succesfully to +971 ** *** **" + MobileNo.slice(-2),
            mobile: MobileNo
          }
          this.IsOTP = true;
          this.otpDetail = otpDetail;
          this.categoryService.SetOTPDetail(otpDetail);
          this.startTimer();
          this.IsOTPProceed = false;
          this.sharedService.Message(otpDetail.msg, 'success')
          // this.route.navigate(['/enter-otp']); 
        }
        else {
          this.sharedService.Message('Invalid mobile no.', 'error')
          this.mobileNo = '';
        }

      });
    }

  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.IsResendOTP = true;
        //this.timeLeft = 60;
      }
    }, 1000)
  }

  //#region Enter Mobile
  ValidMobile(MobileNo: string) {

    if (MobileNo.length > 8) {
      MobileNo = MobileNo.replace(/\s/g, '');
      if (MobileNo.substring(0, 3) != "+971") {
        if (MobileNo.substring(0, 4) == "00971") {
          MobileNo = "+971" + MobileNo.substring(4);
          this.IsValidNo = true;
        }
        else if (MobileNo.length == 9) {
          MobileNo = "+971" + MobileNo
          this.IsValidNo = true;
        }
        else if (MobileNo.length == 10 && MobileNo.substring(0, 1) == "0") {
          MobileNo = "+971" + MobileNo.substring(1)
          this.IsValidNo = true;
        }
        else {
          this.IsValidNo = false;
        }
      }
    }
    else {
      this.IsValidNo = false;
    }
  }

  SendSMS(MobileNo: string) {
    if (MobileNo.length > 8) {
      MobileNo = MobileNo.replace(/\s/g, '');
      if (MobileNo.substring(0, 3) != "+971") {
        if (MobileNo.substring(0, 4) == "00971") {
          MobileNo = "+971" + MobileNo.substring(4)
        }
        else if (MobileNo.length == 9) {
          MobileNo = "+971" + MobileNo
        }
        else if (MobileNo.length == 10 && MobileNo.substring(0, 1) == "0") {
          MobileNo = "+971" + MobileNo.substring(1)
        }
      }

      this.IsOTPProceed = true;
      this.mobileNos = MobileNo;
      let chmodel = {
        p_phone: MobileNo
      }
      this.categoryService.CheckCustomers(chmodel).subscribe((cust: any) => {
        
        if (cust.length > 0) {
          if (cust[0].name == '' || cust[0].name == null || cust[0].email == '' || cust[0].email == null) {
            this.IsNameExist = false;
          }
          else {
            let otp = (Math.floor(1000 + Math.random() * 9000).toString())
            let smodel = {
              MobileNo: MobileNo,
              otp:otp,
              CartSession: "Login Header"
            }

            this.categoryService.SendWhatsappSMS(smodel).subscribe((data: any) => {
              // let otp = data.data.messages[0].message.split(" ")[1];
              MobileNo = MobileNo.replace(/\s/g, '');
              if (data.success == "true") {
                let otpDetail = {
                  otp: otp,
                  msg: "OTP has been sent succesfully to +971 ** *** **" + MobileNo.slice(-2),
                  mobile: MobileNo
                }
                this.IsOTP = true;
                this.otpDetail = otpDetail;
                this.categoryService.SetOTPDetail(otpDetail);
                this.startTimer();
                this.IsOTPProceed = false;
                this.sharedService.Message(otpDetail.msg, 'success')
                // this.route.navigate(['/enter-otp']); 
              }
              else {
                this.sharedService.Message('Invalid mobile no.', 'error')
                this.mobileNo = '';
              }

            });
          }
        }
        else {
          this.IsNameExist = false;

        }
      });
    }
    //  else{
    //   alert('Enter mobile no.')
    //  }
  }

}

