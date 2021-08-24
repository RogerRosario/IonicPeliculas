import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  
  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;

  estrella = 'star-outline';

  slidesOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor(private moviesService: MoviesService,
              private modalCrtl: ModalController,
              private datalocalService: DataLocalService) { }

  ngOnInit() {

    this.datalocalService.existePelicula(this.id)
        .then(existe => this.estrella =  (existe) ? 'star' : 'star-outline');
  
    this.moviesService.getPeliculaDetalle(this.id)
        .subscribe(resp => {
          this.pelicula = resp;
        });

    this.moviesService.getActoresPelicula(this.id)
        .subscribe(resp => {
          this.actores = resp.cast;
        });
  }

  regresar(){
    let existe = false;
    if(this.estrella === 'star'){
      existe = true;
    }
    this.modalCrtl.dismiss(
      {
        existe
      }
    );
  }
  
  favorito(){
      
   const existe = this.datalocalService.guardarPelicula(this.pelicula);
    
   this.estrella =  (existe) ? 'star' : 'star-outline';

  }
}
