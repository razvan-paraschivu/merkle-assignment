import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { LandingpageService } from './landingpage.service'

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  public showLoading: boolean = true;
  private subscription: Subscription = new Subscription();
  public storiesIds: any[] = [];
  public topStories: any[] = [];
  public cardStories: any[] = [{time: 0}, {time: 0}, {time: 0}, {time: 0}, {time: 0}, {time: 0}, {time: 0}];

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
        this.storiesIds = this.pickRandom(resp, 10);
        let arr = [];
        this.storiesIds.forEach(storyId => {
          arr.push(this.landingpageService.getStoryById(storyId))
        });
        forkJoin(arr).subscribe((arrResp) => {
          arrResp.sort((a, b) => (a['score'] > b['score']) ? 1 : -1);
          arrResp.forEach(function (value, i) {
            value['image'] = 'assets/images/' + i + '.jpg';
          });
          this.topStories = [...arrResp].slice(0, 3);
          this.cardStories = [...arrResp].slice(Math.max([...arrResp].length - 7, 0));
          this.showLoading = false;
        });
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.showLoading = false;
      }
    ));
  }

  private pickRandom = (arr: number[], count: number) => {
    let _arr = [...arr];
    return [...Array(count)].map( ()=> _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0] ); 
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

}
