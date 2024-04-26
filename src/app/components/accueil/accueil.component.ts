import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AllservicesService } from '../../services/allservices.service';
import { Produit } from '../../models/produit';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  // Attributs
  public produits: any = [];
  public urlBaseImage = this.service.urlBaseImage;


  // Methodes
  constructor(private service: AllservicesService) {

  }

  ngOnInit(): void {
    this.service.get("api/liste_article", (reponse: any) => {
      this.produits = reponse.data;
      //  console.log(reponse.data);
    });
  }

  postPanier(produit: any) {
    this.service.postToPanier(produit);
    this.refresh(JSON.parse(localStorage.getItem('panier') ?? '[]').length);

  }

  // panierItem
  public refresh(number: any) {
    this.service.setRefresh(number);
  }
}
