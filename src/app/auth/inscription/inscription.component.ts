import { Component } from '@angular/core';
import { AllservicesService } from '../../services/allservices.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Commerçant } from '../../models/commerçant';
import { NgClass } from '@angular/common';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgClass
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  // Attributs
  public prenom = "";
  public nom = "";
  public telephone = "";
  public adresse = "";
  public email = "";
  public password = "";
  // public image = "";
  public user: any;
  public displayForme = false;
  public formType = false;
  public showHidePassword: any;
  public emailError: any;
  public detectedInputError = true;
  public validationCompter = 0;
  public truthyTab:any[]=[];

  // Methodes
  constructor(private service: AllservicesService, private router: Router) {

  }
  // la fonction qui permet d'inscrire un utilisateur
  inscription(chemin: any) {
    // alert(chemin);
    if (this.prenom == "" || this.nom == "" || this.telephone == "" || this.adresse == ""  || this.email == "" ||  this.password == "" || this.truthyTab.length<6) {
      this.service.message("Désolé", "error", "Veuillez renseigner tous les champs");
    } else {
      this.user = new Commerçant(this.prenom, this.nom, this.telephone, this.adresse, this.email,  this.password);
      // console.log("user", this.user);
      this.service.post(chemin, this.user, (reponse: any) => {
        if (reponse.status == 200) {
          // console.log('success', reponse);
          this.router.navigate(['/connexion']);
         
          this.service.message("Merci!!!", "success", "Inscription faite avec succès,Veuillez vous connecter");
        } else {
          console.table(reponse.errorsList);
          // console.log('error ', reponse);
          // console.log('error eclaté', Object.values(reponse.errorsList));
          // this.service.message("Désolé!!!", "error", "Inscription a échouée, vérifier la saisie =>"+Object.values(reponse.errorsList));
          if (reponse.errorsList) {

            this.service.message("Désolé!!!", "error", "Inscription  échouée, vérifier la saisie => " + Object.values(reponse.errorsList).join('--'));
          } else {

            this.service.message("Sorry!!!", "error", "Inscription  échouée, vérifier la saisie ");
          }
        }
      });
    }
  }
  // gerer le formulaire selon le type d'inscription
  formTypeDisplay(type: boolean) {
    this.displayForme = true;
    this.formType = type;
  }

  // retour sur choix de l'inscription
  getBackChoice() {
    this.displayForme = false;
  }


  showPassword() {
    this.showHidePassword = document.getElementById('passwordInput');
    if (this.showHidePassword.type == 'text') {
      this.showHidePassword.type = 'password';
    } else {
      this.showHidePassword.type = 'text';
    }
  }

  // validations

  emailValidate() {
    let validationEmail = document.getElementById('validationEmail');
    const emailRegexGegin = /^[a-zA-Z]+[.a-z0-9]+@[a-z]+[.]{1}[a-z]{2,3}$/;
    // const emailRegexEnd = /^[a-z]{2,}$/;
    this.emailError = emailRegexGegin.test(this.email);
    if (emailRegexGegin.test(this.email) ) {
      // console.log(emailRegexGegin.test(this.email));
      validationEmail!.innerHTML = 'valide';
      validationEmail!.classList.remove('error');
      validationEmail!.classList.add('success');
      if (this.truthyTab.find((value:any)=>value.email==true)==undefined) {
        this.truthyTab.push({email:true});
      }
      console.log(this.truthyTab);
    } else {
      // console.log(emailRegexGegin.test(this.email));
      validationEmail!.innerHTML = 'invalide';
      validationEmail!.classList.remove('success');
      validationEmail!.classList.add('error');
      if (this.truthyTab.find((value:any)=>value.email==true)!=undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.email==true),1);
      }

    }
    if (this.email=="") {
      validationEmail!.innerHTML="";
    }
    // console.log(this.truthyTab);
  }

  nomValidate() {
    let validationNom = document.getElementById('validationNom');

    const nomPrenomRegex = /^[a-zA-Z]{2,25}$/;
    if (nomPrenomRegex.test(this.nom)) {
      // console.log(nomPrenomRegex.test(this.nom));
      validationNom!.innerHTML = 'valide';
      validationNom!.classList.remove('error');
      validationNom!.classList.add('success');
      if (this.truthyTab.find((value:any)=>value.nom==true)==undefined) {
        this.truthyTab.push({nom:true});
      }

    } else {
      // console.log(nomPrenomRegex.test(this.nom));
      validationNom!.innerHTML = 'invalide';
      validationNom!.classList.remove('success');
      validationNom!.classList.add('error');
      if (this.truthyTab.find((value:any)=>value.nom==true)!=undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.nom==true),1);
      }
    }
    if (this.nom=="") {
      validationNom!.innerHTML="";
    }
  }
  prenomValidate() {
    let validationPrenom = document.getElementById('validationPrenom');
    const nomPrenomRegex = /^[a-zA-Z]{2,25}$/;
    if (nomPrenomRegex.test(this.prenom)) {
      // console.log(nomPrenomRegex.test(this.prenom));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (this.truthyTab.find((value:any)=>value.prenom==true)==undefined) {
        this.truthyTab.push({prenom:true});
      }
    } else {
      // console.log(nomPrenomRegex.test(this.prenom));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (this.truthyTab.find((value:any)=>value.prenom==true)!=undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.prenom==true),1);
      }
    }
    if (this.prenom=="") {
      validationPrenom!.innerHTML="";
    }
  }

  telephoneValidate() {
    let validationPrenom = document.getElementById('validationTelephone');
    const nomPrenomRegex = /^(77|76|75|78|33)[0-9]{7}$/;
    if (nomPrenomRegex.test(this.telephone)) {
      // console.log(nomPrenomRegex.test(this.numero));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (this.truthyTab.find((value:any)=>value.telephone==true)==undefined) {
        this.truthyTab.push({telephone:true});
      }

    } else {
      // console.log(nomPrenomRegex.test(this.numero));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (this.truthyTab.find((value:any)=>value.telephone==true)!=undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.telephone==true),1);
      }
    }
    if (this.telephone=="") {
      validationPrenom!.innerHTML="";
    }
  }
  // ninValidate() {
  //   let validationPrenom = document.getElementById('validationNIN');
  //   const nomPrenomRegex = /^[0-9]{10,15}$/;
  //   if (nomPrenomRegex.test(this.nin)) {
  //     // console.log(nomPrenomRegex.test(this.nin));
  //     validationPrenom!.innerHTML = 'valide';
  //     validationPrenom!.classList.remove('error');
  //     validationPrenom!.classList.add('success');
  //     if (this.truthyTab.find((value:any)=>value.nin==true)==undefined) {
  //       this.truthyTab.push({nin:true});
  //     }

  //   } else {
  //     // console.log(nomPrenomRegex.test(this.nin));
  //     validationPrenom!.innerHTML = 'invalide';
  //     validationPrenom!.classList.remove('success');
  //     validationPrenom!.classList.add('error');
  //     if (this.truthyTab.find((value:any)=>value.nin==true)!=undefined) {
  //       this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.nin==true),1);
  //     }
  //   }
  //   if (this.nin=="") {
  //     validationPrenom!.innerHTML="";
  //   }
  // }

  adresseValidate() {
    let validationPrenom = document.getElementById('validationAdresse');
    const nomPrenomRegex = /^[a-zA-Z]+[a-z0-9]{3,}$/;
    if (nomPrenomRegex.test(this.adresse)) {
      // console.log(nomPrenomRegex.test(this.adresse));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (this.truthyTab.find((value:any)=>value.adresse==true)==undefined) {
        this.truthyTab.push({adresse:true});
      }

    } else {
      // console.log(nomPrenomRegex.test(this.adresse));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (this.truthyTab.find((value:any)=>value.adresse==true)!=undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.adresse==true),1);
      }
    }
    if (this.adresse=="") {
      validationPrenom!.innerHTML="";
    }
  }

  passeValidate() {
    let validationPrenom = document.getElementById('validationPasse');
    const nomPrenomRegex = /^[a-zA-Z]+[a-z0-9-@_&]{7,}$/;
    if (nomPrenomRegex.test(this.password)) {
      // console.log(nomPrenomRegex.test(this.pass));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (this.truthyTab.find((value:any)=>value.passe==true)==undefined) {
        this.truthyTab.push({passe:true});
      }

    } else {
      // console.log(nomPrenomRegex.test(this.pass));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (this.truthyTab.find((value:any)=>value.passe==true)!=undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.passe==true),1);
      }
    }
    if (this.password=="") {
      validationPrenom!.innerHTML="";
    }
    // console.log(this.truthyTab);
    // console.log(this.truthyTab.length);
  }

  genreValidate() {

      if (this.truthyTab.find((value:any)=>value.genre==true)==undefined) {
        this.truthyTab.push({genre:true});
      }


  }

  dateValidate() {
    let validationPrenom = document.getElementById('validationNaissance');
    let inputDate = document.getElementById('inputDate');
    console.warn(inputDate)
    // inputDate!.ariaValueMax='Thu Feb 22 2005 00:00:00 GMT+0000';
    const nomPrenomRegex = /^[0-9]+[/]+[0-9]+[/]+[0-9]{2005,}$/;
    if (nomPrenomRegex.test(this.password)) {
      // console.log(nomPrenomRegex.test(this.pass));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');


    } else {
      // console.log(nomPrenomRegex.test(this.pass));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');

    }
  }

  // nineaValidate() {
  //   let validationPrenom = document.getElementById('validationNinea');
  //   const nomPrenomRegex = /^[0-9]+[0-9]{8,8}$/;
  //   if (nomPrenomRegex.test(this.ninea)) {
  //     // console.log(nomPrenomRegex.test(this.pass));
  //     validationPrenom!.innerHTML = 'valide';
  //     validationPrenom!.classList.remove('error');
  //     validationPrenom!.classList.add('success');
  //     if (this.truthyTab.find((value:any)=>value.ninea==true)==undefined) {
  //       this.truthyTab.push({ninea:true});
  //     }

  //   } else {
  //     // console.log(nomPrenomRegex.test(this.pass));
  //     validationPrenom!.innerHTML = 'invalide';
  //     validationPrenom!.classList.remove('success');
  //     validationPrenom!.classList.add('error');
  //     if (this.truthyTab.find((value:any)=>value.ninea==true)!=undefined) {
  //       this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.ninea==true),1);
  //     }
  //   }
  //   if (this.ninea=="") {
  //     validationPrenom!.innerHTML="";
  //   }
  //   // console.log(this.truthyTab);
  //   // console.log(this.truthyTab.length);
  // }
}
