import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions-new',
  templateUrl: './terms-and-conditions-new.component.html',
  styleUrls: ['./terms-and-conditions-new.component.css']
})
export class TermsAndConditionsNewComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  }
  Back(){
    
    this.router.navigate(['/']);
  
}

}
