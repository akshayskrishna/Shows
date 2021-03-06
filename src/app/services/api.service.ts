import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl: any = "https://api.tvmaze.com/search/shows?q=:";

  constructor(private http: HttpClient) { }

  getData() {
    const url = "https://api.tvmaze.com/search/shows?q=girls";
    return this.http.get(url);
  }


  getDataBySearch(query: String) {
    const url = this.baseUrl + query;
    return this.http.get(url);
  }

  getSeasons(id) {
    const url = "https://api.tvmaze.com/shows/" + id + "/seasons";
    return this.http.get(url);
  }

  getEpisodes(id) {
    const url = "https://api.tvmaze.com/seasons/" + id + "/episodes";
    return this.http.get(url);
  }

  retrieveCast(id) {
    const url = "https://api.tvmaze.com/shows/" + id + "/cast";
    return this.http.get(url);
  }

  getHomePageData(id) {
    const url = "https://api.tvmaze.com/shows?page=" + id;
    return this.http.get(url);
  }

  getSpecificEpisode(showid, seasonNo, episodeNo) {
    const url = "https://api.tvmaze.com/shows/" + showid + "/episodebynumber?season=" + seasonNo + "&number=" + episodeNo;
    return this.http.get(url);
  }

  fullSchedule() {
    const url = "https://api.tvmaze.com/schedule/full";
    return this.http.get(url);
  }

  getImages(id) {
    const url = "http://api.tvmaze.com/shows/" + id + "/images";
    return this.http.get(url);
  }


}

//http://api.tvmaze.com/shows/47900/seasons
//http://api.tvmaze.com/seasons/1/episodes
//http://api.tvmaze.com/shows/2/cast

//http://api.tvmaze.com/shows/1/episodebynumber?season=1&number=1