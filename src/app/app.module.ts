import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CloudSettings, CloudModule, Deploy } from '@ionic/cloud-angular';

/**/
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'b632f9ee'
  }
};
/**/

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(public deploy: Deploy){
    //...
    console.log("deploy constructor");

    this.deploy.check().then((snapshotAvailable: boolean) => {
      console.log("deploy check");
      if (snapshotAvailable) {
        // When snapshotAvailable is true, you can apply the snapshot
        console.log("Snapshot available!!!");
        /*
         this.deploy.download().then(() => {
         this.debugMsg = "Downloaded :)";
         //            console.log(this.debugMsg);
         return this.deploy.extract();
         });
         */
      }else{
        console.log("No new snapshot");
      }
    });

  }
}
