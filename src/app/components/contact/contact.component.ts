import { Component, OnInit } from '@angular/core';
import { AllservicesService } from '../../services/allservices.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  // Attributs
  public nom = "";
  public email = "";
  public numero = "";
  public message = "";
  public truthyTab:any[]=[];



  // Methodes
  constructor(private service: AllservicesService) {

  }
  ngOnInit(): void {

  }

  envoyer() {
    if (this.nom == "" || this.email == "" || this.numero == "" || this.message == "") {
      this.service.message('Oops', 'error', 'Veuillez renseigner tous les champs');
    } else {
      this.service.post("api/faireFeedback", { nom: this.nom, email: this.email, numero_tel: this.numero, message: this.message }, ((reponse: any) => {
        if (reponse.status == 200) {
          this.nom = "";
          this.email = "";
          this.numero = "";
          this.message = "";
          this.service.message('Parfait', 'success', 'Envoie fait avec succès');
        } else {
          this.service.message('Oops', 'error', 'Vériifer la saisie');
        }
      }));
    }
  }


  // validations

  emailValidate() {
    let validationEmail = document.getElementById('validationEmail');
    const emailRegexGegin = /^[a-zA-Z]+[.a-z0-9]+@[a-z]+[.]{1}[a-z]{2,3}$/;
    // const emailRegexEnd = /^[a-z]{2,}$/;
    // this.emailError = emailRegexGegin.test(this.email);
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

  telephoneValidate() {
    let validationPrenom = document.getElementById('validationTelephone');
    const nomPrenomRegex = /^(77|76|75|78|33)[0-9]{7}$/;
    if (nomPrenomRegex.test(this.numero)) {
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
    if (this.numero=="") {
      validationPrenom!.innerHTML="";
    }
  }


 messageValidate() {
    let validationPrenom = document.getElementById('validationMessage');
    const nomPrenomRegex = /^[a-zA-Z]+[a-z0-9]$/;
    if (nomPrenomRegex.test(this.message)) {
      // console.log(nomPrenomRegex.test(this.adresse));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (this.truthyTab.find((value:any)=>value.message==true)==undefined) {
        this.truthyTab.push({message:true});
      }

    } else {
      // console.log(nomPrenomRegex.test(this.message));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (this.truthyTab.find((value:any)=>value.message==true)!=undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.message==true),1);
      }
    }
    if (this.message=="") {
      validationPrenom!.innerHTML="";
    }
  }
}
