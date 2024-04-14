import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AllservicesService } from '../../services/allservices.service';

@Component({
  selector: 'app-confirm-command',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './confirm-command.component.html',
  styleUrl: './confirm-command.component.css'
})
export class ConfirmCommandComponent implements OnInit {
  // Attributs
  public nombreArticles: number = 0;
  public sommeArticles: number = 0;
  public prixLivraion = this.service.prixLivraion;
  public panierProduits: any[] = [];
  public urlBaseImage=this.service.urlBaseImage;

  public profile={
    nom:"",
    adresse:"",
    numero:""
  };



  // Methodes
  constructor(private service: AllservicesService) {

  }
  ngOnInit(): void {
    this.totalArticles();
    this.loadProfile();
  }

  totalArticles() {
    this.nombreArticles = 0;
    this.sommeArticles = 0;
    this.panierProduits = this.service.getFromPanier();
    this.panierProduits.forEach((element: any) => {
      this.nombreArticles += element.quantitePanier;
      this.sommeArticles += element.quantitePanier * element.produit.prix;
    });

  }

  loadProfile(){
    if (this.service.whoIsOnline()=='commercant') {

      this.service.get('api/showCommercant',((reponse:any)=>{
        console.log(reponse);
      }));
    }else if (this.service.whoIsOnline()=='client') {

      this.service.get('api/showClient',((reponse:any)=>{
        console.log(reponse);
        this.profile.adresse=reponse.client.adresse;
        this.profile.nom=reponse.client.prenom+" "+reponse.client.nom;
        this.profile.numero=reponse.client.numero_tel;

      }));
    }
  }

  payer() {
    let panier = this.service.getFromPanier();
    let panierProduit: any[] = [];

    panier.forEach((element: any) => {
      panierProduit.push({
        produit_id: element.produit.id,
        nombre_produit: element.quantitePanier,
        montant: element.produit.prix*element.quantitePanier
      });
    });
    let panierToSend = {
      panier: panierProduit
    }
    console.log(panierToSend);
    this.service.post("api/passerCommande", panierToSend, ((reponse: any) => {
      console.warn(reponse);
      this.service.clearPanier();
      window.open(reponse.payment_url,"_self");
    }));
  }

}
