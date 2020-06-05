import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.page.html',
  styleUrls: ['./episode-details.page.scss'],
})
export class EpisodeDetailsPage implements OnInit {
  id;
  seasonNo;
  episodeNo;
  stockImg;
  showId;
  episodeResponse: any = [];

  constructor(private modalcltr: ModalController, private api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getSpecificEpisode(this.showId, this.seasonNo, this.episodeNo).subscribe((data) => {
      const tempHolder: any = data;
      this.episodeResponse.push(tempHolder);
      console.log(this.episodeResponse);
    })
  }
  CloseModal() { this.modalcltr.dismiss(); }
}
