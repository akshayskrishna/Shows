import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { EpisodesListPage } from '../episodes-list/episodes-list.page'
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

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
  premiered: string;
  pre: string;
  cleanText: any;
  numberOfSeasons: any;
  imageUrl = [];
  public heading = this.title;
  seasons: any = [];
  list: any = [];
  fltrS00: any = [];
  episodeId: any;
  castDetails: any = [];

  // title: item.name, id: item.id, img: item.image.original, summary: item.summary,

  constructor(private modalCtrl: ModalController, private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(data => {
      this.title = data.title;
      this.id = data.id;
      this.img = data.img;
      this.summary = data.summary;
      this.premiered = data.premiered;

    })
  }

  ngOnInit() {
    this.seasonsData();
    this.castData();
    this.checkForSummary();
    var url = this.router.url;
    // this.premiered = this.pre.slice(0, 4);
    console.log(this.premiered);
  }

  sliderConfig = {
    spaceBetween: 3,
    centeredSlides: true,
    slidesPerView: 2.1

  }

  seasonsData() {
    this.api.getSeasons(this.id).subscribe((data) => {
      this.seasons = data;
      this.numberOfSeasons = this.seasons.length;

      console.log(this.seasons);
    });
  }

  castData() {
    this.api.retrieveCast(this.id).subscribe((data) => {
      const castDeets: any = data;
      this.castDetails = castDeets.filter(d => d.person.image != null);
    })
  }



  openNextPage(event, item) {
    item: item;
    this.episodeId = item.id;
    const summary: any = item.summary;
    let navData: NavigationExtras = {
      queryParams: {
        id: this.episodeId,
        seasonNo: item.number,
        title: this.title,
        img: this.img,
        summary: summary,
        showId: this.id,

      }

    }
    this.router.navigate(['allEpisodeList'], navData);
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

