import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FirstPagePage } from '../page/first-page/first-page.page';
import { ModalController } from '@ionic/angular';
import { Genre } from '../home/genre';
import { NetworkFilterService } from '../services/network-filter.service';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {


  random: any = []; //UI for top part - random cards
  bySearchResult: any = []; //UI for search list - query list
  usaShows: any = []; //UI for bottom part - top rated
  hideSearch: boolean = false; //UI - hide search string and results
  resultsList: boolean = true;
  public query: string = "Catch Up"; // query string using ngModel
  genre: any = Genre; // Genre JSON file connection
  randomTop: any = [];
  pulledData: any = [];

  //UI Slider Configurations
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

  //random number generator function
  randomNumber(min: any, max: any) { return Math.floor(Math.random() * (max - min + 1) + min); }
  randomNumberAgain(min: any, max: any) { return Math.floor(Math.random() * (max - min + 1) + min); }

  constructor(private router: Router, private api: ApiService, private modalCtrl: ModalController, private ntwrk: NetworkFilterService, public toastController: ToastController) { }

  ngOnInit() {
    this.topRated()
    this.ntwrk.universalCaller();
    //this.completeColection();

  }


  topRated() {
    const pgNo = this.randomNumber(0, 193);
    this.api.getHomePageData(pgNo).subscribe((data) => {
      const iData: any = data;
      const fData: any = iData.filter(data => data.image != null);
      Array.prototype.push.apply(this.random, fData);
      console.log(this.random);
    });

    this.randomSlicer();
    this.randomPlanner();
    // this.networkTask()
  }

  randomSlicer() {
    setTimeout(() => {
      const slicer = this.random.slice(0, 10);
      this.random = slicer;
    }, 2000);

  }

  randomPlannerList: any = [];

  randomPlanner() {
    const pgNo = this.randomNumberAgain(0, 20);
    this.api.getHomePageData(pgNo).subscribe((data) => {
      const iData: any = data;
      const fData: any = iData.filter(data => data.image != null && data.rating != null && data.rating.average > 4);
      // Array.prototype.push.apply(this.random, fData);
      Array.prototype.push.apply(this.randomPlannerList, fData);
      console.log(this.randomPlannerList);
      // console.log(this.randomPlannerList.length);
    });
  }


  async refresh() {
    var picker = [];
    const test = this.ntwrk.universalCollection;
    const filter = test.filter(data => data.rating != null && data.rating.average > 8);
    const number = filter.length;
    for (let i = 0; i < 10; i++) {
      const j = this.randomNumber(0, number);
      picker.push(filter[j]);
    }
    const slicer = picker.slice(0, 10);
    this.randomPlannerList = slicer;
    const toast = await this.toastController.create({
      message: 'Refreshing List',
      duration: 2000
    });
    toast.present();
  }



  //successfully working network pull
  completeColection() {
    var test: any = [];
    this.pulledData.push(this.ntwrk.universalCollection); //pulling data from network successfully
    // Array.prototype.push.apply(test, this.pulledData);
    console.log(this.pulledData);
  }

  async onClickHomeButton() {
    this.hideSearch = false;
    this.resultsList = false;
    this.query = null;
    this.refresh();
    this.topRated();

  }


  /* Method to call search results */
  async getDataBySearch(event) {
    this.hideSearch = false;
    this.resultsList = true;
    this.query = event;
    this.api.getDataBySearch(this.query).subscribe((data) => {
      var input: any = data;
      // this.bySearchResult = input.filter(d => d.show.image != null);
      this.bySearchResult = input;
    });
  }


  async genreSelector(event, item) {
    item: item;
    const toast = await this.toastController.create({
      message: 'Filtering for ' + item.name,
      duration: 2000
    });
    toast.present();
    setTimeout(() => {
      if (item.id == "anime") {
        this.ntwrk.forAnime();
        setTimeout(() => {
          this.randomPlannerList = this.ntwrk.filteredCollection;
        })
      }

      if (item.id == "language") {
        this.ntwrk.forLanguage(item.name);
        setTimeout(() => {
          this.randomPlannerList = this.ntwrk.filteredCollection;
        })
      }

      if (item.id == "random") {
        this.refresh();
      }


    }, 1000);

  }

  async bookmark() {
    const toast = await this.toastController.create({
      message: 'Saving feature is under development',
      duration: 2000
    });
    toast.present();

  }

  openNextPage(event, item) {
    item: item;
    const pre: string = item.premiered;
    const premiered: string = pre.slice(0, 4);
    console.log(premiered);
    let navData: NavigationExtras = {
      queryParams: {
        title: item.name, id: item.id, img: item.image.original, summary: item.summary, premiered: premiered,

      }

    }
    this.router.navigate(['showPage'], navData);
  }
  /* Launch next page details */
  async openShowDetails(event, item) {
    item: item;


    let navData: NavigationExtras = {
      queryParams: {
        title: item.show.name,
        id: item.show.id,
        img: item.show.image.original,
        summary: item.show.summary,


      }
    }
    this.router.navigate(['showPage'], navData);
  }


}
