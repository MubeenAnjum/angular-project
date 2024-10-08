
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';



@Component({
  selector: 'app-popup-save-address',
  templateUrl: './popup-save-address.component.html',
  styleUrls: ['./popup-save-address.component.css']
})
export class PopupSaveAddressComponent implements OnInit {
  @Input() someInput: any;
  
  constructor(private route: Router,private categoryService:CategoryService,private sharedService:SharedService,private locationService:LocationService,private ls:LocalStoreService) { }
 data={
  p_name:'',
  House_Number:'',
  Building:'',
  Street:'',
  Landmark:'',
  p_address_type:'',
  p_id:0,
  p_lat:'',
  p_lng:'',
  p_email:'',
  p_customer_id:'',
  p_address_detail:'',
  p_address:'',
State:''
 };
 id='0';
 latitude: number=25.264236;
 longitude: number=55.329382;
 currentAddress='';
 marker:any={
  lat: this.latitude,
  lng: this.longitude,
  label: '',
  draggable: true
};
isValid=true;
@Output() getReload = new EventEmitter<String>();
  ngOnInit(): void {
    this.isValid=true;
 //this.data.p_address_type='Home';
    if(this.ls.getItem('currentLatitude')){
      this.latitude=this.ls.getItem('currentLatitude');
    }
    if(this.ls.getItem('currentLongitude')){
      this.longitude=this.ls.getItem('currentLongitude');
    }
    
    let model={PageName:'Add Address',Title:'Add Address',IsSearch:false}
    this.sharedService.setPageName(model);
    
    if(this.ls.getItem('customer')){
      this.GetCustomerAddress(this.ls.getItem('customer')[0].id);
  
      }


  }
  GetCustomerAddress(customerId:any){
    
  if(this.categoryService.GetAddressId()){
    this.id=this.categoryService.GetAddressId();
    this.categoryService.SetAddressId(null)
    this.categoryService.GetCustomerAddress(customerId,this.id).subscribe((data:any)=>{
   this.currentAddress=data[0].address;
       this.data.p_name=data[0].name;
      this.data.p_email=data[0].email;
      this.data.p_id=data[0].id;
      this.data.p_customer_id=data[0].customer_id;
      this.data.p_address_type=data[0].address_type;
      this.data.p_address_detail=this.data.House_Number=data[0].address_detail;
      this.data.p_address=this.data.Building=data[0].address;
      this.latitude=parseFloat(data[0].lat);
      this.longitude=parseFloat(data[0].lng);
      this.data.p_lat=this.latitude.toString();
      this.data.p_lng=this.longitude.toString();
      this.currentAddress=data[0].address_detail;
    });
  }
  if(this.id=='0'){
    this.getAddress();
  }
  }
  SaveCustomerAddress(model:any){
   
   if(this.data.p_name.trim()=='' || this.data.House_Number.trim()=='' || this.data.Building.trim()==''){
this.isValid=false;
    return;
   }
    let lat=(<HTMLInputElement>document.getElementsByClassName('p_lat').item(0)).value;
    let lng=(<HTMLInputElement>document.getElementsByClassName('p_lng').item(0)).value;
    if(!this.data.p_lat) if (lat)  this.data.p_lat=lat;
    if(!this.data.p_lng)  if (lng)  this.data.p_lng=lng; 
     if(!this.data.p_id) this.data.p_id=0;
  
   this.data.p_address_detail=model.Building;
   
   this.data.p_customer_id=this.ls.getItem('customer')[0].id;
  if(!this.data.p_address){
   if(model.House_Number)this.data.p_address+=model.House_Number+',';
   if(model.Building)this.data.p_address+=model.Building+',';
   if(model.Street)this.data.p_address+=model.Street+',';
   if(model.Landmark)this.data.p_address+=model.Landmark+',';
   if(model.State)this.data.p_address+=model.State+',';
  }
    this.categoryService.SaveCustomerAddress(this.data).subscribe((data:any)=>{
       
     if(data[0].Msg){
     
      this.sharedService.Message(data[0].Msg,'success');
      if(data[0].code==1){
        this.getReload.emit('')
//this.route.navigate([address']);
      }
     }
  });
  }
  getAddressType(type:string){
    this.data.p_address_type=type;
  }

  getAddress(){
    
    if(this.ls.getItem('customer')){
      this.data.p_name=this.ls.getItem('customer')[0].name;
      this.data.p_email=this.ls.getItem('customer')[0].email;
    }
    if(this.categoryService.GetAddressDetail()){
      let address=this.categoryService.GetAddressDetail();
      this.data.Building=this.data.p_address_detail=address.formatted_address;
      this.data.Landmark=address.formatted_address;
      
     this.longitude= this.data.p_lng=address.geometry.location.lng();
     this.latitude=this.data.p_lat=address.geometry.location.lat();
      
    }
   
  }
  
  markerDragEnd(m: any, $event: any) {
    this.data.p_lat=$event['coords'].lat;
    this.data.p_lng=$event['coords'].lng; 
    this.categoryService.GetAddressFromLatLng($event['coords'].lat,$event['coords'].lng).subscribe((data:any)=>{
      let results=data['results']; 
      if (results[0]) 
      {
          let city = "";
          let state = "";
          
         var address_components = results[0].address_components;
          
          for (var i = 0; i < address_components.length; i++) 
          {
             if (address_components[i].types[0] === "administrative_area_level_1" && address_components[i].types[1] === "political") {
                  state = address_components[i].long_name;    
              }
              if (address_components[i].types[0] === "locality" && address_components[i].types[1] === "political" ) {                                
                  city = address_components[i].long_name;   
              }
                
             
          }
          this.data.Building = this.data.p_address=results[0].formatted_address;
          this.currentAddress=results[0].formatted_address;
      // this.data.House_Number=data['results'][0]['address_components']['long_name'];
      // this.data.Building=data['results'][1]['address_components']['long_name'];
      // this.data.Street=data['results'][2]['address_components']['long_name'];
      // this.data.Landmark=data['results'][3]['address_components']['long_name'];
      this.data.State=state;
        }
    })
   
  }
  ngOnChanges() {
    this.ngOnInit();
    } 
}