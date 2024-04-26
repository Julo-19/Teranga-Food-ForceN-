import { Component, OnInit } from '@angular/core';
import { Commerçant } from '../../models/commerçant';
import { AllservicesService } from '../../services/allservices.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: '../../auth/inscription/inscription.component.css'
})
export class ProfileComponent implements OnInit {
  // Attributs
  public prenom = "";
  public nom = "";
  public telephone  = "";
  public adresse = "";
  // public image = "";
  public email  = "";
  public password = "";
  public user: any;
  public confirmPass = "";
  public showHidePassword: any;
  public isConfirmInputAllowed = false;


  // Methodes
  constructor(private service: AllservicesService, private router: Router) {

  }
  ngOnInit(): void {
    this.loadProfil();
    this.showPassword();
  }

  loadProfil() {
    if (this.whoIsOnline() == "commercant") {
      // alert("commmercant")
      this.service.get('api/showCommercant', (reponse: any) => {
        console.log("user", reponse);
        this.nom = reponse.commercant.nom;
        this.prenom = reponse.commercant.prenom;
        this.email = reponse.commercant.email;
       
        this.telephone = reponse.commercant.numero_tel;

        this.adresse = reponse.commercant.adresse;
      });
    } else if (this.whoIsOnline() == "client") {
      // alert("client")
      this.service.get('api/showClient', (reponse: any) => {
        console.log("user", reponse);
        this.nom = reponse.client.nom;
        this.prenom = reponse.client.prenom;
        this.email = reponse.client.email;
        this.telephone = reponse.client.numero_tel;
        this.adresse = reponse.client.adresse;
      });

    } else if (this.whoIsOnline() == "livreur") {
      // alert("client")
      this.service.get('api/showLivreur', (reponse: any) => {
        console.log("user", reponse);
        this.nom = reponse.livreur.nom;
        this.prenom = reponse.livreur.prenom;
        this.email = reponse.livreur.email;
        this.telephone = reponse.livreur.numero_tel;
        this.adresse = reponse.livreur.adresse;
        // this.image = reponse.livreur.image;
      });

    }
  }
  // la fonction qui permet d'inscrire un utilisateur
  modification() {
    if (this.isConfirmInputAllowed) {
      if (this.service.whoIsOnline() == 'commercant') {

        this.service.post('api/modifierPasswordCommercant', { password: this.password }, ((reponse: any) => {
          console.log('pass change', reponse);
          if (reponse.status == 200) {
            document.getElementById('ConfirmPasseInput')!.innerHTML = '';
            document.getElementById('validationPasse')!.innerHTML = '';

            this.service.message('Parfait', 'success', 'modification faite avec succès');
            this.password = "";
            this.confirmPass = "";
          }
        }));
      } else if (this.service.whoIsOnline() == 'client') {
        this.service.post('api/modifierPasswordClient', { password: this.password }, ((reponse: any) => {
          console.log('pass change', reponse);
          if (reponse.status == 200) {
            this.service.message('Parfait', 'success', 'modification faite avec succès');
            this.password = "";
            this.confirmPass = "";
          }
        }));

      } else if (this.service.whoIsOnline() == 'livreur') {
        this.service.post('api/modifierPasswordLivreur', { password: this.password }, ((reponse: any) => {
          console.log('pass change', reponse);
          if (reponse.status == 200) {
            this.service.message('Parfait', 'success', 'modification faite avec succès');
            this.password = "";
            this.confirmPass = "";
          }
        }));

      }
    } else {

      if (this.nom == "" || this.prenom == "") {
        this.service.message("Désolé", "error", "Veuillez renseigner tous les champs");
      } else {
        // this.user = new Commerçant(this.nom, this.prenom, this.email, this.image, this.telephone, this.image);
        this.user = new Commerçant(this.nom, this.prenom, this.telephone, this.adresse, this.email,  this.password);
        console.log("user", this.user);
        this.service.post('api/modifierInfoCommercant', this.user, (reponse: any) => {
          if (reponse.status == 200) {
            this.service.message("Parfait", "success", "Profil modifié avec succès");

            this.loadProfil();

          } else {
            console.log('error ', reponse);
            this.service.message("Désolé!!!", "error", "modification a échouée, vérifier la saisie");
          }
        });
      }
    }
  }



  whoIsOnline() {
    return this.service.whoIsOnline();
  }

  showPassword() {
    this.showHidePassword = document.querySelectorAll('#passwordInput');
    this.showHidePassword.forEach((element: any) => {

      if (element.type == 'text') {
        element.type = 'password';
      } else {
        element.type = 'text';
      }
    });
  }

  isPassConforme() {
    let validationPrenom = document.getElementById('ConfirmPasseInput');

    if (this.password == this.confirmPass && this.password != "") {
      validationPrenom!.innerHTML = 'Conforme';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
    } else {
      validationPrenom!.innerHTML = 'Pas conforme';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
    }
    if (this.password == "") {
      validationPrenom!.innerHTML = '';

    }
  }

  passeValidate() {
    let validationPrenom = document.getElementById('validationPasse');
    const nomPrenomRegex = /^[a-zA-Z]+[a-z0-9-@_&]{7,}$/;
    if (nomPrenomRegex.test(this.password)) {
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      this.isConfirmInputAllowed = true;

    } else {
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      this.isConfirmInputAllowed = false;

    }
    if (this.password == "") {
      validationPrenom!.innerHTML = "";
    }
    this.isPassConforme();

  }

}
