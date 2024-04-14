import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { AllservicesService } from './services/allservices.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    RouterLink,
  ]
})
export class AppComponent {
  // Attributs
  title = 'panierlocal';



  // Methodes
  constructor(private service: AllservicesService) {

  }


  isOnline() {
    return this.service.IsOnline();
  }

  whoIsOnline() {
    return this.service.whoIsOnline();
  }
}
