import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AllservicesService } from '../../../services/allservices.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
// Attributs



// Methodes
constructor(private service:AllservicesService, private router:Router){

}

  deconnexion(){
    localStorage.removeItem("onlineUser");
    this.router.navigate(['/accueil']);
    this.service.message("Au revoir","success","Déconnexion faite avec succès");
    // deconnexionCommercant
    // this.service.simplePost("api/deconnexionCommercant",((reponse:any)=>{
    //   console.log(reponse);
    // }));
  }
}
