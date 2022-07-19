import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor( private firestore: AngularFirestore) { }

  agregarEmpleado(empleado:any): Promise<any>{
    return this.firestore.collection('Empleado').add(empleado);
  }
  getEmpleados():Observable<any>{
    return this.firestore.collection('Empleado', ref=>ref.orderBy('fechaCreacion','desc')).snapshotChanges();
  }
  getEmpleadobyID(id:string):Observable<any>{
    return this.firestore.collection('Empleado').doc(id).snapshotChanges();
  }
  updateEmpleado(id:string, data:any):Promise<any>{
    return this.firestore.collection('Empleado').doc(id).update(data);
  }
  eliminarEmpleado(id:string):Promise<any>{
    return this.firestore.collection('Empleado').doc(id).delete();
  }
}
