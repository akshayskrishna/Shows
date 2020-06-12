import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalController, NavController } from '@ionic/angular';
import { EpisodeDetailsPage } from '../episode-details/episode-details.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.page.html',
  styleUrls: ['./episodes-list.page.scss'],
})
export class EpisodesListPage implements OnInit {
  id;
  title;
  img;
  seasonNo;
  summary;
  showId;
  episodes: any = [];

  constructor(private api: ApiService, private modalcltr: ModalController, private navCtrl: NavController, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(data => {
      this.id = data.id;
      this.title = data.title;
      this.img = data.img;
      this.seasonNo = data.seasonNo;
      this.summary = data.summary;
      this.showId = data.showID;
    })
  }

  ngOnInit() {
    this.episodeListData();
    this.checkForSummary();

  }

  // CloseModal() { this.modalcltr.dismiss(); }

  episodeListData() {
    this.api.getEpisodes(this.id).subscribe((data) => {
      this.episodes = data;
      console.log(this.episodes);

    });
  }

  checkForSummary() {
    if (this.summary == null) {
      this.summary = 'No Season Bio Available';
    }
    else {
      this.summary = this.summary.replace(/<\/?[^>]+(>|$)/g, "");
    }
  }

  async episodeDetails(event, item) {
    item: item;
    const url: any = item._links.self.href;
    const sNo: any = item.season;
    const eNo: any = item.number;

    const modal = await this.modalcltr.create({
      component: EpisodeDetailsPage,
      componentProps: {
        id: this.id,
        seasonNo: sNo,
        episodeNo: eNo,
        stockImg: this.img,
        showId: this.showId,
      }
    });
    return await modal.present();

  }

}
