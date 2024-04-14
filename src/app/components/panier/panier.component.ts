import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AllservicesService } from '../../services/allservices.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {
  // Attributs
  public quantite = 1;
  public panier: any = [];
  public nombreArticles = 0;
  public sommeArticles = 0;
  public prixLivraion = this.service.prixLivraion;
  public urlBaseImage=this.service.urlBaseImage;
  public nombreProduitPanier = JSON.parse(localStorage.getItem('panier') ?? '[]').length;

  // Methodes
  constructor(private service: AllservicesService, private router: Router) {

  }

  ngOnInit(): void {
    this.panier = this.service.getFromPanier();
    this.totalArticles();
    this.nombreProduitPanier = JSON.parse(localStorage.getItem('panier') ?? '[]').length;
  }

  upOrDownQuantity(type: string, id: any) {
    // if (this.quantite<1) {
    //   this.quantite=1;
    // }
    let panierProduit = this.service.getFromPanier();
    panierProduit.forEach((element: any) => {
      if (element.produit.id == id) {
        if (type == 'up') {
          // this.quantite++;
          element.quantitePanier++;
          if (element.quantitePanier>element.produit.quantite) {
            element.quantitePanier--;
            this.service.message("Oops","warning",`il n'en reste que ${element.produit.quantite} produit en stock`);
          }
        } else {
          // this.quantite--;
          element.quantitePanier--;
          if (element.quantitePanier < 1) {
            element.quantitePanier = 1;
          }
        }
      }
    });
    localStorage.setItem("panier", JSON.stringify(panierProduit));
    this.totalArticles();
    this.panier = this.service.getFromPanier();
  }

  totalArticles() {
    this.nombreArticles = 0;
    this.sommeArticles = 0;
    let panierProduit = this.service.getFromPanier();
    panierProduit.forEach((element: any) => {
      this.nombreArticles += element.quantitePanier;
      this.sommeArticles += element.quantitePanier * element.produit.prix;
    });

  }

  deleteFromPanier(id: any) {
    let tab: any = [];
    tab = this.service.getFromPanier();
    tab.forEach((element: any, index: any) => {
      if (element.produit.id == id) {
        tab.splice(index, 1);
      }
    });
    localStorage.setItem('panier', JSON.stringify(tab));
    this.panier = this.service.getFromPanier();
    this.service.message("Parfait", "success", "produit retiré du panier");
    this.totalArticles();
    this.refresh(JSON.parse(localStorage.getItem('panier') ?? '[]').length);

  }

  isOnline() {
    let a = JSON.parse(localStorage.getItem('panier') ?? '[]');
    // console.log(a.length);
    if (a.length == 0) {

      this.service.message('Oop\'s', "warning", "Le panier est vide veuillez le remplir d'abord");
    }else{

      if (this.service.IsOnline()) {
        if (this.service.whoIsOnline()=="livreur" || this.service.whoIsOnline()=="commercant" ) {
          this.service.message('Oop\'s', "warning", "Il vous faut un compte client pour cette action");
        }else{

          this.router.navigate(['/confirmCommand']);
        }
      } else {
        this.service.message('Oop\'s', "error", "La connexion est requise pour cette action");
      }
    }
  }


   // panierItem
   public refresh(number:any) {
    this.service.setRefresh(number);
  }
}
