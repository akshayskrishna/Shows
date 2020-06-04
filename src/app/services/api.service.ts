import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl: any = "http://api.tvmaze.com/search/shows?q=:";

  constructor(private http: HttpClient) { }

  getData() {
    const url = "http://api.tvmaze.com/search/shows?q=girls";
    return this.http.get(url);
  }


  getDataBySearch(query: String) {
    const url = this.baseUrl + query;
    return this.http.get(url);
  }

  getSeasons(id) {
    const url = "http://api.tvmaze.com/shows/" + id + "/seasons";
    return this.http.get(url);
  }

}

//http://api.tvmaze.com/shows/47900/seasons