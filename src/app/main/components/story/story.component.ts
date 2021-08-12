import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingpageService } from '../landingpage/landingpage.service'

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  @Input()
  public storyData: any;

  @Input()
  public loading: boolean = true;

  @Input()
  public type: string;

  private subscription: Subscription = new Subscription();
  public showLoading: boolean = true;
  public userData: any;

  constructor(
    private landingpageService: LandingpageService
  ) { }

  ngOnInit(): void {
    this.getUser(this.storyData.by);
    this.convertTimestamp(this.storyData.time!);
  }

  private getUser(ID: any): void {
    this.showLoading = true;
    this.subscription.add(this.landingpageService.getUserById(ID).subscribe(
      (resp: any) => {
        this.userData = resp;
        this.showLoading = false;
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.showLoading = false;
      }
    ));
  }

  private convertTimestamp(timestamp): void {
    this.storyData.time = new Date(timestamp * 1000).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    })
  }

  public goToStory(url: string): void {
    window.open(url, "_blank");
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

}
