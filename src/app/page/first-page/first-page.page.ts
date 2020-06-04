import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { EpisodesListPage } from '../episodes-list/episodes-list.page'

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})
export class FirstPagePage implements OnInit {
  title;
  id;
  img;
  summary;
  cleanText: any;
  imageUrl = [];
  public heading = this.title;
  seasons: any = [];
  list: any = [];
  fltrS00: any = [];
  episodeId: any;
  castDetails: any = [];
  castDetailsFilter: any = [];

  constructor(private modalCtrl: ModalController, private api: ApiService) { }

  ngOnInit() {
    this.seasonsData();
    this.castData();
    this.cleanText = this.summary.replace(/<\/?[^>]+(>|$)/g, "");
    //console.log(this.cleanText);
  }





  seasonsData() {
    this.api.getSeasons(this.id).subscribe((data) => {
      this.seasons = data;
      //console.log(this.seasons);
    });
  }

  castData() {
    this.api.retrieveCast(this.id).subscribe((data) => {
      this.castDetails = data;
      //this.filteredResult = this.listFilter.filter(d => d.show.image != null);

      this.castDetailsFilter = this.castDetails.filter(d => d.person.image != null);

    })
  }

  CloseModal() {
    this.modalCtrl.dismiss();
  }

  async openEpisodeList(event, item) {
    item: item;
    this.episodeId = item.id;
    const modal = await this.modalCtrl.create({
      component: EpisodesListPage,
      componentProps: {
        id: this.episodeId,
        seasonNo: item.number,
        title: this.title,
        img: this.img,
      }
    });
    return await modal.present();
  }

}

