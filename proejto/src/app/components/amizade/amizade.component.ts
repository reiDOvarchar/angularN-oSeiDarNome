import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaiComponent } from "../pai/pai.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-amizade',
  standalone: true,
  imports: [PaiComponent, NgFor],
  templateUrl: './amizade.component.html',
  styleUrl: './amizade.component.css'
})
export class AmizadeComponent {

 @Input() pessoa!: {nome: string, email: string, data: string};
coracao = [];

 onPassouPessoa(pessoa: []){
  this.coracao = pessoa
}

}
