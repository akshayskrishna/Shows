import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FirstPagePage } from '../page/first-page/first-page.page';
import { ModalController } from '@ionic/angular'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  data: any = [];
  listFilter: any = [];
  filteredResult: any = [];
  randomListGen: any = [];
  result: any;
  randomDataForHome: any;
  public query: string;
  titleName: string;
  selectedId: string;
  imageUrl: string;
  hideSearch: boolean = true;

  constructor(private api: ApiService, private modalCtrl: ModalController) { }
  ngOnInit() {
    this.getRandomSuggestion();
  }

  async getDataBySearch(event) {
    this.showResults();
    this.query = event;
    return this.api.getDataBySearch(this.query).subscribe((data) => {
      this.data['list'] = (data)
      this.listFilter = this.data['list'];
      this.filteredResult = this.listFilter.filter(d => d.show.image != null);
      //console.log(this.filteredResult);
    });
  }

  async openShowDetails(event, item) {
    item: item;
    this.titleName = item.show.name;
    this.selectedId = item.show.id;
    this.imageUrl = item.show.image.original;
    const summ = item.show.summary;
    const modal = await this.modalCtrl.create({
      component: FirstPagePage,
      componentProps: {
        title: this.titleName,
        id: this.selectedId,
        img: this.imageUrl,
        summary: summ,

      }
    });
    return await modal.present();
  }
  randomListGenerated: any = [];



  onClickHomeButton() {
    this.hideResults();
    this.getRandomSuggestion();
  }
  hideResults() {
    this.hideSearch = false;
  }

  showResults() {
    this.hideSearch = true;
  }

  getRandomSuggestion() {
    this.randomInt(0, 193);
    //console.log(this.result);
    this.api.getHomePageData(this.result).subscribe((data) => {
      this.randomDataForHome = data;
      const lengthOfResult = this.randomDataForHome.length;
      //console.log(lengthOfResult);
      var a: any = [];
      var test: any = [];
      var superTest: any = [];
      var justAnother: any = [];
      for (var i = 0; i < 9; i++) {
        this.randomInt(0, lengthOfResult); {  //console.log(this.result);
          a = this.randomDataForHome[this.result]; //console.log(this.a);
        }
        test.push(a);
        superTest.push(test.concat());
      }
      justAnother.push(superTest[8]);
      this.randomListGen = justAnother[0];
      this.randomListGenerated = this.randomListGen.filter(d => d.image != null);
      //console.log(this.randomListGenerated);
    })
  }


  randomInt(min: any, max: any) {
    this.result = Math.floor(Math.random() * (max - min + 1) + min);
    //console.log(this.result);


  }

  async launchFromHome(event, item) {
    item: item;
    const itemId = item.id;
    const itemName = item.name;
    const itemUrl = item.image.original;
    const summary = item.summary;

    const modal = await this.modalCtrl.create({
      component: FirstPagePage,
      componentProps: {
        title: itemName,
        id: itemId,
        img: itemUrl,
        summary: summary,

      }
    });
    return await modal.present();
  }

}
