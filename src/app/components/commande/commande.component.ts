import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AllservicesService } from '../../services/allservices.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [
    DataTablesModule,
    DatePipe,
    RouterLink
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit {

  // Attributs
  dtOptions: DataTables.Settings = {};
  public commandes: any[] = [];
  public produitCommandes: any[] = [];
  public urlBaseImage = this.service.urlBaseImage;

  // Methodes
  constructor(private service: AllservicesService) {

  }
  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 6,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      }
    };
    this.service.get('api/listeCommande', ((reponse: any) => {
      console.log(reponse);
      this.commandes = reponse.data;
    }));

  }

  showVente(id: number) {
    this.service.get("api/showCommande/" + id, ((reponse: any) => {
      console.warn(reponse);
      this.produitCommandes = reponse.data;
    }));
  }

  postPanier(produit:any){
    this.service.postToPanier(produit);
   }
}
