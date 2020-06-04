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
  result: any;
  randomDataForHome: any;
  public query: string;
  titleName: string;
  selectedId: string;
  imageUrl: string;

  constructor(private api: ApiService, private modalCtrl: ModalController) { }
  ngOnInit() {
    this.getRandomSuggestion();
  }

  async getDataBySearch(event) {
    this.query = event;
    return this.api.getDataBySearch(this.query).subscribe((data) => {
      this.data['list'] = (data)
      this.listFilter = this.data['list'];
      this.filteredResult = this.listFilter.filter(d => d.show.image != null);
      console.log(this.filteredResult);
    });
  }

  async openShowDetails(event, item) {
    item: item;
    this.titleName = item.show.name;
    this.selectedId = item.show.id;
    this.imageUrl = item.show.image.original;
    const modal = await this.modalCtrl.create({
      component: FirstPagePage,
      componentProps: {
        title: this.titleName,
        id: this.selectedId,
        img: this.imageUrl,

      }
    });
    return await modal.present();
  }

  randomArray: any = [];

  getRandomSuggestion() {
    this.randomInt(0, 193);
    console.log(this.result);
    this.api.getHomePageData(this.result).subscribe((data) => {
      this.randomDataForHome = data;

      const lengthOfResult = this.randomDataForHome.length;
      //console.log(lengthOfResult);

      for (let i = 0; i < 9; i++) {
        this.randomInt(0, lengthOfResult);
        this.randomArray.push(this.result);
        console.log(this.randomArray);

      }

      this.randomInt(0, lengthOfResult);
      console.log(this.result);


      console.log(this.randomDataForHome);
    })
  }


  randomInt(min: any, max: any) { // min and max included 
    this.result = Math.floor(Math.random() * (max - min + 1) + min);
    //console.log(this.result);


  }


}
