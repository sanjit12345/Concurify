import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  lastIn: any= '';
  currentPage = '';
  timeSpentOnPages = [];
  moment = moment;

  constructor(private router: Router) { 
    this.router.events.subscribe((event: any)=> {
      if (!this.currentPage) {
        this.currentPage = event.url;
        this.lastIn = Date.now();
      }
      if (this.currentPage !== event.url) {
        const timeSpent = Date.now() - this.lastIn;
        console.log('page', this.currentPage); 
        console.log('timeSpent', moment.utc(timeSpent).format('H:mm:ss')); 
        const pageInfo = {
          pageUrl : this.currentPage,
          timeSpent
        }
        this.timeSpentOnPages.push(pageInfo);
        this.lastIn = Date.now();
        this.currentPage = event.url;
      }
    })
  }

  ngOnInit() {
  }

}
