import { AlertController, NavController } from '@ionic/angular'
import { Component, OnInit } from '@angular/core';
import {
FormGroup,
FormControl,
Validators,
FormBuilder
}from '@angular/forms';





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  

  formularioLogin:FormGroup;

  constructor(public router:FormBuilder,
    public alertController: AlertController,
  public navCtrl:NavController){
this.formularioLogin=this.router.group({
'nombre': new FormControl ("",Validators.required),
'apellido': new FormControl ("",Validators.required),
'contraseña': new FormControl("",Validators.required)

})

}
  ngOnInit() {
  }
  


  async ingresar() {
    var formulario = this.formularioLogin.value;
    var usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);
      if (usuario.nombre == formulario.nombre && usuario.apellido == formulario.apellido && usuario.contraseña && formulario.contraseña) {
        console.log('Ingresado');
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot('principal');
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Tienes que llenar todos los datos',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    } else {
      // Manejo de caso cuando no se encuentra el valor en localStorage
    }
  }
  
}