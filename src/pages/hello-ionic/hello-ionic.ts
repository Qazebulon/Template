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
        this.deploy.download().then(() => {
          return this.deploy.extract();
        });
      }
    });

  }
}
