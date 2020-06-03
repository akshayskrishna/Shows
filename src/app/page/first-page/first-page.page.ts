import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

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
    console.log(this.title + " " + this.id);
    this.seasonsData();
  }

  seasons: any = [];

  seasonsData() {
    this.api.getSeasons(this.id).subscribe((data) => {
      this.seasons = data;
      const noOfSeasons = this.seasons.length;

      for (let i = 0; i < noOfSeasons; i++) {
        this.imageUrl.push(this.seasons[i].image.original).toString;
        console.log(this.imageUrl);
      }

      //this.imageUrl.push(this.seasons[0].image.original).toString;

      console.log(noOfSeasons);
      //console.log(this.imageUrl);
      console.log(this.seasons);
    });
  }

  CloseModal() {
    this.modalCtrl.dismiss();
  }

}

