import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  


  constructor(public alertController:AlertController, public navCtrl:NavController) {


   }

  ngOnInit() {
    
  }
  async salir(){
    const alert = await this.alertController.create({
      header:'salir',
      message:'¿Deseas Salir?',
      buttons:[{
        text: 'No mejor no',
        handler:()=>{}

      },{

      text: 'Si',
      handler:()=> {
        localStorage.removeItem('ingresado');
        this.navCtrl.navigateRoot('login');
      }
    }
  ]

      
    });
    await alert.present();
   

}



}
