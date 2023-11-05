import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataAnalysisService {

constructor(private http: HttpClient) { }

uploadCsvFile(file: File):Observable<any> {
  
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);

  return this.http.post('http://localhost:5051/DataAnalysis/upload', formData);
}



}
