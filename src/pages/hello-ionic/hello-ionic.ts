import { Component } from '@angular/core';

//import {Component} from '@angular/core';
import {Deploy} from '@ionic/cloud-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public deploy: Deploy) {

    this.deploy.check().then((snapshotAvailable: boolean) => {
      if (snapshotAvailable) {
        // When snapshotAvailable is true, you can apply the snapshot

        console.log("SNAPSHOT AVAIABLE!");

        this.deploy.download().then(() => {
          console.log("Downloaded :)");
          return this.deploy.extract();
        });
      }
    });

  }
}
