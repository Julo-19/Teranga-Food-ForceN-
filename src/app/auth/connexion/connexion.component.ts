import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { AllservicesService } from '../../services/allservices.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
// import * as cryptoJs from 'crypto-js';
@Component({
  selector: 'app-connexion',
  standalone: true,
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
  imports: [
    FooterComponent,
    FormsModule
  ]
})
export class ConnexionComponent {
  // Attributs
  public password = "";
  public email = "";
  public showHidePassword: any;
  public truthyTab: any[] = [];
  public loginTryNumber=0;

  // Methodes
  constructor(private service: AllservicesService, private router: Router) {

  }

  // la fonction qui permet d'inscrire un utilisateur
  connexion() {
    if (this.password == "" || this.email == "" || this.truthyTab.length < 2) {
      this.service.message("Désolé", "error", "Veuillez renseigner tous les champs");
    } else {

      this.service.post('api/auth/login', { email: this.email, password: this.password }, (reponse: any) => {
        if (reponse.status == 200) {
          let onlineUser = {
            token: reponse.authorization.token,
            id: reponse.user.id,
            type: reponse.user.type
          }
          // console.warn("logged user", reponse);
          localStorage.setItem("onlineUser", JSON.stringify(onlineUser));
          localStorage.setItem("tokenExpiryTime", JSON.stringify(10000));
          if (reponse.user.type == "admin") {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/accueil']);
          }
          this.service.message("Bienvenue " + reponse.user.prenom + " " + reponse.user.nom, "success", "Connexion faite avec succès");
          // this.deconnexionAutomatique();
          // console.log("reponse conn",reponse);
        } else {
          console.log('error ', reponse);
          if (reponse.status == 405) {
            this.service.message("Désolé!!!", "error", "Connexion  échouée, Compte bloqué veuillez contacter l'admin par la page contact");
          } else {
            // this.service.message("Désolé!!!", "error", "connexion  échouée, vérifier la saisie ");
            if (reponse.errorsList) {
              this.service.message("Désolé!!!", "error", "Connexion  échouée, vérifier la saisie => " + Object.values(reponse.errorsList).join('--'));
            } else {
              this.service.message("Désolé!!!", "error", "connexion  échouée, vérifier la saisie ");
            }
            this.loginTryNumber++;
            if (this.loginTryNumber==3) {
              this.loginTryNumber=0;
                Swal.fire({
                  title: "Vous avez oublié votre mot de passe ? ",
                  text: "Voulez vous réinitialiser votre mot de passe ?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Oui",
                  cancelButtonText: "Non"
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.service.post("api/verifMail",{email:this.email},((reponse:any)=>{
                      console.log('pass init rep',reponse);
                      if (reponse.status==200) {
                        Swal.fire({
                          title: 'Parfait',
                          text: 'Veuillez vérifier votre boite mail pour continuer la réinitialisation',
                          icon: 'success'
                        });

                      }else{

                        Swal.fire({
                          title: 'Oops',
                          text: 'Le mail fournit n\'existe pas,donc réinitialisation pas possible',
                          icon: 'error'
                        });
                      }
                    }));
                    // this.service.message("Parfait", "success", "Veuillez vérifier votre boite mail pour la porsuite de la réinitialisation");
                  } else {
                    // this.service.message("Oops", "warning", "Réinitialisation annulée");
                    Swal.fire({
                      title: 'Oops',
                      text: 'Réinitialisation annulée',
                      icon: 'warning'
                    });
                  }
                });
            }
          }
        }
      });
    }
  }

  showPassword() {
    this.showHidePassword = document.getElementById('passwordInput');
    if (this.showHidePassword.type == 'text') {
      this.showHidePassword.type = 'password';
    } else {
      this.showHidePassword.type = 'text';
    }
  }



  deconnexionAutomatique() {
    setTimeout(() => {
      if (this.service.IsOnline()) {
        Swal.fire({
          title: "Session expirée ",
          text: "Voulez vous renouvellez votre session, sinon vous serez déconnectez",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui",
          cancelButtonText: "Non"
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("onlineUser");
            this.router.navigate(['/connexion']);
            // this.deconnexionAutomatique();
          } else {
            localStorage.removeItem("onlineUser");
            this.service.message("Au revoir", "success", "Déconnexion faite avec succès");
          }
        });
      }
    }, 10000);
  }

  // validation
  emailValidate() {

    let validationEmail = document.getElementById('validationEmail');
    const emailRegexGegin = /^[a-zA-Z]+[.a-z0-9]+@[a-z]+[.]{1}[a-z]{2,3}$/;

    // this.emailError = emailRegexGegin.test(this.email);
    if (emailRegexGegin.test(this.email)) {
      // console.log(emailRegexGegin.test(this.email));
      validationEmail!.innerHTML = 'valide';
      validationEmail!.classList.remove('error');
      validationEmail!.classList.add('success');
      if (this.truthyTab.find((value: any) => value.email == true) == undefined) {
        this.truthyTab.push({ email: true });
      }
      console.log(this.truthyTab);
    } else {
      // console.log(emailRegexGegin.test(this.email));
      validationEmail!.innerHTML = 'invalide';
      validationEmail!.classList.remove('success');
      validationEmail!.classList.add('error');
      if (this.truthyTab.find((value: any) => value.email == true) != undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value: any) => value.email == true), 1);
      }

    }
    if (this.email == "") {
      validationEmail!.innerHTML = "";
    }
    // console.log(this.truthyTab);
  }


  passeValidate() {
    let validationPrenom = document.getElementById('validationPasse');
    const nomPrenomRegex = /^[a-zA-Z]+[a-z0-9-@_&]{7,}$/;
    if (nomPrenomRegex.test(this.password)) {
      // console.log(nomPrenomRegex.test(this.pass));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (this.truthyTab.find((value: any) => value.passe == true) == undefined) {
        this.truthyTab.push({ passe: true });
      }

    } else {
      // console.log(nomPrenomRegex.test(this.pass));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (this.truthyTab.find((value: any) => value.passe == true) != undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value: any) => value.passe == true), 1);
      }
    }
    if (this.password == "") {
      validationPrenom!.innerHTML = "";
    }
    // console.log(this.truthyTab);
    // console.log(this.truthyTab.length);
  }
}
