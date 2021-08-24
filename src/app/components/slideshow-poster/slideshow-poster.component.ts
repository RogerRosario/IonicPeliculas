import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';
import { element } from 'protractor';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[];
  @Output() refrescarLista = new EventEmitter<string>();

  slidesOpts = {
    slidesPerView: 3.2,
    freeMode: false
  };
  
  constructor(private modalCrtl: ModalController) { }

  ngOnInit() {}
  
  async verDetalle(id){
    
    const modal = await this.modalCrtl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.refrescarLista.emit(data.existe);
  
  }
}
