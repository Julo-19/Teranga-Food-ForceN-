import { Component } from '@angular/core';
import { AllservicesService } from '../../../services/allservices.service';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [
    DataTablesModule,
    FormsModule

  ],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent {
  // Attributs
  dtOptions: DataTables.Settings = {};
  public categories:any[]=[];
  public categorie="";





  // Methodes
  constructor(private service:AllservicesService){

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
    this.loadAllCategories();
  }

  loadAllCategories(){
    this.service.get("api/NombreproduitsByCategorie",((reponse:any)=>{
      this.categories=reponse.data;
      console.log(this.categories);
    }));
  }

  envoyer(){
    if (this.categorie=="") {
      this.service.message('Oops','error','Veuillez renseigner le champs');
    }else{

      this.service.post("api/categorie/create",{nom_categorie:this.categorie},((reponse:any)=>{
        if (reponse.status==200) {
          this.service.message('Parfait','success','Ajout fait avec succès');
          this.loadAllCategories();
        }else{
          this.service.message('Oops','error','Ajout échoué');

        }
      }))
    }
  }
}
