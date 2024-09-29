import { Injectable } from '@angular/core';
import { callingCountries } from 'country-data';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {

  constructor() { }

  getCallingCode(countryName: string): string {
    const countryCode = this.findCountryCodeByName(countryName);    
    if (countryCode) {
      return countryCode;
    } else {
      return 'Country not found or no calling code available';
    }
  }

  private findCountryCodeByName(countryName: string): string | undefined {
    for (const code of callingCountries.all) {
      if (code.name.toLowerCase() === countryName.toLowerCase()) {
        return code.countryCallingCodes[0];
      }
    }
    return '+971';  // Return undefined if country code is not found
  }
}
