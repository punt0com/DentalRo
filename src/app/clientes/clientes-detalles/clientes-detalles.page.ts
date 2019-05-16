import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Clientes } from '../clientes.model';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clientes-detalles',
  templateUrl: './clientes-detalles.page.html',
  styleUrls: ['./clientes-detalles.page.scss'],
})
export class ClientesDetallesPage implements OnInit {
  private citasSub: Subscription;
  public loadingCliente: Clientes[];
  public ReadOnly = false;
  public fechaCita: string;
  public id: string; 
  constructor(private clientesService: ClientesService,
              private activateRoute: ActivatedRoute,
              private toast: ToastController) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      // this.fechaCita = paramMap.get('date');
      this.fechaCita = paramMap.get('nombre');
      // console.log(this.fechaCita);
      this.citasSub = this.clientesService.lookForCliente(this.fechaCita).subscribe(clientes => {
        this.loadingCliente = clientes;
        this.id = this.loadingCliente[0].id;
        // console.log(clientes);
        // console.log(this.loadingCliente);
      });
    });
  }
  onSubmitEdit(form: NgForm) {

    const newCliente: Clientes = {
      nombre: form.value.newNombre ,
      correo: form.value.newCorreo,
      ultimaVisita: '',
      telefono: form.value.numero,
      id: this.id
      };
    this.clientesService.updateCliente(newCliente, this.id);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Cita Editada!',
      duration: 2000
    });
    toast.present();
  }


}
