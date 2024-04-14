import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AllservicesService } from '../../services/allservices.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vente',
  standalone: true,
  imports: [
    DataTablesModule,
    DatePipe
  ],
  templateUrl: './vente.component.html',
  styleUrl: './vente.component.css'
})
export class VenteComponent {
 // Attributs
 dtOptions: DataTables.Settings = {};
 public ventes:any[]=[];
 public produitsVentes:any[]=[];
 public urlBaseImage=this.service.urlBaseImage;


// Methodes
constructor(private service:AllservicesService){

}
ngOnInit(): void {
 this.dtOptions = {
   searching: true,
   lengthChange: false,
   paging: true,
   info: false,
   pageLength: 5,
   language: {
     url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
   }
 };
 this.service.get('api/listeVentes',((reponse:any)=>{
  console.log(reponse);
  this.ventes=reponse.data;
  // console.log('rep '+this.ventes);
 }));
}

showVente(id:number){
  this.service.get("api/showVente/"+id,((reponse:any)=>{
    console.warn(reponse);
    this.produitsVentes=reponse.data;
  }));
}
}
