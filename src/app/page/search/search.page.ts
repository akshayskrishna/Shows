import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  query: string;
  bySearchResult: any = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  async getDataBySearch(event) {

    this.query = event;
    this.api.getDataBySearch(this.query).subscribe((data) => {
      var input: any = data;
      this.bySearchResult = input;
      console.log(this.bySearchResult);
    });
  }

  /* Launch next page details */
  async openShowDetails(event, item) {
    item: item;
    var network;

    //Premier Year details ironed out
    const pre: string = item.show.premiered;
    if (pre == null) {
      var premiered: string = "No Data"
    } else {
      premiered = pre.slice(0, 4);
    }


    //Year Data ironed out
    if (item.show.network == null) {
      network = "No data"
    }
    else {
      network = item.show.network.name;
    }


    let navData: NavigationExtras = {
      queryParams: {
        title: item.show.name,
        id: item.show.id,
        img: item.show.image.original,
        summary: item.show.summary,
        premiered: premiered,
        network: network,
        status: item.show.status,
      }
    }
    this.router.navigate(['showPage'], navData);
  }


}
