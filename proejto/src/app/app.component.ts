import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmizadeComponent } from "./components/amizade/amizade.component";
import { PaiComponent } from "./components/pai/pai.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AmizadeComponent, PaiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  usuario: string = "Sholker"
  
  title = 'proejto';

}
