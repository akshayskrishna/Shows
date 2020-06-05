import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalController, NavController } from '@ionic/angular';
import { EpisodeDetailsPage } from '../episode-details/episode-details.page';

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
  episodes: any = [];

  constructor(private api: ApiService, private modalcltr: ModalController, private navCtrl: NavController) { }

  ngOnInit() {
    this.episodeListData();
    this.checkForSummary();

  }

  CloseModal() { this.modalcltr.dismiss(); }

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

    //this.navCtrl.navigateRoot('/episodeDetails')

    const modal = await this.modalcltr.create({
      component: EpisodeDetailsPage,
      componentProps: {
        url: url,
        stockImg: this.img,
      }
    });

    return await modal.present();

  }

  // async episodeDetails(event, item) {
  //   item: item;
  //   const summary: any = item.summary;
  //   const image: any = item.image.original;
  //   const testImage: any = item.image;
  //   const name: any = item.name;
  //   const season: any = item.season;
  //   const episode: any = item.number;
  //   const aired: any = item.airdate;
  //   const url: any = item.url;
  //   const modal = await this.modalcltr.create({
  //     component: EpisodeDetailsPage,
  //     componentProps: {
  //       //newImage: image,
  //       summary: summary,
  //       name: name,
  //       seasonNo: season,
  //       episodeNo: episode,
  //       aired: aired,
  //       url: url,
  //       //testImg: testImage,
  //       stockImg: this.img,
  //     }
  //   });

  //   return await modal.present();

  // }

}
