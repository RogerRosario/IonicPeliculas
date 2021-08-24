import { Pipe, PipeTransform } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Pipe({
  name: 'filtroImage'
})
export class FiltroImagePipe implements PipeTransform {

  transform(peliculas: PeliculaDetalle[] ): any {
    
    return peliculas.filter((pelicula) => pelicula.backdrop_path);
  }

}
