import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AllservicesService } from '../../../services/allservices.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-produit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-produit.component.html',
  styleUrl: '../add-produit/add-produit.component.css'
})
export class EditProduitComponent {
  // Attributs
  public categories: any = [];
  // public file="";
  public nom = "";
  public quantite = "";
  public categorie_id = "";
  public commercant_id = this.service.idOnline();
  public image!: File;
  public prix = "";
  public descripiton = "";
  public produit:any;

  // Methodes
  constructor(private service: AllservicesService, private activatedRouter: ActivatedRoute,private router:Router) {

  }
  ngOnInit(): void {
    this.service.get("api/categories", (reponse: any) => {
      this.categories = reponse.data;
      console.log(reponse.data);
    });

    this.service.simplePost("api/Detailsproduits/" + this.activatedRouter.snapshot.params['id'], (reponse: any) => {
      this.produit = reponse.data;
      console.log("details", reponse.data);
      this.nom = this.produit.nom_produit;
      this.quantite = this.produit.quantite;
      this.categorie_id = this.produit.id_categorie;
      // this.image: any;
      this.prix = this.produit.prix;
      this.descripiton = this.produit.description;
    });
  }

  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  // ajout d'un produit
  ajouter() {
    if (this.nom == "" || this.quantite == "" || this.descripiton == "" || this.prix == "" || this.quantite == "") {
      this.service.message("Désolé", "error", "Veuillez renseigner tous les champs");
    } else {
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("nom_produit", this.nom);
      formData.append("quantite", this.quantite);
      formData.append("categorie_id", this.categorie_id);
      formData.append("commercant_id", this.commercant_id);
      formData.append("description", this.descripiton);
      formData.append("prix", this.prix);

      // let produit=new Produit(this.nom,this.quantite,this.prix,this.descripiton,2,2,formData);
      console.log("produit", formData);
      this.service.post('api/produit/update/'+this.activatedRouter.snapshot.params['id'], formData, (reponse: any) => {
        if (reponse.status == 200) {
          console.log('success', reponse);
          this.router.navigate(['/listProduit']);
          this.service.message("Parfait!!!", "success", "Modification faite avec succès");
        } else {
          console.log('error ', reponse);
          this.service.message("Désolé!!!", "error", "Modification échouée, vérifier la saisie ");
        }
      });
    }
  }
}
