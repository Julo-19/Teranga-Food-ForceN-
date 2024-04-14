import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AllservicesService } from '../../services/allservices.service';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-details-produit',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CarouselModule,

  ],
  templateUrl: './details-produit.component.html',
  styleUrl: './details-produit.component.css'
})
export class DetailsProduitComponent implements OnInit {


  // Attributs
  public quantite = 1;
  public produit: any;
  public produitSimilaires: any[] = [];
  public note = 0;
  public commentaire = "";
  public commentaires: any[] = [];
  public moyenneNote = 0;
  public urlBaseImage = this.service.urlBaseImage;
  // Methodes
  constructor(private service: AllservicesService, private activatedRouter: ActivatedRoute) {

  }
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef;
  @ViewChild('closeAddExpenseModalSignalement') closeAddExpenseModalSignalement!: ElementRef;
  ngOnInit(): void {
    this.service.simplePost("api/Detailsproduits/" + this.activatedRouter.snapshot.params['id'], (reponse: any) => {
      this.produit = reponse.data;
      console.log("details", reponse.data);
    });
    this.loadCommentaires();
    this.getProduitSimilaires();
  }

  initSimilaire(id: any) {
    this.service.simplePost("api/Detailsproduits/" + id, (reponse: any) => {
      this.produit = reponse.data;
      console.log("details", reponse.data);
    });
    this.loadCommentaires();
    this.getProduitSimilaires();
    // this.ngOnInit();
    // this.getProduitSimilaires();
    this.service.get('api/produitsSimilaire/' + id, ((reponse: any) => {
      console.log('similaires', reponse);
      this.produitSimilaires = reponse.data;
    }));
  }
  loadCommentaires() {
    this.service.get("api/commentaires/" + this.activatedRouter.snapshot.params['id'], ((reponse: any) => {
      this.commentaires = reponse.data;
      console.log('commmentaires', reponse);
      // this.moyenneNote=this.commentaires.reduce((accumulator:any, currentValue:any) => accumulator + currentValue,0)/this.commentaires.length;
      this.commentaires.forEach((element: any) => {
        this.moyenneNote += element.Note;
      });;
      this.moyenneNote=this.moyenneNote/this.commentaires.length;  
      console.log('moy', this.moyenneNote);
    }));

  }
  // gestion de note avec étoile
  noteStar(note: number) {
    let stars = document.querySelectorAll('#star');
    stars.forEach((element: any) => {

      element.classList.remove("bi-star-fill");
      element.classList.add("bi-star");
    });
    for (let i = 0; i < note; i++) {
      stars[i].classList.remove("bi-star");
      stars[i].classList.add("bi-star-fill");
    }
    this.note = note;
  }

  upOrDownQuantity(type: string) {
    // if (this.quantite<1) {
    //   this.quantite=1;
    // }
    if (type == 'up') {
      this.quantite++;
      if (this.quantite > this.produit.quantite) {
        this.quantite--;
        this.service.message("Oops", "warning", `il n'en reste que ${this.produit.quantite} produit en stock`);
      }
    } else {
      this.quantite--;
      if (this.quantite < 1) {
        this.quantite = 1;
      }
    }
  }

  postPanier(produit: any, quantite = 0) {
    this.service.postToPanier(produit, quantite);
    this.refresh(JSON.parse(localStorage.getItem('panier') ?? '[]').length);

  }

  envoyerAvis() {
    if (this.service.IsOnline()) {
      if (this.service.whoIsOnline() == "livreur" || this.service.whoIsOnline() == "commercant") {
        this.service.message('Oop\'s', "warning", "Il vous faut un compte client pour cette action");
      } else {

        // this.router.navigate(['/confirmCommand']);
        if (this.note == 0 || this.commentaire == "") {
          this.service.message("Oop's", "error", "Veuillez vérifier la saisie(pour noter cliquer sur les étoiles)");

        } else {

          let avis = {
            note: this.note,
            commentaire: this.commentaire,
          }
          this.service.post("api/faireCommentaire/" + this.activatedRouter.snapshot.params['id'], avis, ((reponse: any) => {
            console.log("reponse", reponse);


            if (reponse.status == 200) {
              this.service.message("Parfait", "success", "avis envoyé avec succès");
              this.commentaire = "";
              this.note = 0;
              this.closeAddExpenseModal.nativeElement.click();
            } else {

              this.service.message("Parfait", "warning", "envoie échoué, Vérifiez la saisie => " + Object.values(reponse.errorsList).join('--'));
            }
            this.loadCommentaires();
          }));
        }
      }
    } else {
      this.service.message("Oops", "warning", "La connexion est requise pour cette action");

    }
  }


  envoyerSignalement() {
    if (this.service.IsOnline()) {
      if (this.service.whoIsOnline() == "livreur" || this.service.whoIsOnline() == "commercant") {
        this.service.message('Oop\'s', "warning", "Il vous faut un compte client pour cette action");
      } else {

        // this.router.navigate(['/confirmCommand']);
        if (this.commentaire == "") {
          this.service.message("Oop's", "error", "Veuillez saisir le motif du signalement");

        } else {
          let signalement = {
            motif: this.commentaire
          }
          console.log("comm", signalement);
          this.service.post("api/signalerProduit/" + this.activatedRouter.snapshot.params['id'], signalement, ((reponse: any) => {
            console.log("reponse", reponse);
            if (reponse.status == 200) {
              this.service.message("Parfait", "success", "signalment avec succès");
              this.commentaire = "";
              this.closeAddExpenseModalSignalement.nativeElement.click();
            } else {
              this.service.message("Parfait", "warning", "envoie échoué, Vérifiez la saisie => " + Object.values(reponse.errorsList).join('--'));
            }
          }));

        }
      }
    } else {

      this.service.message("Oops", "warning", "La connexion est requise pour cette action");
    }
  }

  getProduitSimilaires() {
    this.service.get('api/produitsSimilaire/' + this.activatedRouter.snapshot.params['id'], ((reponse: any) => {
      console.log('similaires', reponse);
      this.produitSimilaires = reponse.data;
    }));
  }

  // panierItem
  public refresh(number: any) {
    this.service.setRefresh(number);
  }
}
