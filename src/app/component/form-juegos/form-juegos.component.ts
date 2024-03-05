// game-form.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-form',
  templateUrl: './form-juegos.component.html',
  styleUrls: ['./form-juegos.component.scss']
})
export class FormJuegosComponent {
  private apiUrl = environment.apiUrl + '/juegos';
  juegosForm: FormGroup;
  imageFile!: string;
  imageName: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.juegosForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      categoria: ['', Validators.required],
      stock: ['', Validators.required],
      image: ['']
    });
  }

  onSubmit() {
    if (this.juegosForm !== null && this.juegosForm !== undefined) {
      const formData = new FormData();
      formData.append('nombre', this.juegosForm.get('nombre')?.value);
      formData.append('descripcion', this.juegosForm.get('descripcion')?.value);
      formData.append('precio', this.juegosForm.get('precio')?.value);
      formData.append('categoria', this.juegosForm.get('categoria')?.value);
      formData.append('stock', this.juegosForm.get('stock')?.value);
      formData.append('imagen_ruta', this.imageFile);
      console.log("formData");
      console.log(formData);


      this.http.post(this.apiUrl, formData)
        .subscribe(response => {
          console.log('Game created successfully:', response);
          // Puedes hacer otras acciones aquí, como redireccionar a otra página
        }, error => {
          console.error('Error creating game:', error);
        });
    }
  }

  onFileSelected() {
    this.imageFile = './../../../assets/img/' + this.imageName;
  }
}
