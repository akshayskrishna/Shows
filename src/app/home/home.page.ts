import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FirstPagePage } from '../page/first-page/first-page.page';
import { ModalController } from '@ionic/angular';
import { Genre } from '../home/genre';
import { NetworkFilterService } from '../services/network-filter.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {


  random: any = []; //UI for top part - random cards
  bySearchResult: any = []; //UI for search list - query list
  usaShows: any = []; //UI for bottom part - top rated
  hideSearch: boolean = true; //UI - hide search string and results
  public query: string; // query string using ngModel
  genre: any = Genre; // Genre JSON file connection

  test: any = [];

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

  constructor(private api: ApiService, private modalCtrl: ModalController, private ntwrk: NetworkFilterService) { }

  ngOnInit() {
    this.ntwrk.universalCaller();
    this.completeColection();

  }

  completeColection() {
    this.test.push(this.ntwrk.universalCollection);
    console.log(this.test);

  }



  async onClickHomeButton() {
    this.hideResults();
    this.ntwrk.basicFilter("Korean");
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

  async launchFromHome(event, item) {
    item: item;
    const modal = await this.modalCtrl.create({
      component: FirstPagePage,
      componentProps: { title: item.name, id: item.id, img: item.image.original, summary: item.summary, }
    });
    return await modal.present();
  }

  genreSelector(event, item) {
    item: item;
    //console.log("Item Clicked " + item.name)

    this.api.fullSchedule().subscribe((data) => {
      var schedule: any = data;
      var fI: any = schedule.filter(data => data.image != null);
      console.log(fI);


    })




  }



}
