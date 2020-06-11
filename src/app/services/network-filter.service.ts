import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';


@Injectable({
  providedIn: 'root'
})
export class NetworkFilterService {
  constructor(private api: ApiService) { }

  universalCollection: any = [];
  filteredCollection: any = [];

  async universalCaller() {
    for (let i = 1; i <= 100; i++) {
      this.api.getHomePageData(i).subscribe((data) => {
        var temp: any = data;
        var filteringR8: any = temp.filter(data => data.image != null);
        Array.prototype.push.apply(this.universalCollection, filteringR8);
      });
    }
    const i = this.randomNumber(0, 14000);
    return Promise.resolve(this.universalCollection);
  }

  randomNumber(min: any, max: any) { return Math.floor(Math.random() * (max - min + 1) + min); }

  async topRated() {
    const pgNo = this.randomNumber(0, 193);
    var top15: any = [];
    var page5: any = [];

    for (let i = 0; i < 5; i++) {
      const pgNo = this.randomNumber(0, 193);
      this.api.getHomePageData(pgNo).subscribe((data) => {
        const iData: any = data;
        var fData: any = iData.filter(data => data.image != null && data.rating.average != null);
        Array.prototype.push.apply(page5, fData);
      });
    }

  }

  forLanguage(lang) {
    const picker: any = [];
    const test = this.universalCollection;
    const filter = test.filter(data => data.language == lang && data.image != null && data.rating != null && data.rating.average > 8);
    const max = filter.length;
    for (let i = 0; i < 10; i++) {
      const j = this.randomNumber(0, max);
      picker.push(filter[j]);
    }
    console.log(picker);
    this.filteredCollection = picker;
  }


  forAnime() {
    const picker: any = [];
    const test = this.universalCollection;
    const filter = test.filter(data => data.language == "Japanese" && data.image != null && data.rating != null && data.rating.average > 8 && data.type == "Animation");
    const max = filter.length;
    for (let i = 0; i < 10; i++) {
      const j = this.randomNumber(0, max);
      picker.push(filter[j]);
    }
    console.log(picker);
    this.filteredCollection = picker;
  }

}
