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


/*

<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="home"></ion-back-button>
    </ion-buttons>
    <!-- <ion-icon
      slot="start"
      name="chevron-back-outline"
      (click)="CloseModal()"
    ></ion-icon> -->
    <ion-title>
      {{title}} Season {{ seasonNo }}
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <img [src]="img" style="min-width: 375px;" />
  <ion-list-header>
    <ion-label>Season {{seasonNo}} </ion-label>
  </ion-list-header>

  <h5 style="padding-left: 20px; padding-right: 20px;">{{summary}}</h5>

  <div *ngFor="let item of episodes">
    <ion-list>
      <ion-item button (click)="episodeDetails($event, item)">
        <!-- ngIf to fix if API has no thumbnail -->
        <div>
          <div *ngIf="item.image == null">
            <ion-avatar slot="start">
              <ion-thumbnail>
                <img [src]="img" />
              </ion-thumbnail>
            </ion-avatar>
          </div>

          <div *ngIf="item.image != null">
            <ion-avatar slot="start">
              <ion-thumbnail>
                <img [src]="item.image.original" />
              </ion-thumbnail>
            </ion-avatar>
          </div>
        </div>

        <ion-label>
          <h1>{{ item.name }}</h1>
          <h3>
            Episode {{item.number}} <br />
            <div *ngIf="item.airdate !== ''">
              Aired on {{item.airdate}}
            </div>
            <div *ngIf="item.airdate == ''" style="color: #929292;">
              Yet to be aired
            </div>
          </h3>
        </ion-label>
      </ion-item>
    </ion-list>
  </div>
</ion-content>


*/