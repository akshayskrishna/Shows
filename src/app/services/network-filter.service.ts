import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';


@Injectable({
  providedIn: 'root'
})
export class NetworkFilterService {
  constructor(private api: ApiService) { }

  universalCollection: any = [];
  filteredCollection: any = [];
  integer: any;
  random: any = [];
  public hboShows: any = [];
  public test: any = [];

  // getDatas() {
  //   this.api.getHomePageData(1).subscribe((data) => {
  //     this.test = data;
  //     Array.prototype.push.apply(this.hboShows, this.test);
  //   });
  //   return Promise.resolve(this.hboShows);
  // }

  async universalCaller() {
    for (let i = 1; i <= 193; i++) {
      this.api.getHomePageData(i).subscribe((data) => {
        var temp: any = data;
        var filteringR8: any = temp.filter(data => data.image != null);
        Array.prototype.push.apply(this.universalCollection, filteringR8);


      });
    }
    //this.basicFilter();

    console.log();



    // const shuffled = this.universalCollection.sort(() => 0.5 - Math.random());
    // let selected = shuffled.slice(0, 10);
    // //console.log(selected);
    return Promise.resolve(this.universalCollection);
  }

  // && data.language == "English" && data.network != null && data.network.country.code == "US" && data.rating.average != null && data.status != "Ended"
  async basicFilter() {

    const map = await this.universalCollection.filter(data => data.language == "Korean" && data.rating.average > 8);
    const shuffled = map.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 10);
    this.filteredCollection = selected;


    console.log(selected);


  }
  randomInt(min: any, max: any) {
    this.integer = Math.floor(Math.random() * (max - min + 1) + min);
    //console.log(this.result);
  }
}
