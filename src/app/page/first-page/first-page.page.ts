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
  numberOfSeasons: any;
  imageUrl = [];
  public heading = this.title;
  seasons: any = [];
  list: any = [];
  fltrS00: any = [];
  episodeId: any;
  castDetails: any = [];

  constructor(private modalCtrl: ModalController, private api: ApiService) { }

  ngOnInit() {
    this.seasonsData();
    this.castData();
    this.checkForSummary();
  }

  seasonsData() {
    this.api.getSeasons(this.id).subscribe((data) => {
      this.seasons = data;
      this.numberOfSeasons = this.seasons.length;

      //console.log(this.seasons);
    });
  }

  castData() {
    this.api.retrieveCast(this.id).subscribe((data) => {
      const castDeets: any = data;
      this.castDetails = castDeets.filter(d => d.person.image != null);
    })
  }

  CloseModal() {
    this.modalCtrl.dismiss();
  }

  async openEpisodeList(event, item) {
    item: item;
    this.episodeId = item.id;
    const summary: any = item.summary;
    const modal = await this.modalCtrl.create({
      component: EpisodesListPage,
      componentProps: {
        id: this.episodeId,
        seasonNo: item.number,
        title: this.title,
        img: this.img,
        summary: summary,
      }
    });
    return await modal.present();
  }

  checkForSummary() {
    if (this.summary == null) {
      this.summary = 'No Summary Available';
    }
    else {
      this.summary = this.summary.replace(/<\/?[^>]+(>|$)/g, "");
    }
  }

}

