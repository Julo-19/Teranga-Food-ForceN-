import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AllservicesService } from '../../../services/allservices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [
    DataTablesModule
  ],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit {
  // Attributs

  dtOptions: DataTables.Settings = {};
  public listeUtilisateurs: any[] = [];




  // Methodes
  constructor(private service: AllservicesService) {

  }
  ngOnInit(): void {
    this.loadAllUtilisateur();

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
  }

  loadAllUtilisateur() {
    this.service.get('api/ListeUtilisateur', ((reponse: any) => {
      console.warn(reponse);
      this.listeUtilisateurs = reponse.users;
    }));
  }

  bloquerUtilisateur(id: number) {
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

        this.service.get("api/bloquerUtilisateur/" + id, ((reponse: any) => {
          console.log(reponse);
          if (reponse.status == 200) {
            this.service.message('Parfait', 'success', reponse.message);
            // this.showProduitSignaler(this.produitSignale.id);
            this.loadAllUtilisateur();
          }
        }));

      }
    });
  }

}
