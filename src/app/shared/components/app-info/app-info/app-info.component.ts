import {Component, Inject, InjectionToken, OnInit} from '@angular/core';
import {appInfo, ConstantService} from "../../../../core/services/constant.service";
import {AppInfo} from "../../../models/app-info";


@Component({
  selector: 'app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss'],
  providers: [ {provide: ConstantService, useValue: appInfo} ]
})
export class AppInfoComponent implements OnInit {
  info!: AppInfo;

  constructor(
    private shopAppsInfo: ConstantService
  ) { }

  ngOnInit(): void {
    this.info = this.shopAppsInfo.getApiInfo()
  }

}
