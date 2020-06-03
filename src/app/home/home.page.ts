import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FirstPagePage } from '../page/first-page/first-page.page';
import { ModalController } from '@ionic/angular'

export interface Structure {
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {

  data: any = [];
  listFilter: any = [];
  public query: String;
  constructor(private api: ApiService, private modalCtrl: ModalController) { }

  ngOnInit() {
  }



  async getDataBySearch(event) {
    this.query = event;
    console.log(this.query);
    return this.api.getDataBySearch(this.query).subscribe((data) => {
      this.data['list'] = (data)
      this.listFilter = this.data['list'];
      console.log(this.listFilter);
    });
  }

  titleName: String;
  selectedId: String;
  modalStructure: any = [];

  async clickCheck(event, item) {
    item: item;
    this.titleName = item.show.name;
    this.selectedId = item.show.id;
    this.modalStructure['title'] = this.titleName;
    console.log(this.modalStructure);
    const modal = await this.modalCtrl.create({
      component: FirstPagePage,
      componentProps: {
        title: this.titleName,
        id: this.selectedId,
      }
    });
    return await modal.present();
  }


}
