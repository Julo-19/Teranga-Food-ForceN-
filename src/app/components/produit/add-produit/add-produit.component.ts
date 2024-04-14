import { Component, OnInit } from '@angular/core';
import { AllservicesService } from '../../../services/allservices.service';
import { Produit } from '../../../models/produit';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent implements OnInit {
  // Attributs
  public categories:any=[];
  // public file="";
  public nom="";
  public quantite="";
  public categorie_id="";
  public commercant_id=this.service.idOnline();
  public image:any;
  public prix ="";
  public descripiton="";


  // Methodes
  constructor(private service:AllservicesService, private router:Router){

  }
  ngOnInit(): void {
    this.service.get("api/categories",(reponse:any)=>{
      this.categories=reponse.data;
      console.log(reponse.data);
    });
  }

  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  // ajout d'un produit
  ajouter() {
    if (this.nom == "" || this.quantite=="" || this.descripiton=="" || this.prix=="" || this.quantite==""|| this.image==undefined) {
      this.service.message("Désolé", "error", "Veuillez renseigner tous les champs");
    } else {
      let formData=new FormData();
      formData.append("image",this.image);
      formData.append("nom_produit",this.nom);
      formData.append("quantite",this.quantite);
      formData.append("categorie_id",this.categorie_id);
      formData.append("commercant_id",this.commercant_id);
      formData.append("description",this.descripiton);
      formData.append("prix",this.prix);

      // let produit=new Produit(this.nom,this.quantite,this.prix,this.descripiton,2,2,formData);
      console.log("produit",formData);
      this.service.post('api/produit/create',formData, (reponse: any) => {
        if (reponse.status == 200) {
          console.log('success',reponse);
          this.router.navigate(['/listProduit']);
          this.service.message("Parfait!!!", "success", "Ajout avec succès");
        } else {
          console.log('error ',reponse);
          // this.service.message("Désolé!!!", "error", "Ajout échoué, vérifier la saisie ");
          // this.service.message("Désolé!!!", "error", "Ajout échouée, vérifier la saisie =>"+Object.values(reponse.errorsList));
          if (reponse.errorsList) {
            this.service.message("Désolé!!!", "error", "Inscription  échouée, vérifier la saisie => "+Object.values(reponse.errorsList));
          }else{
            this.service.message("Désolé!!!", "error", "Inscription  échouée, vérifier la saisie ");
          }

        }
      });
    }
  }

}
