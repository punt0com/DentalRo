import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientesService } from './clientes.service';
import { Clientes } from './clientes.model';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

// tslint:disable-next-line: no-shadowed-variable
  constructor(private clientesService: ClientesService, private toast: ToastController) { }

  ngOnInit() {
  }
  onSubmitAgregador(form: NgForm) {
    const newCliente: Clientes = {
      id: null,
      telefono: form.value.telefono,
      ultimaVisita: '',
      nombre: form.value.nombreClienteAgregador,
      correo: form.value.correo
      };
    this.clientesService.addCliente(newCliente);

    this.presentToast();
      }

      async presentToast() {
        const toast = await this.toast.create({
          message: 'Cliente Registrado!',
          duration: 2000
        });
        toast.present();
      }

      onSubmitBuscador(form: NgForm ) {
         console.log(form.value.nombreCliente);
         this.clientesService.lookForCliente(form.value.nombreCliente);
      }
}
