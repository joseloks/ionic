import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage {
  formularioRecuperacion: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {
    this.formularioRecuperacion = this.formBuilder.group({
      nuevaContraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async cambiarContrasena() {
    var usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);
      var formulario = this.formularioRecuperacion.value;

      if (formulario.nuevaContraseña === formulario.confirmarContraseña) {
        // Cambiar la contraseña en el localStorage
        usuario.contraseña = formulario.nuevaContraseña;
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Mostrar alerta de éxito
        const alert = await this.alertController.create({
          header: 'Contraseña Actualizada',
          message: 'Tu contraseña ha sido actualizada exitosamente.',
          buttons: ['Aceptar'],
        });
        await alert.present();

        // Navegar a la página principal o de login
        this.navCtrl.navigateRoot('login');
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Las contraseñas no coinciden.',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se encontró el usuario en el sistema.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
}