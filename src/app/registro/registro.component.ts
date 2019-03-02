import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { Network } from '@ionic-native/network/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  ref = firebase.database().ref()
  data = []
  formularioRegistro: FormGroup;
  constructor(private formBuilder : FormBuilder,
    private modal : ModalController, 
    private network: Network,
    private toastController: ToastController
    ) 
    {
      this.formularioRegistro = this.formBuilder.group({
        'name' : ['',Validators.required],
        'age' : ['',Validators.required],
        'city' : ['',Validators.required],
        'ocupation':['',Validators.required],
        'gender' : ['',Validators.required]
      }); 
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Registro guardado en Firebase con wifi',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    
      
  }

  crearRegistro(){
    if (this.network.type === 'wifi') {
      console.log("Intentando mandar desde wifi", this.formularioRegistro.value.age)
      let insert = this.ref.push();
      insert.set(this.formularioRegistro.value);
      this.presentToast();
      this.modal.dismiss();
      }
    else{
      if(localStorage.getItem('data')){
        console.log("Yikes")
        this.data=(JSON.parse(localStorage.getItem('data')))
      }
      this.data.push(this.formularioRegistro.value)
      localStorage.setItem('data',JSON.stringify(this.data))
      this.modal.dismiss()
    }
    
  }


}