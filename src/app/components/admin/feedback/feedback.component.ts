import { Component, ElementRef, ViewChild } from '@angular/core';
import { AllservicesService } from '../../../services/allservices.service';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    DataTablesModule,
    FormsModule
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  // Attributs
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef; //closing the bootstrap modal

  dtOptions: DataTables.Settings = {};
  public feedbacks: any[] = [];
  public reponse = "";
  public details: any = {
    nom: '',
    email: '',
    numeor: '',
    message: '',
    id: ''
  };





  // Methodes
  constructor(private service: AllservicesService) {

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
    this.loadAllFeedbakcs();
  }

  loadAllFeedbakcs() {
    this.service.get("api/ListeFeedback", ((reponse: any) => {
      this.feedbacks = reponse.data;
      console.log(this.feedbacks);
    }));
  }

  detailsFeedback(id: any) {

    this.service.get("api/voirFeedback/" + id, ((reponse: any) => {
      // this.feedbacks=reponse.data;
      this.details.nom = reponse.data.Nom;
      this.details.email = reponse.data.Email;
      this.details.numero = reponse.data.Numero;
      this.details.message = reponse.data.Message;
      this.details.id = reponse.data.id;
      console.log('details', reponse);
      console.log('details', this.details);
    }));
  }

  repondreFeedback() {
    if (this.reponse=="") {
      this.service.message('Oops', 'error', 'Veuillez renseigner le champs');

    }else{

      this.service.post("api/RepondreFeedback/" + this.details.id, { message: this.reponse }, ((reponse: any) => {
        console.log(reponse);
        if (reponse.status == 200) {
          this.closeAddExpenseModal.nativeElement.click();
          this.service.message('Parfait', 'success', 'Envoie fait avec succès');
        } else {
          this.service.message('Oops', 'error', 'Vériifer la saisie');
        }
      }));
    }

  }
}
