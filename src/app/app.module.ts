import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import {LiveUpdatedContent} from '../pages/live-updated-content/live-updated-content';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {DownloadingSplashScreen} from '../pages/downloading-splash-screen/downloading-splash-screen';

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
    LiveUpdatedContent,
    ItemDetailsPage,
    ListPage,
    DownloadingSplashScreen
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
    LiveUpdatedContent,
    ItemDetailsPage,
    ListPage,
    DownloadingSplashScreen
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(){}
}
