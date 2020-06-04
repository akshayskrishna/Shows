import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})
export class FirstPagePage implements OnInit {
  title;
  id;
  img;
  imageUrl = [];
  public heading = this.title;
  seasons: any = [];
  list: any = [];
  fltrS00: any = [];

  constructor(private modalCtrl: ModalController, private api: ApiService) { }

  ngOnInit() {
    this.seasonsData();
  }


  seasonsData() {
    this.api.getSeasons(this.id).subscribe((data) => {
      this.seasons = data;
    });
  }

  CloseModal() {
    this.modalCtrl.dismiss();
  }

}

