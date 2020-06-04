import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { concat } from 'rxjs';

interface Show {
  id?: number;
  url?: string;
  name?: string;
  type?: string;
  language?: string;
  genres?: string[];
  status?: string;
  runtime?: number;
  premiered?: string;

  summary?: string;
  updated?: number;

}


@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})
export class FirstPagePage implements OnInit {
  title;
  id;
  imageUrl = [];

  public heading = this.title;

  constructor(private modalCtrl: ModalController, private api: ApiService) {

  }

  ngOnInit() {
    //console.log(this.title + " " + this.id);
    this.seasonsData();
  }

  seasons: any = [];
  list: any = [];

  seasonsData() {
    this.api.getSeasons(this.id).subscribe((data) => {
      this.seasons = data;
      const noOfSeasons = this.seasons.length;
      // for (var i = 0; i < noOfSeasons; i++) {
      //   const o = noOfSeasons;
      //   this.imageUrl.push(this.seasons[o].image.original);
      //   console.log(this.imageUrl);
      // }
      console.log(noOfSeasons);
      console.log(this.seasons);
    });
  }

  CloseModal() {
    this.modalCtrl.dismiss();
  }

}



//<img [src]="item.image.original" />