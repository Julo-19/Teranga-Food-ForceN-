import { Component, OnInit } from '@angular/core';
import { AllservicesService } from '../../services/allservices.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { iif } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    JsonPipe

  ],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {
  // Attributs
  public produits: any = [];
  public categories: any = [];
  public titre = "Tout";
  public searchInput = "";
  public pageActuelle: number = 1;
  public articlesParPage: number = 9;
  public urlBaseImage: any = "";

  // Methodes
  constructor(private service: AllservicesService) {

  }

  ngOnInit(): void {
    this.loadAllProducts();
    this.service.get("api/categories", (reponse: any) => {
      this.categories = reponse.data;
      // console.log(reponse.data);
    });
    this.urlBaseImage = this.service.urlBaseImage;
  }

  loadAllProducts() {
    this.service.get("api/produits", (reponse: any) => {
      this.produits = reponse.data;
      // console.log(reponse.data);
      this.titre = "Tout";
    });
  }

  getProductByCategorie(id: any, nom_categorie: any) {
    this.service.get("api/produits/" + id, (reponse: any) => {
      this.produits = reponse.data;
      this.titre = nom_categorie;
      // console.log("prod: ",id,reponse.data);
    });
  }
  getProductByCategorieSelect(id: any) {
    // console.log(id.target.value);
    if (id.target.value == 'tout') {
      this.loadAllProducts();
      // this.titre = "tout";
    } else {
      this.service.get("api/produits/" + id.target.value, (reponse: any) => {
        this.produits = reponse.data;
        // this.titre = id.target.value.substring(2);
        // console.log(id.target.value.substring(2));
        // console.log("prod: ",id.target.value,reponse.data);
      });
    }
  }


  search() {
    return this.produits.filter((prod: any) => prod.nom_produit.toLowerCase().includes(this.searchInput.toLowerCase()));
  }

  postPanier(produit: any) {
    this.service.postToPanier(produit);
    this.refresh(JSON.parse(localStorage.getItem('panier') ?? '[]').length);
  }

  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    return this.search().slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.search().length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.search().length / this.articlesParPage);
  }

  // filtre selon prix, croissant décroissant
  filtrePrix(event: any) {
    if (event.target.value == 'desc') {

      this.produits.sort((p1: any, p2: any) => (p1.prix < p2.prix) ? 1 : (p1.prix > p2.prix) ? -1 : 0);
    } else if (event.target.value == 'asc') {

      this.produits.sort((p1: any, p2: any) => (p1.prix > p2.prix) ? 1 : (p1.prix < p2.prix) ? -1 : 0);
    } else {
      this.loadAllProducts();
    }
  }

  // panierItem
  public refresh(number:any) {
    this.service.setRefresh(number);
  }
  
}
