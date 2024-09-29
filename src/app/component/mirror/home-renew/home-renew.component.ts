import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-home-renew',
  templateUrl: './home-renew.component.html',
  styleUrls: ['./home-renew.component.css']
})
export class HomeRenewComponent implements OnInit,AfterViewInit {
  @ViewChild('myVideo', { static: false }) myVideo!: ElementRef<HTMLVideoElement>;
  private playCheckInterval!: any;
  videoStarted = false;

  categoryList :any=[];
  IsLoading : boolean=true;

  constructor(
    private categoryService:CategoryService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.IsLoading=true
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    });
    this.GetCategory();
  }

  ngAfterViewInit(): void {
    const video = this.myVideo.nativeElement;
    this.playCheckInterval = setInterval(() => {
      // console.log('Video element:', video.paused);

      if (video.paused) {
        video.play(); // Ensure the video keeps playing
      }
    }, 250); // Check every second (adjust as needed)
  }

  ngOnDestroy(): void {
    if (this.playCheckInterval) {
      clearInterval(this.playCheckInterval); // Clear the interval on component destroy
    }
  }
  GetCategory() {
    this.categoryService.GetAcademyCategory().subscribe((data: any) => {
      this.categoryList = data;
      this.categoryList.sort((a: { position: number; }, b: { position: number; }) => a.position - b.position);
    })
  }

}
