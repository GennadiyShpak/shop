import { Injectable } from '@angular/core';
import {ConfigModel} from "../../shared/models/config.model";
const short = require('short-uuid');

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {

  configModel!: ConfigModel;

  getConfig (): ConfigModel {
    return this.configModel;
  }

  setConfig(config: Partial<ConfigModel>) {
    let { id, login, email } = config;
    const configId = id ? id : short.new();
    login = login ? login : '';
    email = email ? email : '';
    this.configModel = {
      id: configId,
      login,
      email
    };
  }
}
