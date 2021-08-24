import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltroImagePipe } from './filtro-image.pipe';



@NgModule({
  declarations: [
    ImagePipe,
    ParesPipe,
    FiltroImagePipe,
  
  ],
  exports: [
    ImagePipe,
    ParesPipe,
    FiltroImagePipe
    
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
