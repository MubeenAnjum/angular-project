import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { erpBranchKey } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExternalLeadService {

  constructor(private httpclient:HttpClient) { }

  getCountryList(){
    return this.httpclient.get(`https://api.zenoxerp.com/api/Registration/getAllRecords/Country`);
  }
  getCoursesList(){
    return this.httpclient.get(` https://api.zenoxerp.com/api/Registration/getAllRecords/Grade/${erpBranchKey}`);
  }
  saveNewStudentLead(model:any){
    let data = {
      "BranchKey": erpBranchKey,
      "StudentName": model.name,
      "Mobile": model.mobile_number,
      "WhatsAppNumber": model.mobile_number,
      "Email": model.email,
      "GradeId": model.GradeId,
      "CountryId": model.CountryId,
      "IsFollowUp_Required":true
    }
    return this.httpclient.post(`https://api.zenoxerp.com/api/Registration/Enquiry/InsertCaptureLead`,data);
  }
}