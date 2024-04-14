import { Component, OnInit } from '@angular/core';
import { AllservicesService } from '../../../services/allservices.service';

@Component({
  selector: 'app-accueil-admin',
  standalone: true,
  imports: [],
  templateUrl: './accueil-admin.component.html',
  styleUrl: './accueil-admin.component.css'
})
export class AccueilAdminComponent implements OnInit{

  // Attributs
  public nbrVendeurs=0;
  public nbrClients=0;
  public nbrVentes=0;
  public nbrLivraisons=0;


  // Methodes
  constructor(private service:AllservicesService){

  }
  ngOnInit(): void {
    this.service.get('api/ListeUtilisateur',((reponse:any)=>{
      // console.warn(reponse);
      // this.listeUtilisateurs=reponse.users;
      reponse.users.forEach((element:any) => {
        if (element.type=='client') {
          this.nbrClients++;
        }else if (element.type=='commercant') {
          this.nbrVendeurs++;
        }
      });
    }));
    this.service.get('api/NombreVente',((reponse:any)=>{
     this.nbrVentes=reponse.data;
    }));


    this.service.get('api/commandes', ((reponse: any) => {
      // console.log(reponse);
      reponse.data.forEach((element:any) => {
        // console.log(element.Etat);
        if (element.Etat=='en_attente') {
          // console.log(element.Etat);
          this.nbrLivraisons++;
        }
      });
      // this.commandes = reponse.data;
    }));
  }

}
