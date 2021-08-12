import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class LandingpageService {

  constructor(
    private _http: HttpClient
  ) { }

  // Get top stories
  public getTopStories() {
    return this._http
      .get(environment.rootEndpoint + environment.topStoriesEndpoint)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // Get story by id
  public getStoryById(storyID: number) {
    return this._http
      .get(environment.rootEndpoint + environment.storyItemEndpoint + storyID + '.json')
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // Get user by id
  public getUserById(userID: number) {
    return this._http
      .get(environment.rootEndpoint + environment.userEndpoint + userID + '.json')
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A client error occurred:', error);
      return throwError(error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`
      );
      return throwError(error);
    }
  }
}
