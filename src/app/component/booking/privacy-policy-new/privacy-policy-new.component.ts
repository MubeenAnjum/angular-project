import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy-new',
  templateUrl: './privacy-policy-new.component.html',
  styleUrls: ['./privacy-policy-new.component.css']
})
export class PrivacyPolicyNewComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  }
  Back(){
    
      this.router.navigate(['/']);
    
  }
  
}
