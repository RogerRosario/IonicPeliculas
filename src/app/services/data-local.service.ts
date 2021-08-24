import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) { 
    this.initDB();
    this.cargarFavoritos();
  }

  async presentToast(message = ''){
    const toast = await this.toastCtrl.create({
      message,
      duration: 500
    });
    toast.present();
  }

  async initDB(){
    const storage = await this.storage.create();
    this._storage = storage;
  }



  guardarPelicula(pelicula: PeliculaDetalle) {
    let existe = false;
    let mensaje = '';
    for ( const peli of this.peliculas ) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }
    if(existe) {
      // si existe en el array entonces la saca de favoritos
      this.peliculas = this.peliculas.filter(pelic => pelic.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Argegado a favoritos';
    }
    this.storage.set('peliculas', this.peliculas);
    this.presentToast(mensaje);
    return !existe;
  }
  
  async cargarFavoritos() {
    const peliculas= await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id == id );
    return (existe) ? true : false;
  }
}
