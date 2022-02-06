import { Component, OnInit } from '@angular/core';
import {adminRouting} from "../admin-routing.config";

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.scss']
})
export class AdminNavBarComponent implements OnInit {
  routs!: any;
  constructor() { }

  ngOnInit(): void {
    this.routs = adminRouting;
  }

}
