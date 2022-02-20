import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, retry, tap } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AppSettingService {
    constructor(
            private ls: LocalStorageService,
            private http: HttpClient
        ) {
    }

    getSettings(): Observable<any> {
       const sortSettings = this.ls.getData('SORT_SETTINGS');
       return sortSettings 
       ? of(sortSettings)
       : this.http.get('../../../assets/app-settings.json').pipe(
            retry(2),
            tap((settings) => {
                this.ls.setData('SORT_SETTINGS', settings)
            }),
            catchError(this.handleError) 
       )
    }

    private handleError() {
        return of({
            "isAsc": true,
            "key": "price"
        })
    }
}