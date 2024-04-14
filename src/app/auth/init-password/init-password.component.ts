import { Component, OnInit } from '@angular/core';
import { AllservicesService } from '../../services/allservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { param } from 'jquery';

@Component({
  selector: 'app-init-password',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './init-password.component.html',
  styleUrl: '../connexion/connexion.component.css'
})
export class InitPasswordComponent implements OnInit{
  // Attributs
  public showHidePassword: any;
  public pass = "";
  public truthyTab: any;
  public isConfirmInputAllowed = false;
  public confirmPass = '';
  public canSend = false;
  public userId="";




  // Methods
  constructor(private service: AllservicesService, private router: Router, private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      this.userId=params['userId']
    })
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

    if (this.pass == this.confirmPass && this.pass != "") {
      validationPrenom!.innerHTML = 'Conforme';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      this.canSend = true;
    } else {
      validationPrenom!.innerHTML = 'Pas conforme';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      this.canSend = false;
    }
    if (this.pass == "") {
      validationPrenom!.innerHTML = '';

    }
  }

  passeValidate() {
    let validationPrenom = document.getElementById('validationPasse');
    const nomPrenomRegex = /^[a-zA-Z]+[a-z0-9-@_&]{7,}$/;
    if (nomPrenomRegex.test(this.pass)) {
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
    if (this.pass == "") {
      validationPrenom!.innerHTML = "";
    }
    this.isPassConforme();
  }

  initaliserPass() {
    // alert('pass init  okay');
    console.log('id',{ userId: this.userId, password: this.pass });
    this.service.post('api/resetPassword', { id: 1, password: this.pass }, ((reponse: any) => {
      console.log(reponse);
      if (reponse.status==200) {
        this.service.message('Parfait','success','mot de passe réinitialisé, veuillez vous connecter');
        this.router.navigate(['/connexion']);
      }else{
        this.service.message('Oops','error','Réinitialisation échouée veuillez ressayer');
      }
    }));
  }

}
