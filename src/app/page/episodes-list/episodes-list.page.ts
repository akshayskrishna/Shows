import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';

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
  episodes: any = [];

  constructor(private api: ApiService, private modalcltr: ModalController) { }

  ngOnInit() {
    this.episodeListData();
  }

  CloseModal() { this.modalcltr.dismiss(); }

  episodeListData() {
    this.api.getEpisodes(this.id).subscribe((data) => {
      this.episodes = data;
      console.log(this.episodes);

    });
  }


}
