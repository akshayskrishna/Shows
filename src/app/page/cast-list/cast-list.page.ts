import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.page.html',
  styleUrls: ['./cast-list.page.scss'],
})
export class CastListPage implements OnInit {

  id;
  title;
  castDetails;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) {
    this.route.queryParams.subscribe(data => { this.id = data.id; this.title = data.title; })
  }

  ngOnInit() {
    this.castData(this.id);

  }

  castData(id) {
    this.api.retrieveCast(id).subscribe((data) => {
      const castDeets: any = data;
      this.castDetails = castDeets.filter(d => d.person.image != null);
      console.log(this.castDetails);
    })
  }


}
