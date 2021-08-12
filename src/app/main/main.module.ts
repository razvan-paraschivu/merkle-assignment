import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { StoryComponent } from './components/story/story.component';

@NgModule({
  declarations: [LandingpageComponent, StoryComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
