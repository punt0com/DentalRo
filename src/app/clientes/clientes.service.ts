import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clientes } from './clientes.model';
import { tap, map } from 'rxjs/operators';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
    private d = '';
    // private Clientes: Clientes;
// tslint:disable-next-line: variable-name
    // private _clientes = new BehaviorSubject<Clientes[]>([]);
    private _clientes = new BehaviorSubject<Clientes[]>([]);
    constructor(private http: HttpClient ) {

    }

    addCliente(clientes: Clientes) {
        return this.http.post<{ name: string }>('https://test-69b25.firebaseio.com/clientes.json', {
            correo: clientes.correo,
            nombre: clientes.nombre,
            telefono: clientes.telefono,
            ultimaVisita: clientes.ultimaVisita,
            id: null
        }).pipe(tap()).subscribe();
    }

    updateCliente(newCliente: Clientes, id: string) {
        console.log(newCliente);
        console.log(id);

         this.http.put('https://test-69b25.firebaseio.com/clientes/' + id + '.json',
         newCliente).subscribe();
    }

    lookForSpecificCliente(id: string) {
        const link = 'https://test-69b25.firebaseio.com/clientes/' + id + '.json';
        console.log(link);
        return this.http.get<{[key: string]: Clientes}>
        (link).
         pipe( map(test => {
         const dataOutput = [];
                 // console.log( key);
         dataOutput.push( test );
                // console.log(test[key].cliente);
         // console.log(dataOutput);
         return dataOutput;
         }),
         tap(clientes => {
             this._clientes.next(clientes);
         })
         );
    }
    lookForCliente(nombre: string) {
       // console.log(newDate);
       const link = 'https://test-69b25.firebaseio.com/clientes.json?orderBy="nombre"&equalTo=' + '"' + nombre + '"';
       return this.http.get<{[key: string]: Clientes}>
       (link).
        pipe( map(test => {
        const dataOutput = [];
        for (const key in test) {
            if (test.hasOwnProperty(key)) {
                dataOutput.push({id: key ,
                    correo: test[key].correo,
                    nombre: test[key].nombre,
                    telefono: test[key].telefono,
                    ultimaVisita: test[key].ultimaVisita});
                console.log(key);
             }
        }
        console.log(dataOutput);
        return dataOutput;
        }),
        tap(clientes => {
            this._clientes.next(clientes);
        })
        );


        }
    }
