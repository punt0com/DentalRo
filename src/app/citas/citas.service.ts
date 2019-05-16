import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Citas } from './citas.model';
import { tap, map } from 'rxjs/operators';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
    private d = '';
    private citas: Citas;
// tslint:disable-next-line: variable-name
    private _citas = new BehaviorSubject<Citas[]>([]);
    constructor(private http: HttpClient ) {

    }

    // fecha: string, descripcion: string, mensaje: string, cliente: string
    addCita(citas: Citas) {
        return this.http.post<{ name: string }>('https://test-69b25.firebaseio.com/cita.json', {
            fecha: moment(citas.fecha).format('MM/DD/YYYY'),
            descripcion: citas.descripcion,
            hora: moment(citas.hora).format('k:mm'),
            cliente: citas.cliente,
            id: null
        }).pipe(tap()).subscribe();
    }

    updateCita(newcita: Citas, id: string) {
         this.http.put('https://test-69b25.firebaseio.com/cita/' + id + '.json',
         newcita).subscribe();
    }

    lookForSpecificCita(id: string) {
        const link = 'https://test-69b25.firebaseio.com/cita/' + id + '.json';
        console.log(link);
        return this.http.get<{[key: string]: Citas}>
        (link).
         pipe( map(test => {
         const dataOutput = [];
                 // console.log( key);
         dataOutput.push( test );
                // console.log(test[key].cliente);
         // console.log(dataOutput);
         return dataOutput;
         }),
         tap(citas => {
             this._citas.next(citas);
         })
         );
    }
    lookForCita(fecha: string) {
       const newDate = moment(fecha).format('MM/DD/YYYY');
       // console.log(newDate);
       const link = `https://test-69b25.firebaseio.com/cita.json?orderBy="fecha"&equalTo=` + '"' + newDate + '"';
        //console.log(link);
       return this.http.get<{[key: string]: Citas}>
       (link).
        pipe( map(test => {
        const dataOutput = [];
        for (const key in test) {
            if (test.hasOwnProperty(key)) {
                dataOutput.push({id: key , cliente: test[key].cliente, hora: test[key].hora, descripcion: test[key].descripcion});
               // console.log(test[key].cliente);
             }
        }
        // console.log(dataOutput);
        return dataOutput;
        }),
        tap(citas => {
            this._citas.next(citas);
        })
        );


        }
}
