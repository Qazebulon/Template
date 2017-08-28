import { Component } from '@angular/core';

//import {Component} from '@angular/core';
import {Deploy} from '@ionic/cloud-angular';

import {Platform, AlertController} from 'ionic-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  debugMsg: string = "init value";

  constructor(public deploy: Deploy,
              public alertCtrl: AlertController,
              public platform: Platform) {
    this.debugMsg += " - Constructor: starting point.";
//    console.log(this.debugMsg);

    if(this.platform.is('ios')){
      this.debugMsg += " - ios device";
//      console.log(this.debugMsg);

      this.deploy.channel = 'dev';

      this.debugMsg += " -/- " + deploy;

      this.deploy.check().then(function() {
        // checked
        this.debugMsg += " -\- Checked";
      }, function() {
        // failed
        this.debugMsg += " -\- Failed";
      });

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


      this.deploy.channel = 'dev';
      this.deploy.getSnapshots().then((snapshots) => {
        // snapshots will be an array of snapshot uuids
        this.debugMsg += " - SNAPSHOTS: " + snapshots;
      });

      this.deploy.channel = 'dev';
      this.deploy.check().then((snapshotAvailable: boolean) => {
        if (snapshotAvailable) {
          // When snapshotAvailable is true, you can apply the snapshot
          this.debugMsg += " - SNAPSHOT AVAIABLE!";

          //Show alert
          let alert = this.alertCtrl.create({
            title: 'New Content Available!',
            subTitle: 'An update to the app has been found and will now download.',
            buttons: ['OK']
          });
          alert.present();

          //Download & Apply Update
          this.deploy.download().then(() => {
            this.deploy.extract().then(() => {
              this.deploy.load();
            });
          });


        }else{
          this.debugMsg += " - No SNAPSHOT Update...";
        }
      });
    }else{
      this.debugMsg += " - Not iOS";
    }
  }
}
