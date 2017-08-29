//FRAMEWORK IMPORTS
import {Component} from '@angular/core';
import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';
//import { SplashScreen } from '@ionic-native/splash-screen';
import {Deploy} from '@ionic/cloud-angular';
//SERVICE IMPORTS
//COMPONENT IMPORTS
//PAGE IMPORTS

@Component({
//  selector: 'component-live-update',
//  templateUrl: 'live-update.html'
})

export class LiveUpdateComponent {
  constructor(
//    public platform: Platform,
//    public menu: MenuController,
//    public statusBar: StatusBar,
//    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public deploy: Deploy
  ){}


  checkForUpdate(){

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
  }
}
