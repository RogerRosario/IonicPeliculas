import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage) { 
    this.initDB();
  }

  async initDB(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarPelicula(pelicula: PeliculaDetalle){
    
    this.peliculas.push( pelicula );

    this.storage.set('peliculas', this.peliculas);
  }
}
