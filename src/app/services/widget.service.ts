import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  public masterSource = new BehaviorSubject<any>([]);
  offset = 'A2';
  limit = 'Z999';
  apikey = "AIzaSyB7gsrkW6slHXQukg5FlaYtfhuhsf6lXow"; 
  base = `https://sheets.googleapis.com/v4/spreadsheets/`;
  masterSheetId ="1eDjlSYP4CcHv8M4Mpp-h1s9QjifTDgfQO5xnbwYuAkY";
  
  constructor(private http: HttpClient) { }

  getMaster(){
    const uri = `${this.base}${this.masterSheetId}/values/Sheet1!${this.offset}:${this.limit}?key=${this.apikey}`;
    return this.http.get(uri).pipe(
      tap((response: any) => {
        this.masterSource.next(response.values);
      })
    );
  }
  getClauseValues(id){
    const uri = `${this.base}${id}/values/Sheet1!${this.offset}:${this.limit}?key=${this.apikey}`;
    return this.http.get(uri).pipe(
      tap((response) => {

      })
    );
  }
}
