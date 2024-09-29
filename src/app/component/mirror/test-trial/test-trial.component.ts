import { Component, OnInit, ElementRef } from '@angular/core';
import Choices from 'choices.js';

@Component({
  selector: 'app-test-trial',
  templateUrl: './test-trial.component.html',
  styleUrls: ['./test-trial.component.css']
})
export class TestTrialComponent implements OnInit {
  countryLIst: any[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
    { value: 'option6', label: 'Option 6' }, 
  ];
  CountryId:any
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const choicesElement = this.el.nativeElement.querySelector('#my-select');
    const choices = new Choices(choicesElement, {
      choices: this.countryLIst
    });
  }
  onCountryChange(event: any): void {
    const selectedCountryId = event.target.value;
  }
  
}
