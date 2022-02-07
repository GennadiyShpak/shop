import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})

export class LocalStorageService {

  setData(key: string, value: any): void {
    const normalizedValue = JSON.stringify(value);
    localStorage.setItem(key, normalizedValue);
  }

  getData(key: string): any {
    const localStorageData = localStorage.getItem(key);
    if (!localStorageData) {
      return null
    }
    return JSON.parse(localStorageData);
  }

  clearData(key: string): void {
    localStorage.removeItem(key);
  }
}

export const storage = new LocalStorageService();
