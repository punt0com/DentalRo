import { Component, OnInit } from '@angular/core';
import { CitasService } from '../citas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Citas } from '../citas.model';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-citas-editar',
  templateUrl: './citas-editar.page.html',
  styleUrls: ['./citas-editar.page.scss'],
})
export class CitasEditarPage implements OnInit {
  public loadingCita: Citas[];
  public updateCita: Citas;
  public id: string;
  public clienteName: string ;
  constructor(private citasServices: CitasService, private activateRoute: ActivatedRoute, private toast: ToastController) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      // console.log(paramMap.get('id'));
      this.citasServices.lookForSpecificCita(paramMap.get('id')).subscribe(cita => {
        this.loadingCita = cita;
        this.clienteName = cita[0].cliente;
      });
    });
  }

  onSubmitEdit(form: NgForm) {

    const newCitas: Citas = {
      id: this.id,
      fecha: moment(form.value.newFecha).format('MM/DD/YYYY'),
      descripcion: form.value.newDescripcion,
      hora: moment(form.value.newHora).format('k:mm'),
      cliente:this.clienteName
      };
    this.citasServices.updateCita (newCitas, this.id);
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
