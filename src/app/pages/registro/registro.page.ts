import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
  }from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public router: FormBuilder,
    public alertController: AlertController,
    public navCtrl:NavController) {
    this.formularioRegistro = this.router.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required),

    });
  }

  ngOnInit() {
  }

  async guardar(){
    var formulario = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    var usuario = {
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      contraseña: formulario.contraseña
     
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot('principal');
  }

}
