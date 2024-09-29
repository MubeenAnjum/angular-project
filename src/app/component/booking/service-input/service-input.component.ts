import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
@Component({
  selector: 'app-service-input',
  templateUrl: './service-input.component.html',
  styleUrls: ['./service-input.component.css']
})
export class ServiceInputComponent implements OnInit {
  heading: string = '';
  overview_items: string = '';
  experts: string = '';
  tools_images: string[] = ['', '', '', ''];
  procedureDays = [
    {
      title: '',
      description: [{
        heading: '',
        description: ''
      }],
      images: ''
    }
  ];
  whoAttends = {
    heading: '',
    subPoints: ['']
  };
  certificate:any=''
  categoryList: any = [];
  categoryId: any;
  servicesList: any = [];
  masterServicesId: any;

  isToolsContentVisible = false;
  isToolsCourseVisible = false;
  isWhoAttendsVisible = false;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.GetAcademyCategory()
  }

  toggleToolsContent() {
    this.isToolsContentVisible = !this.isToolsContentVisible; 
  }
  toggleCourseStructure() {
    this.isToolsCourseVisible = !this.isToolsCourseVisible; 
  }
  toggleWhoAttendsContent() {
    this.isWhoAttendsVisible = !this.isWhoAttendsVisible; 
  }
  GetAcademyCategory() {
    this.categoryService.GetAcademyCategory().subscribe((response: any) => {
      this.categoryList = response
      this.categoryId = response[0].id;
    });
  }

  GetAcademyServicesList() {
    this.categoryService.GetCourseModalData(this.categoryId).subscribe((response) => {
      this.servicesList = response
    });
  }

  onCategoryChange() {
    this.GetAcademyServicesList();
  }

  addProcedureDay(): void {
    this.procedureDays.push({
      title: '',
      description: [{
        heading: '',
        description: ''
      }],
      images: ''
    });
  }

  addPoint(index: number): void {
    this.procedureDays[index].description.push({
      heading: '',
      description: ''
    });
  }

  addSubPoint(): void {
    this.whoAttends.subPoints.push('');
  }

  updateContent() {
    const updatedCourseOverview = this.heading;

    let updatedOverviewImages = this.overview_items;

    const updatedExpertsBanner = this.experts
    let updatedToolsImages = this.tools_images
    let updatedCourseStructure = ''
    if (this.procedureDays.length > 0) {
      updatedCourseStructure += `
        <div class="dv_page_details_points_ul_head">
          <h3 class="font-18 ff-gotham-bold text-uppercase mt-5">Course Structure</h3>
          <ul class="dv_page_details_points bulletnumber">
            <div class="dv_per_day_procedure">
              <ul class="dv_page_details_points bulletnumber">`;

      this.procedureDays.forEach(data => {
        updatedCourseStructure += `
          <li>
            <div class="modal-sub-each">
              <span class="py-2 font-18 text-uppercase ff-gotham-bold">${data.title}</span>
              <div class="image-container sub-points">
                <ul>`;

        data.description.forEach(points => {
          updatedCourseStructure += `
                  <li>
                    <span>${points.heading}</span>${points.description}
                  </li>`;
        });
        updatedCourseStructure += `</ul> `
        let img = data.images.split(',')
        if (img.length > 0) {
          updatedCourseStructure += ` <div class="slider">`
          img.forEach(img => {
            updatedCourseStructure += `      
          <div class="item">
            <img src="${img}" class="img-fluid position-relative" alt="" />
          </div>`;
          })
          updatedCourseStructure += `</div>`
        }

        updatedCourseStructure += `
              </div>
            </div>
          </li>`

      })
      updatedCourseStructure += `
      </ul>
      </div>
      </ul>
      </div>`;
    }

    let updatedWhoCanAttendCourse = ''
    if (this.whoAttends.subPoints.length > 0) {
      updatedWhoCanAttendCourse += `<h5 class="font-16 ff-gotham-bold text-uppercase pt-3">
                                   ${this.whoAttends.heading}
                                    </h5>
                                    <ul class="dv_sub_service_descrition_ul ul-2">`
      this.whoAttends.subPoints.forEach(data => {
        updatedWhoCanAttendCourse += `<li>${data}</li>`
      })

      updatedWhoCanAttendCourse += `</ul>`
    }

    let updatedCertificateImages =''
    let certificate =this.certificate.split(',')
    if (certificate.length > 0) {
      updatedCertificateImages += `<div class="col-md-4">
    <img src="${certificate[0]}" alt="" class="img-fluid" />
    </div>
    <div class="col-md-8">
    <img src="${certificate[1]}" alt="" class="img-fluid" />
    </div>`
    }

    let model = {
      categoryId: this.categoryId,
      masterServicesId: this.masterServicesId,
      updatedToolsImages,
      updatedExpertsBanner,
      updatedOverviewImages,
      updatedCourseOverview,
      updatedCourseStructure,
      updatedWhoCanAttendCourse
    }
    this.categoryService.setAcademyContentAdmin(model);
  }
}