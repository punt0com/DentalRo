import { Component, OnInit } from '@angular/core';
import { CitasService } from '../citas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Citas } from '../citas.model';
import * as moment from 'moment';



@Component({
  selector: 'app-citas-detalles',
  templateUrl: './citas-detalles.page.html',
  styleUrls: ['./citas-detalles.page.scss'],
})
export class CitasDetallesPage implements OnInit {
  private citasSub: Subscription;
  public loadingCita: Citas[];
  public ReadOnly = false;
  public fechaCita: string;
  constructor(private citasService: CitasService,
              private activateRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      // this.fechaCita = paramMap.get('date');
      this.fechaCita = moment(paramMap.get('date')).format('MM/DD/YYYY');
      // console.log(this.fechaCita);
      this.citasSub = this.citasService.lookForCita(this.fechaCita).subscribe(citas => {
        this.loadingCita = citas;
        // console.log(citas);
        //console.log(this.loadingCita);
      });
    });
  }
  ionViewWillEnter( ) {
    this.activateRoute.paramMap.subscribe(paramMap => {
      // this.fechaCita = paramMap.get('date');
      this.fechaCita = moment(paramMap.get('date')).format('MM/DD/YYYY');
      this.citasSub = this.citasService.lookForCita(this.fechaCita).subscribe(citas => {
        this.loadingCita = citas;
       // console.log(citas);
       // console.log(this.loadingCita);
      });
    });
  }
}
