import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';

import {Deploy} from '@ionic/cloud-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LiveUpdatedContent} from "../pages/live-updated-content/live-updated-content";
import {DownloadingSplashScreen} from '../pages/downloading-splash-screen/downloading-splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public deploy: Deploy,
//    public liveUpdateComponent: LiveUpdateComponent
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Ionic Live Update Template', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'Live Update Content', component: LiveUpdatedContent },
      { title: 'Live Update Content', component: DownloadingSplashScreen }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      if(this.platform.is('cordova')){
        this.checkForUpdate();
      }

      /** /
      //Cloud Test
//      if(this.platform.is('ios')) {
        this.deploy.channel = 'dev';
        this.deploy.check().then((snapshotAvailable: boolean) => {
          if (snapshotAvailable) {
            console.log("TEST: available");

            //Show alert 1
            let alert = this.alertCtrl.create({
              title: 'New Content Available!',
              subTitle: 'An update to the app has been found and will now download.',
              buttons: ['OK']
            });
            alert.present();

            this.deploy.download().then(() => {
              console.log("TEST: downloaded");

              //Show alert 2
              let alert2 = this.alertCtrl.create({
                title: 'New Content Downloaded!',
                subTitle: '...',
                buttons: ['OK']
              });
              alert2.present();

              this.deploy.extract().then(() => {
                console.log("TEST: extracted");

                //Show alert 3
                let alert3 = this.alertCtrl.create({
                  title: 'New Content Extracted!',
                  subTitle: '...',
                  buttons: ['OK']
                });
                alert3.present();

                this.deploy.load();
                console.log("TEST: loaded");

                //Show alert 4
                let alert4 = this.alertCtrl.create({
                  title: 'New Content Loaded!',
                  subTitle: '...',
                  buttons: ['OK']
                });
                alert4.present();

              });
            });
          }
        });
//      }
      /**/

      this.statusBar.styleDefault();
//      this.splashScreen.hide();
    });
  }

  checkForUpdate(){
    this.deploy.channel = 'dev';
    this.deploy.check().then((snapshotAvailable: boolean) => {
      if (snapshotAvailable) {
        console.log("TEST: available");

        //Show alert 1
        let alert = this.alertCtrl.create({
          title: 'New Content Available!',
          subTitle: 'An update to the app has been found and will now download.',
          buttons: ['OK']
        });
        alert.present();
        this.splashScreen.show();
//        this.nav.setRoot(DownloadingSplashScreen);

        //Show alert 1.2
        let alert12 = this.alertCtrl.create({
          title: 'New Content Available2!',
          subTitle: 'An update to the app has been found and will now download.',
          buttons: ['OK2C']
        });
        alert12.present();


        this.deploy.download().then(() => {
          console.log("TEST: downloaded");

          //Show alert 2
          let alert2 = this.alertCtrl.create({
            title: 'New Content Downloaded!',
            subTitle: '...',
            buttons: ['OK']
          });
          alert2.present();

          this.deploy.extract().then(() => {
            console.log("TEST: extracted");

            //Show alert 3
            let alert3 = this.alertCtrl.create({
              title: 'New Content Extracted!',
              subTitle: '...',
              buttons: ['OK']
            });
            alert3.present();

            this.deploy.load();
            console.log("TEST: loaded");

            //Show alert 4
            let alert4 = this.alertCtrl.create({
              title: 'New Content Loaded!',
              subTitle: '...',
              buttons: ['OK']
            });
            alert4.present();

          });
        });
      }else{
        //Show alert 2
        let alert5 = this.alertCtrl.create({
          title: 'No update',
          subTitle: '...',
          buttons: ['OK']
        });
        alert5.present();

        //No update... continue as usual
        this.splashScreen.hide();
      }
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
