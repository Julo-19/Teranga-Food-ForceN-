import { Component, OnInit } from '@angular/core';
import { AllservicesService } from '../../../services/allservices.service';
import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livraison',
  standalone: true,
  imports: [
    DataTablesModule,
    DatePipe,
    FormsModule
  ],
  templateUrl: './livraison.component.html',
  styleUrl: './livraison.component.css'
})
export class LivraisonComponent implements OnInit {
  // Attributs
  public nom = "";
  public numero = "";
  public adresse = "";
  public adresse_vendeurs:any[]=[];
  public livreur_id="";
  public commande_id="";
  public etat_commande="";

  dtOptions: DataTables.Settings = {};
  public livreurs: any[] = [];
  public commandes: any[] = [];

  // Methodes
  constructor(private service: AllservicesService) {

  }
  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 7,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      }
    };
    this.getLivreurs();
    this.loadAllCommands();
  }

  loadAllCommands() {
    this.service.get('api/commandes', ((reponse: any) => {
      console.log(reponse);
      this.commandes = reponse.data;
    }));
  }

  getLivreurs() {
    this.service.get("api/ListerLivreur", ((reponse: any) => {
      console.log(reponse);
      this.livreurs = reponse.data;
    }));
  }

  showCommande(id: any) {
    this.service.get('api/Detailscommandes/' + id, ((reponse: any) => {
      console.warn(reponse);
      this.nom=reponse.data.nom_client;
      this.adresse=reponse.data.adresse_client;
      this.numero=reponse.data.numero_tel;
      this.commande_id=reponse.data.commande_id;
      this.adresse_vendeurs=reponse.data.details_commande;
      this.etat_commande=reponse.data.etat_commande;
      // console.warn(this.commande_id);
    }));

  }

  AffecterLivreur(event:any){
    // console.log(event.target.value)
    this.service.post('api/AffecterLivreur/'+this.commande_id,{livreur_id:+event.target.value},((reponse:any)=>{
      console.warn(reponse);
      this.livreur_id="";
      this.getLivreurs();
      this.loadAllCommands();
    }));
  }
}
