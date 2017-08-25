import { Component } from '@angular/core';

//import {Component} from '@angular/core';
import {Deploy} from '@ionic/cloud-angular';

import {Platform} from 'ionic-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  debugMsg: string = "init value";

  constructor(public deploy: Deploy, public platform: Platform) {
    this.debugMsg += " - Constructor: starting point.";
//    console.log(this.debugMsg);
    
    this.deploy.channel = 'dev';

    if(this.platform.is('ios')){
      this.debugMsg += " - ios device";
//      console.log(this.debugMsg);

      this.deploy.channel = 'dev';

      this.deploy.check().then((snapshotAvailable: boolean) => {
        this.debugMsg += " - deploy check";

        if (snapshotAvailable) {
          // When snapshotAvailable is true, you can apply the snapshot

          this.debugMsg += " - SNAPSHOT AVAIABLE!";
  //        console.log(this.debugMsg);

          /*

          this.deploy.download().then(() => {
            this.debugMsg = "Downloaded :)";
//            console.log(this.debugMsg);
            return this.deploy.extract();
          });
          */

        }else{
          this.debugMsg += " - No SNAPSHOT Update...";
        }
      });

    }else{
      this.debugMsg += " - Not iOS";
//      console.log(this.debugMsg);
    }

  }

  testMethod(){
    this.debugMsg += " - || ";

    if(this.platform.is('ios')){
      this.debugMsg += " - ios device";

      this.deploy.check().then((snapshotAvailable: boolean) => {
        if (snapshotAvailable) {
          // When snapshotAvailable is true, you can apply the snapshot
          this.debugMsg += " - SNAPSHOT AVAIABLE!";
        }else{
          this.debugMsg += " - No SNAPSHOT Update...";
        }
      });
    }else{
      this.debugMsg += " - Not iOS";
    }
  }
}
