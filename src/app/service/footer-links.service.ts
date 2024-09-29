import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FooterLinsJsonFile } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FooterLinksService {

  constructor(private http: HttpClient) {}
  FooterLinsJsonFile = FooterLinsJsonFile;

  getFooterLinks(): Observable<any> {
    return this.http.get(this.FooterLinsJsonFile);
  }
}
