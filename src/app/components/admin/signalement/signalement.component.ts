import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AllservicesService } from '../../../services/allservices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signalement',
  standalone: true,
  imports: [
    DataTablesModule
  ],
  templateUrl: './signalement.component.html',
  styleUrl: './signalement.component.css'
})
export class SignalementComponent implements OnInit {
  // /Attributs
  dtOptions: DataTables.Settings = {};
  public signalements: any[] = [];
  public urlBaseImage = this.service.urlBaseImage;
  // public nom_client="";
  // public id_produit_signaler="";
  // public image="";
  // public motif="";
  // public prix="";
  // public nom_produit="";
  // public email_commercant="";
  public produitSignale: any = {
    nom_client: "",
    etat: "",
    id: "",
    image: "",
    motif: "",
    prix: "",
    nom_produit: "",
    email_commercant: "",
    id_produit: "",
    nom_commercant: "",
    numero_commercant: "",

  };


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
    this.loadProduitSignaler();
  }

  loadProduitSignaler(){

    this.service.get('api/ListeProduitSignaler', ((reponse: any) => {
      console.log(reponse);
      this.signalements = reponse.data;
    }));
  }

  showProduitSignaler(id: any) {
    this.service.get('api/voirProduitSignaler/' + id, ((reponse: any) => {
      console.warn(reponse);
      this.produitSignale = {
        nom_client: reponse.data.Client,
        etat: reponse.data.Etat,
        id: reponse.data.Id,
        image: reponse.data.Image,
        motif: reponse.data.Motif,
        prix: reponse.data.Prix,
        nom_produit: reponse.data.Produit,
        email_commercant: reponse.data.email_commercant,
        id_produit: reponse.data.idProduit,
        nom_commercant: reponse.data.prenom_commercant + " " + reponse.data.nom_commercant,
        numero_commercant: reponse.data.numero_commercant,

      }
    }));
  }

  bloquerPRoduitSignaler() {
    Swal.fire({
      title: "Etes vous sûr ",
      text: "De vouloir faire cette action",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non"
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.get("api/bloquerProduitSignaler/" + this.produitSignale.id, ((reponse: any) => {
          console.log(reponse);
          if (reponse.status==200) {
            this.service.message('Parfait','success',reponse.status_message);
            this.showProduitSignaler(this.produitSignale.id);
          }
        }));
        this.loadProduitSignaler();
      }
    });

  }
}
