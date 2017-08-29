import { Component } from '@angular/core';

//import {Component} from '@angular/core';
//import {Deploy} from '@ionic/cloud-angular';

import {Platform} from 'ionic-angular';

@Component({
  selector: 'page-live-updated-content',
  templateUrl: 'live-updated-content.html'
})
export class LiveUpdatedContent {

  debugMsg: string = "init value (live-updated-content):";

  constructor(public platform: Platform) {
    this.debugMsg += " - Constructor: starting point.";

    if(this.platform.is('ios')){
      this.debugMsg += " - ios device";
    }else{
      this.debugMsg += " - Not iOS";
    }

  }
}
