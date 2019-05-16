import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Citas } from './citas.model';
import { CitasService } from './citas.service';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';




@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {

   d: Date = new Date();
  constructor(private citasService: CitasService, private toast: ToastController ) { }

  ngOnInit() { }

  onSubmitAgregador(form: NgForm) {
const newCitas: Citas = {
  id: null,
  fecha: form.value.fechaAgregador,
  descripcion: form.value.descripcion,
  hora: form.value.hora,
  cliente: form.value.nombre
  };
this.citasService.addCita(newCitas);

this.presentToast();
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Cita Creada!',
      duration: 2000
    });
    toast.present();
  }

  onSubmitBuscador(form: NgForm ) {
    // console.log(form.value.fechaBuscador);
    const newDate = moment(form.value.fechaBuscador).format('MM/DD/YYYY');
    // console.log(newDate);
    this.citasService.lookForCita(newDate);
  }

}
