import { Component } from '@angular/core';
import * as firebase from 'firebase'
import { Network } from '@ionic-native/network/ngx';
import { ModalController } from '@ionic/angular';
import { RegistroComponent } from '../registro/registro.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ref = firebase.database().ref()
  constructor(
    private modal: ModalController,
    private network: Network,
    private toastController: ToastController
  )
  
  {
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log("Estoy dentro del servicio, seguro que funciona?")
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          if(localStorage.getItem('data')){
            let sincronize = JSON.parse(localStorage.getItem('data'))
            JSON.parse(localStorage.getItem('data')).forEach(item => {
              let insert = this.ref.push();
              this.presentToast();
              console.log(insert.set(item))
            });
          localStorage.clear()
          }
        }
      }, 3000);
    });
  }

  async openModal(){
    const modal= await this.modal.create({
      component: RegistroComponent,
      cssClass: 'registro'
    });
    await modal.present();
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se ha sincronizado con Firebase',
      duration: 3000
    });
    toast.present();
  }
  
}
