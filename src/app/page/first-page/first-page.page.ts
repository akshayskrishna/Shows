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
  summary: string;
  completeSummary;
  network;
  premiered: string;
  status;
  allImages;
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

  dataFromSeasons;

  // title: item.name, id: item.id, img: item.image.original, summary: item.summary,

  constructor(private modalCtrl: ModalController, private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(data => {
      this.title = data.title;
      this.id = data.id;
      this.img = data.img;
      this.summary = data.summary;
      this.completeSummary = data.summary;
      this.premiered = data.premiered;
      this.network = data.network;
      this.status = data.status;

    })
  }

  slidesConfig = {
    spaceBetween: 1,
    // centeredSlides: true,
    slidesPerView: 3.1
  }
  sliderConfig = {
    spaceBetween: 3,
    // centeredSlides: true,
    slidesPerView: 2.1

  }

  ngOnInit() {
    this.seasonsData();
    this.castData();
    this.checkForSummary();
    this.networkcrop();
    this.summaryCrop();
    this.getImages(this.id);


    var url = this.router.url;
    // this.premiered = this.pre.slice(0, 4);
    console.log(this.status);
  }

  summaryCrop() {
    if (this.summary.length > 350) {
      var summ = this.summary.slice(0, 350);
      this.summary = summ + "..."
    }

  }

  getImages(id) {
    this.api.getImages(this.id).subscribe((data) => {
      this.allImages = data;
      console.log(this.allImages);
    })
  }

  networkcrop() {
    if (this.network.length > 8) {
      var net = this.network.slice(0, 8);
      this.network = net + "..";
    }
  }

  seasonsData() {
    this.api.getSeasons(this.id).subscribe((data) => {
      this.seasons = data;
      this.numberOfSeasons = this.seasons.length;
      this.dataFromSeasons = this.seasons;

      console.log(this.seasons);
    });
  }

  completeCast;

  castData() {
    this.api.retrieveCast(this.id).subscribe((data) => {
      const castDeets: any = data;
      this.castDetails = castDeets.filter(d => d.person.image != null);
      this.completeCast = this.castDetails;
      if (this.castDetails.length > 6) {
        var crop = this.castDetails.slice(0, 6);
        this.castDetails = crop;
        console.log(this.castDetails);
      }
    })

  }

  allCastList() {
    let navData: NavigationExtras = {
      queryParams: {
        title: this.title,
        id: this.id,
      }
    }
    console.log(this.id);
    this.router.navigate(['castList'], navData);
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

  moreDetails() {
    console.log("Clicked")
  }



}

