import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingpageService } from './landingpage.service'

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  public showLoading: boolean = true;
  private subscription: Subscription = new Subscription();
  
  constructor(
    private landingpageService: LandingpageService
  ) { }

  ngOnInit(): void {
    this.getStories();
  }

  private getStories(): void {
    this.showLoading = true;
    this.subscription.add(this.landingpageService.getTopStories().subscribe(
      (resp: number[]) => {
        console.log(resp);
        this.showLoading = false;
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.showLoading = false;
      }
    ));
  }

}
