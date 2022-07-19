import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';



@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {

  createEmpleado:FormGroup;
  sumit = false;
  loading = false;
  id:string | null;
  titulo = 'Agregar Empleado';

  constructor( private fb:FormBuilder, private _empleadoService:EmpleadoService, private route:Router, private toastr: ToastrService, private aRout:ActivatedRoute) {
    
   this.createEmpleado = this.fb.group({
     name:['', Validators.required],
     apellido:['', Validators.required],
     documento:['', Validators.required],
     salario:['', Validators.required]
    })
    this.id = this.aRout.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.editarEmpleado()
  }
  crearEmpleados(){
    this.sumit = true;
    if(this.createEmpleado.invalid){
      return;
    }
    if(this.id == null){
      this.agregarEmpleado();
    }else{
      this.updateEmpleado(this.id);
    }

  }

  agregarEmpleado(){
    this.titulo = 'Agregar Empleado';
    const empleado: any ={
      name: this.createEmpleado.value.name,
      apellido: this.createEmpleado.value.apellido,
      documento:this.createEmpleado.value.documento,
      salario:this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fetchActualizacion: new Date()
    }
this._empleadoService.agregarEmpleado(empleado).then(()=>{
  this.toastr.success('Good', 'Se agrego el empleado Correctamente',({positionClass:'toast-bottom-right'}));
this.loading = false;
this.sumit = false;
this.createEmpleado.reset();
this.route.navigate(['/list-empleado']);
}).catch((e)=>{
  this.loading= false;
  this.sumit = false;
  this.createEmpleado.reset();
  this.toastr.error('Error', 'Ocurrio un error' + e);
})
  }
updateEmpleado(id: string){
  const empleado: any ={
    name: this.createEmpleado.value.name,
    apellido: this.createEmpleado.value.apellido,
    documento:this.createEmpleado.value.documento,
    salario:this.createEmpleado.value.salario,
    fetchActualizacion: new Date()
  }
  this._empleadoService.updateEmpleado(id, empleado).then(()=>{
  this.toastr.success('Se actualizo el empleado Correctamente', 'Update',({positionClass:'toast-bottom-right'}));
  this.loading = false;
  this.sumit = false;
  this.createEmpleado.reset();
  this.route.navigate(['/list-empleado']);
  }).catch((e)=>{
    this.loading= false;
    this.sumit = false;
    this.createEmpleado.reset();
    this.toastr.error('Error', 'Ocurrio un error' + e);
  })

}
editarEmpleado(){
    this.titulo = 'Editar Empleado';
    if(this.id != null){
      this._empleadoService.getEmpleadobyID(this.id).subscribe((data)=>{
        this.createEmpleado.setValue({
          name:data.payload.data()['name'],
          apellido:data.payload.data()['apellido'],
          documento:data.payload.data()['documento'],
          salario:data.payload.data()['salario'],
        })
      })
    }
  }
}
