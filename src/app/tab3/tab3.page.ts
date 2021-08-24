import { Component } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  

  peliculas: PeliculaDetalle [] = [];
  generos: Genre[] = [];
  favoritoGenero: any[] = [];
  

  constructor( private dataLocalService: DataLocalService,
                private movieService: MoviesService) {


  }
  
  async ionViewWillEnter(event: any){

   this.refrescarLista(event);
      
  }

  async refrescarLista(event){
    if(!event){
      this.peliculas = await this.dataLocalService.cargarFavoritos();
      this.generos = await this.movieService.cargarGeneros();
      this.pelisPorGenero(this.generos, this.peliculas);
    }
  }

  pelisPorGenero(generos: Genre[], pelicula: PeliculaDetalle[]){
    
    this.favoritoGenero = [];
    generos.forEach( genero =>  {

      this.favoritoGenero.push({

        genero: genero.name,
        pelis: this.peliculas.filter( peli => {
          return peli.genres.find( genre => genre.id === genero.id );
        })
      });
    });

    console.log(this.favoritoGenero);
  }

}
