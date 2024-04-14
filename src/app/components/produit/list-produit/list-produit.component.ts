import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AllservicesService } from '../../../services/allservices.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-produit',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './list-produit.component.html',
  styleUrl: './list-produit.component.css'
})
export class ListProduitComponent implements OnInit {
  // Attributs
  public produits: any = [];
  public searchInput = "";
  public urlBaseImage = this.service.urlBaseImage;
  public pageActuelle: number = 1;
  public articlesParPage: number = 8;

  // Methodes
  constructor(private service: AllservicesService) {

  }
  ngOnInit(): void {
    this.loadAll();
  }


  loadAll() {

    this.service.get("api/getProduitsByCommercant", (reponse: any) => {
      console.log(reponse);
      this.produits = reponse.data;
    });
  }
  search() {
    return this.produits.filter((prod: any) => prod.nom_produit.toLowerCase().includes(this.searchInput.toLowerCase()));
  }

  suppression(produitId: any) {
    Swal.fire({
      title: "Etes vous sûr ",
      text: "Cette action est irréversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteFunction("api/produit/" + produitId, (reponse: any) => {
          if (reponse.status == 200) {
            // alert("fait");
            this.service.message('Parfait', 'success', 'Suppression faite avec succès');
            this.loadAll();
            console.log(reponse);
            console.warn('idTodel', produitId);
          } else {

            this.service.message('Oops', 'error', 'Suppression échouée');
            console.log(reponse);
            // alert("pas fait");
          }
        });
      }
    });


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
}
