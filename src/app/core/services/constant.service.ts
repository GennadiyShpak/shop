import { Injectable } from '@angular/core';
import {AppInfo} from "../../shared/models/app-info";

@Injectable()
export class ConstantService {

  getApiInfo(): AppInfo {
    return {
      App: "Shop",
      Ver: "1.3",
      API_URL: "http://localhost:3333/"
    }
  }
}

export const appInfo = new ConstantService();
