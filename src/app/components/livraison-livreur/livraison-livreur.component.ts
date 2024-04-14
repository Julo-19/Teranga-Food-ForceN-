import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AllservicesService } from '../../services/allservices.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-livraison-livreur',
  standalone: true,
  imports: [
    DataTablesModule,
    DatePipe
  ],
  templateUrl: './livraison-livreur.component.html',
  styleUrl: './livraison-livreur.component.css'
})
export class LivraisonLivreurComponent implements OnInit{
  // Attributs
  dtOptions: DataTables.Settings = {};
  public livraisons:any[]=[];
  // public livraisons:any[]=[
  //   {
  //     date_commande: "12-10-2023",
  //     vendeurs: [
  //       {
  //         numero: "778286795",
  //         adresse: "mbao"
  //       },
  //       {
  //         numero: "754129632",
  //         adresse: "pikine"
  //       }
  //     ],
  //     client: {
  //       numero: "779653241",
  //       adresse: "yoff"
  //     },
  //     etat: "en cours"
  //   },
  //   {
  //     date_commande: "15-11-2023",
  //     vendeurs: [
  //       {
  //         numero: "779865432",
  //         adresse: "ouakam"
  //       },
  //       {
  //         numero: "756241389",
  //         adresse: "dakar"
  //       }
  //     ],
  //     client: {
  //       numero: "778945612",
  //       adresse: "almedies"
  //     },
  //     etat: "terminée"
  //   },
  //   {
  //     date_commande: "22-12-2023",
  //     vendeurs: [
  //       {
  //         numero: "771234567",
  //         adresse: "grand yoff"
  //       },
  //       {
  //         numero: "756123489",
  //         adresse: "fann"
  //       }
  //     ],
  //     client: {
  //       numero: "775698745",
  //       adresse: "medina"
  //     },
  //     etat: "en attente"
  //   },
  //   {
  //     date_commande: "03-01-2024",
  //     vendeurs: [
  //       {
  //         numero: "778965432",
  //         adresse: "parcelles assainies"
  //       },
  //       {
  //         numero: "756241389",
  //         adresse: "dakar"
  //       }
  //     ],
  //     client: {
  //       numero: "778945612",
  //       adresse: "sacre coeur"
  //     },
  //     etat: "en cours"
  //   },
  //   {
  //     date_commande: "10-02-2024",
  //     vendeurs: [
  //       {
  //         numero: "779654321",
  //         adresse: "niarry tally"
  //       },
  //       {
  //         numero: "756241389",
  //         adresse: "dakar"
  //       }
  //     ],
  //     client: {
  //       numero: "778945612",
  //       adresse: "liberte 6"
  //     },
  //     etat: "terminée"
  //   },
  //   {
  //     date_commande: "18-03-2024",
  //     vendeurs: [
  //       {
  //         numero: "771234567",
  //         adresse: "grand yoff"
  //       },
  //       {
  //         numero: "756123489",
  //         adresse: "fann"
  //       }
  //     ],
  //     client: {
  //       numero: "775698745",
  //       adresse: "liberte 5"
  //     },
  //     etat: "en cours"
  //   },
  //   {
  //     date_commande: "25-04-2024",
  //     vendeurs: [
  //       {
  //         numero: "778965432",
  //         adresse: "parcelles assainies"
  //       },
  //       {
  //         numero: "756241389",
  //         adresse: "dakar"
  //       }
  //     ],
  //     client: {
  //       numero: "778945612",
  //       adresse: "sacre coeur"
  //     },
  //     etat: "en attente"
  //   },
  //   {
  //     date_commande: "02-05-2024",
  //     vendeurs: [
  //       {
  //         numero: "779654321",
  //         adresse: "niarry tally"
  //       },
  //       {
  //         numero: "756241389",
  //         adresse: "dakar"
  //       }
  //     ],
  //     client: {
  //       numero: "778945612",
  //       adresse: "liberte 6"
  //     },
  //     etat: "en cours"
  //   },
  //   {
  //     date_commande: "19-06-2024",
  //     vendeurs: [
  //       {
  //         numero: "771234567",
  //         adresse: "grand yoff"
  //       },
  //       {
  //         numero: "756123489",
  //         adresse: "fann"
  //       }
  //     ],
  //     client: {
  //       numero: "775698745",
  //       adresse: "liberte 5"
  //     },
  //     etat: "terminée"
  //   },
  //   {
  //     date_commande: "28-07-2024",
  //     vendeurs: [
  //       {
  //         numero: "778965432",
  //         adresse: "parcelles assainies"
  //       },
  //       {
  //         numero: "756241389",
  //         adresse: "dakar"
  //       }
  //     ],
  //     client: {
  //       numero: "778945612",
  //       adresse: "sacre coeur"
  //     },
  //     etat: "en attente"
  //   }
  // ];


// Methodes
constructor(private service:AllservicesService){

}
ngOnInit(): void {
  this.dtOptions = {
    searching: true,
    lengthChange: false,
    paging: true,
    info: false,
    pageLength: 4,
    language: {
      url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
    }
  };
this.loadLivraisons();
 
}


loadLivraisons(){
  this.service.get('api/listeCommandeAffecter',((reponse:any)=>{
    console.warn(reponse);
    this.livraisons=reponse.data;
    console.table(this.livraisons);
  }));
}
changerEtatCommande(){
  this.service.get('api/ChangerStatut',((reponse:any)=>{
    console.warn(reponse);
    this.loadLivraisons();
  }));
}
}
