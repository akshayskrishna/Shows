import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FirstPagePage } from '../page/first-page/first-page.page';
import { ModalController } from '@ionic/angular';
import { Genre } from '../home/genre';
import { NetworkFilterService } from '../services/network-filter.service'
import { promise } from 'protractor';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  topRated: any = this.ntwrk.universalCollection;
  bySearchResult: any = [];
  integer: any;
  usaShows: any = [];
  public query: string;
  hideSearch: boolean = true;
  random: any = [];
  filteredDrama: any = [];
  genre: any = Genre;

  constructor(private api: ApiService, private modalCtrl: ModalController, private ntwrk: NetworkFilterService) { }

  ngOnInit() {
    this.randomSuggestion();
    this.randomDisplay();
    this.getAllData();
    this.ntwrk.universalCaller();
    this.usaShows = this.ntwrk.filteredCollection;



  }



  randomConfig = {
    spaceBetween: 3,
    // centeredSlides: true,
    slidesPerView: 2.1

  }
  genreConfig = {
    spaceBetween: 3,
    centeredSlides: true,
    slidesPerView: 2.1

  }
  async onClickHomeButton() {
    this.hideResults();
    this.ntwrk.basicFilter();
    this.usaShows = this.ntwrk.filteredCollection;
    console.log(this.ntwrk.filteredCollection);

    const test = this.ntwrk.filteredCollection;

  }
  hideResults() {
    this.hideSearch = false;
  }
  showResults() {
    this.hideSearch = true;
  }

  /* Method to call search results */
  async getDataBySearch(event) {
    this.showResults();
    this.query = event;
    return this.api.getDataBySearch(this.query).subscribe((data) => {
      var input: any = data;
      this.bySearchResult = input.filter(d => d.show.image != null);
    });
  }

  /* Launch next page details */
  async openShowDetails(event, item) {
    item: item;
    var titleName: string = item.show.name;
    var selectedId: string = item.show.id;
    var imageUrl: string = item.show.image.original;
    const summ = item.show.summary;
    const modal = await this.modalCtrl.create({
      component: FirstPagePage,
      componentProps: {
        title: titleName,
        id: selectedId,
        img: imageUrl,
        summary: summ,
      }
    });
    return await modal.present();
  }

  randomSuggestion() {
    var b: any = [];
    var c: any = [];
    var d: any = [];
    var e: any = [];

    this.randomInt(0, 193); //Calls for random Int
    this.api.getHomePageData(this.integer).subscribe((data) => {
      var initial: any = data;
      const length = initial.length; //get the lenghth of the result

      for (var i = 0; i < 15; i++) {
        this.randomInt(0, length); { var a: any = initial[this.integer]; }
        b.push(a); c.push(b.concat());
      }
      d.push(c[14]); e = d[0]; this.random = e.filter(d => d.image != null);
      this.randomDisplay();
    })
  }


  randomInt(min: any, max: any) {
    this.integer = Math.floor(Math.random() * (max - min + 1) + min);
    //console.log(this.result);


  }

  async launchFromHome(event, item) {
    item: item;
    const modal = await this.modalCtrl.create({
      component: FirstPagePage,
      componentProps: { title: item.name, id: item.id, img: item.image.original, summary: item.summary, }
    });
    return await modal.present();
  }

  moreRandom() {
    this.randomInt(0, 193);
    this.api.getHomePageData(this.integer).subscribe((data) => {
      var dataArray: any = data;
      var fI: any = dataArray.filter(data => data.image != null);
      var fIN: any = fI.filter(data => data.network != null);
      var fINC: any = fIN.filter(data => data.network.country.code == "US");
      var fINCR: any = fINC.filter(data => data.rating.average != null);
      var fINCR1: any = fINCR.filter(data => data.rating.average > 8.0);
      this.usaShows = this.usaShows.concat(fINCR1);

    });

  }


  randomDisplay() {

    this.randomInt(0, 193);
    this.api.getHomePageData(this.integer).subscribe((data) => {
      var dataArray: any = data;
      var filtering: any = dataArray.filter(data => data.image != null && data.network != null && data.network.country.code == "US" && data.rating.average != null && data.rating.average > 9);
      this.usaShows = filtering;
      for (let i = 0; i < 5; i++) {
        this.moreRandom();
      }
    });
  }


  alldata: any = [];
  eachPage1: any = [];


  async getAllData() {
    var alldataFile: any = [];
    var alldataFile1: any = [];
    for (let i = 1; i <= 100; i++) {
      this.getData(i);
    }

    alldataFile = this.alldata;



    // console.log(this.hboShows);
    // console.log(this.alldata);

    //&& data.network != null && data.network.country.code == "US" && data.rating.average != null && data.rating.average > 9

  }
  async filterResl() {
    var xyz: any = this.alldata.filter(data => data.image != null);
    //await console.log(xyz);


  }


  hboShows: any = [];
  async getData(i) {
    await this.api.getHomePageData(i).subscribe((data) => {
      this.eachPage1 = data;
      var filtering: any = this.eachPage1.filter(data => data.image != null && data.language == "English" && data.network != null && data.network.country.code == "US" && data.rating.average != null && data.status != "Ended");
      var hboNetwork: any;
      Array.prototype.push.apply(this.hboShows, hboNetwork)
      Array.prototype.push.apply(this.alldata, filtering)

    });
  }













  genreSelector(event, item) {
    item: item;
    //console.log("Item Clicked " + item.name)

    this.api.fullSchedule().subscribe((data) => {
      var schedule: any = data;
      var fI: any = schedule.filter(data => data.image != null);
      console.log(fI);


    })

    if (item.name == 'Drama') {
      this.filteredDrama = this.random.filter(data => data.genres == "Drama");
    }


  }



}
