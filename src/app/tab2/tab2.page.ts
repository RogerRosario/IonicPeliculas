import { Component, Input } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Suicide Squad','Mortal Kombat','Avengers','Inception','Batman', 'Spiderman'];
  

  constructor(private moviesService: MoviesService,
              private modalCrtl: ModalController) {}

  async verDetalle(id){
    const modal = await this.modalCrtl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
   

  buscar( event ){
    const valor = event.detail.value;

    if(valor.length === 0){
      this.buscando = false;   
      this.peliculas = [];

      return;
    }

    this.buscando = true;
    this.moviesService.buscarPeliculas(valor)
        .subscribe(resp =>{
          console.log(resp);
          this.peliculas = resp['results'];
          this.buscando = false;
        });
    // console.log(valor);
  }

}
