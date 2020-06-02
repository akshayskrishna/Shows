import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any = [];
  listFilter: any = [];
  public query: String;
  constructor(private api: ApiService) { }

  ngOnInit() {
    //this.myData();
  }

  // async myData() {
  //   this.api.getData().subscribe((data) => { this.data.push(data) });
  //   //console.log(this.data);
  // }

  async getDataBySearch(event) {

    this.query = event;
    console.log(this.query);
    return this.api.getDataBySearch(this.query).subscribe((data) => {
      this.data['list'] = (data)
      this.listFilter = this.data['list'];
      console.log(this.listFilter);

    });
  }


}
