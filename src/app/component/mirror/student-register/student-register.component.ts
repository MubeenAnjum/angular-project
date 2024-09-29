import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { ExternalLeadService } from 'src/app/service/external-lead.service';
import { SharedService } from 'src/app/service/shared.service';
import { CountryCodeService } from 'src/app/service/country-code.service'
import Choices from 'choices.js';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { GtmService } from '../../../service/gtm.service';
import { placeID } from '../../../../environments/environment'
import { Router } from '@angular/router';

interface Country {
  CountryId: number;
  CountryName: string;
}
@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  reviews: any[] = [];
  selectedCountryCode = '+971' // Default country code
  countryList: any = [];
  courseList: any = [];
  StudentDetails: any = {
    name: '',
    mobile_number: '',
    GradeId: null,
    CountryId: 2,
    CountryName: 'United Arab Emirates',
    country_code: '+971',
    cityId: '',
    gender: 'female'
  }
  mobileNumberError = false;
  nameError = false
  emailError = false
  initialStudentDetails: any = {};
  // router: any;
  courses: any = []
  countryChoicesInstance: any;
  courseChoicesInstance: any;

  constructor(
    private router: Router,
    private externalLeadService: ExternalLeadService,
    private sharedService: SharedService,
    private countryCodeService: CountryCodeService,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private gtmService: GtmService) { }

  ngOnInit(): void {
    this.initialStudentDetails = { ...this.StudentDetails };
    this.getCountryList()
    this.getCourseList()
    this.updateCanonicalLink("https://www.mirrorsbeautyacademy.com/register-new")
    this.updateMetaDescription('Register-Looking for professional beautician courses in dubai?Mirrors Beauty is a training institute in Dubai. Get trained withadvanced beauty therapy courses at our academy. Full time, part time or weekend batch available. Hurry Up! Enter into the world of beauty.');
    this.gtmService.pushEvent({
      event: 'pageView',
      page: 'Register New'
    });
  }
  getCountryList() {
    this.externalLeadService.getCountryList().subscribe((data: any) => {
      this.countryList = data;
      const uaeCountry = this.countryList.find((country: Country) => country.CountryId === 2);
      if (uaeCountry) {
        this.StudentDetails.CountryId = uaeCountry.CountryId;
        this.StudentDetails.CountryName = uaeCountry.CountryName;
      }
      this.cdr.detectChanges(); // Force change detection
      this.initializeCountryChoices();
    });
  }
  getCourseList() {
    this.externalLeadService.getCoursesList().subscribe((data: any) => {
      this.courseList = data;
      this.cdr.detectChanges(); // Force change detection
      this.initializeCourseChoices();
    });
  }
  initializeCourseChoices() {
    const choicesElement = this.el.nativeElement.querySelector('#course');
    const choices = new Choices(choicesElement, {
      allowHTML: true,
      choices: this.courseList.map((course: { GradeId: any; GradeName: any; }) => ({ value: course.GradeId, label: course.GradeName })),
      placeholder: true,
      placeholderValue: 'Select a course',
      searchPlaceholderValue: 'Search for a course',
      itemSelectText: '', // Removes "Press to select" text
      shouldSort: false // Keep the order of the options as is
    });
  }

  initializeCountryChoices() {
    const choicesElement = this.el.nativeElement.querySelector('#country');
    const choices = new Choices(choicesElement, {
      allowHTML: true,
      choices: this.countryList.map((country: {
        CountryId: any; CountryName: any
      }) => ({ value: country.CountryId, label: country.CountryName })),
      placeholder: true,
      placeholderValue: 'Select Country',
      searchPlaceholderValue: 'Search Country',
      itemSelectText: '',
      shouldSort: false
    });
  }

  onCountryChange(event: any): void {
    const selectedCountryId = event.target.value;
    const selectedCountry = this.countryList.find((country: Country) => country.CountryId == selectedCountryId);
    if (selectedCountry) {
      this.StudentDetails.CountryId = selectedCountry.CountryId;
      this.StudentDetails.CountryName = selectedCountry.CountryName;
    }
    if (selectedCountry.CountryName) {
      this.selectedCountryCode = this.countryCodeService.getCallingCode(selectedCountry.CountryName);
    }
  }
  onCourseChange(event: any): void {
    this.StudentDetails.GradeId = event.target.value;
  }
  onNameChange(event: any): void {
    if (event.target.value === '') {
      this.nameError = true
    }
    this.StudentDetails.name = event.target.value;
  }

  validateMobileNumber(value: string) {
    // Check if the value contains any non-numeric characters
    this.mobileNumberError = /[a-zA-Z]/.test(value);
    // if (!this.mobileNumberError) {
    //   this.StudentDetails.mobile_number = value.startsWith('05') ? value : '5' + value;
    // }
  }
  SaveStudentDetail() {
    if (this.StudentDetails.name === '') {
      this.nameError = true
    }
    if (this.StudentDetails.mobile_number === '') {
      this.mobileNumberError = true
    }

    if (!this.mobileNumberError && !this.nameError && !this.emailError) {
      this.StudentDetails.mobile_number = this.StudentDetails.mobile_number.replace(/\s/g, '');
      this.externalLeadService.saveNewStudentLead(this.StudentDetails).subscribe((data: any) => {
        if (data) {
          console.log('data: ', data);
          this.StudentDetails = { ...this.initialStudentDetails };
          this.nameError = false
          this.mobileNumberError = false
          // Set the flag
          sessionStorage.setItem('fromRegistration', 'true');
          // Navigate to the thank-you page
          this.router.navigate(['/thank-you']);
          // this.sharedService.Message("Student Added Successfully", 'success')
        }
      });
    }
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
