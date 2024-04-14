import { Component, OnInit } from '@angular/core';
import { AllservicesService } from '../../../services/allservices.service';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    FormsModule,
    DataTablesModule

  ],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent implements OnInit{
  // Attributs
  dtOptions: DataTables.Settings = {};
  public letter="";
  public listeInscrits:any[]=[];
  // Methodes
  constructor(private service:AllservicesService){

  }

  ngOnInit(): void {
    // this.informer();
    this.loadAllInscrits();
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 6,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      }
    };
  }

  loadAllInscrits(){
    this.service.get('api/ListeNewsletter',((reponse:any)=>{
      console.warn(reponse);
      this.listeInscrits=reponse.data;
    }));
  }

  informer(){
    if (this.letter=="") {
      this.service.message('Oops','error','Veuillez renseigner le champs');
    }else{
      this.service.post('api/envoyerMail',{letter:this.letter},((reponse:any)=>{
        console.log(reponse);
        if (reponse.status==200) {
          this.service.message('Parfait','success','Letter envoyé avec succès');
          this.letter="";
        }else{
          this.service.message('Oops','error','Veuillez renseigner le champs');
        }
      }));
    }
  }
}
