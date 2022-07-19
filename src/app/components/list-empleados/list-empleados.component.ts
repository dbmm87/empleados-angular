import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
 // items: Observable<any[]>;
 empleados:any[] = [];
  constructor( private _empleadosService: EmpleadoService, private toastr: ToastrService) { 
    //this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit(): void {
    this.getEmpleados();
  }
  getEmpleados(){
    this._empleadosService.getEmpleados().subscribe(data=>{
      this.empleados =[];
      data.forEach((element:any) => {
        this.empleados.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }
  eliminarID(id:any){
    this._empleadosService.eliminarEmpleado(id).then(()=>{
      this.toastr.error('Se elimino Correctament', 'Empleado Eliminado',({positionClass:'toast-bottom-right'}));
    }).catch((e)=>{
      this.toastr.error('Ocurrio un error', 'Error',({positionClass:'toast-bottom-right'}));
    })
  }

}
