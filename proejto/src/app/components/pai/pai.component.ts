import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { isEmpty } from 'rxjs';
import { AmizadeComponent } from "../amizade/amizade.component";


@Component({
  selector: 'app-pai',
  standalone: true,
  imports: [AmizadeComponent],
  templateUrl: './pai.component.html',
  styleUrl: './pai.component.css',

})



export class PaiComponent {
 
  

  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    const calculateCheckDigit = (cpfArray: number[], factor: number) => {
        const total = cpfArray.reduce((sum, num) => sum + num * factor--, 0);
        const remainder = total % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const cpfArray = cpf.split('').map(Number);

    const firstCheckDigit = calculateCheckDigit(cpfArray.slice(0, 9), 10);
    if (firstCheckDigit !== cpfArray[9]) {
        return false;
    }

    const secondCheckDigit = calculateCheckDigit(cpfArray.slice(0, 10), 11);
    if (secondCheckDigit !== cpfArray[10]) {
        return false;
    }

    return true;
}

isValidBirthDate(dateOfBirth: string): boolean {
  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();

  const age = currentDate.getFullYear() - birthDate.getFullYear();

  const monthDifference = currentDate.getMonth() - birthDate.getMonth();
  const dayDifference = currentDate.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      return age - 1 >= 5;
  }

  return age >= 5;
}

  btnEnviar(){
    const nome = (<HTMLInputElement>document.getElementById("nome")).value;
    const cpf = (<HTMLInputElement>document.getElementById("cpf")).value;
    const data = (<HTMLInputElement>document.getElementById("data")).value;
    var erro = false


    if(nome == ""){
        let myContainer = document.getElementById('erro') as HTMLInputElement;
        myContainer.value = "Campo nome está vazio";
        erro = true
    }
    else if(!this.validarCPF(cpf))
      {
        let myContainer = document.getElementById('erro') as HTMLInputElement;
        myContainer.value = "Digite um CPF válido";
        erro = true
      }
    else if(!this.isValidBirthDate(data)){
        let myContainer = document.getElementById('erro') as HTMLInputElement;
        myContainer.value = "Digite uma data de nascimento válida";
        erro = true
    }
    else{
      let myContainer = document.getElementById('erro') as HTMLInputElement;
      myContainer.value = "";
      var erro = false
  }
   
  if(!erro){
    const pessoa = new Pessoa(nome, cpf, data)
    this.arr.push(pessoa)
    this.passarPessoa.emit(this.arr)
  }

  }
  arr = new Array();

  @Input() pessoa!: Pessoa
  @Output() passarPessoa: EventEmitter<any> = new EventEmitter()


}
class Pessoa {
  nome: string;
  cpf: string;
  data: string;

  constructor(nome: string, cpf: string, data: string) {
      this.nome = nome;
      this.cpf = cpf;
      this.data = data;
  }
}