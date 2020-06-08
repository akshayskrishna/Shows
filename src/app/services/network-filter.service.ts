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
    for (let i = 1; i <= 193; i++) {
      this.api.getHomePageData(i).subscribe((data) => {
        var temp: any = data;
        var filteringR8: any = temp.filter(data => data.image != null);
        Array.prototype.push.apply(this.universalCollection, filteringR8);
      });
    }
    const i = this.randomNumber(0, 14000);
    return Promise.resolve(this.universalCollection);
  }

  async basicFilter(genre) {
    const map = await this.universalCollection.filter(data => data.language == genre && data.rating.average > 8);
    const shuffled = map.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 10);
    this.filteredCollection = selected;
    console.log(selected);

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
    //console.log(page5);
    for (var j = 0; j < 15; j++) {
      let i = this.randomNumber(0, page5.length);
      Array.prototype.push.apply(top15, page5[i]);
      // top15.push(page5[i]);
    }
    await console.log(top15);
    return Promise.resolve(top15);
  }
}


    // const shuffled = this.universalCollection.sort(() => 0.5 - Math.random());
    // let selected = shuffled.slice(0, 10);
    // //console.log(selected);