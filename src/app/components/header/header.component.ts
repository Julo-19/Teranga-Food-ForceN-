import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AllservicesService } from '../../services/allservices.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {



  // Attributs
  // public nombreArticlesPanier=signal<number>(0);
  // public nombreArticlesPanier=this.service.getFromPanier().length;
  // cardContent=1;
  // public isOnline=this.service.IsOnline();
  public panierItemNumber=JSON.parse(localStorage.getItem('panier') ?? '[]').length;
  public navLinks = [
    {
      path: "accueil",
      name: "Accueil",
      icon: "bi bi-house-check-fill"
    },
    {
      path: "catalogue",
      name: "Produits",
      icon: "bi bi-shop",

    },
    {
      path: "contact",
      name: "Contact",
      icon: "bi bi-person-lines-fill"
    },
    {
      path: "panier",
      name: "Panier",
      icon: "bi bi-cart3",
      nombreArticlesPanier: this.service.nombreProduitPanier
    }
  ];
  constructor(private service: AllservicesService, private router: Router) {

  }
  ngOnInit(): void {
    this.loadPanierItem();

    // console.log('test data',this.isOnline);
    // console.warn("test",JSON.parse(localStorage.getItem("onlineUser") ?? '{}').token);
  }
  // Methodes
  // activeLink() {
  //   let links = document.querySelectorAll('a');
  //   links.forEach((element: any) => {
  //     element.addEventListener('click', () => {
  //       links.forEach((element: any) => {
  //         element.classList.remove('active-link');
  //       });
  //       // alert('okay')
  //       element.classList.add('active-link');
  //     });
  //   });
  // }

  isOnline() {
    return this.service.IsOnline();
  }

  deconnexion() {
    localStorage.removeItem("onlineUser");
    this.router.navigate(['/accueil']);
    this.service.message("Au revoir", "success", "Déconnexion faite avec succès");
    // deconnexionCommercant
    // this.service.simplePost("api/deconnexionCommercant",((reponse:any)=>{
    //   console.log(reponse);
    // }));

  }
  whoIsOnline() {
    return this.service.whoIsOnline();
  }

  //   this.service.getRefresh().subscribe((value: boolean) => {
  //     if(value) {

  //       this.loadCards()
  //     }

  // })
  loadPanierItem() {

    this.service.getRefresh().subscribe((value: any) => {
      if (value) {
        // console.log(value);
        this.panierItemNumber=value;
        return value
        // this.loadCards()
      }
    });
  }
}
