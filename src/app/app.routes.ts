import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { PanierComponent } from './components/panier/panier.component';
import { ConfirmCommandComponent } from './components/confirm-command/confirm-command.component';
import { ConnexionComponent } from './auth/connexion/connexion.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailsProduitComponent } from './components/details-produit/details-produit.component';
import { AddProduitComponent } from './components/produit/add-produit/add-produit.component';
import { ListProduitComponent } from './components/produit/list-produit/list-produit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdresseComponent } from './components/adresse/adresse.component';
import { CommandeComponent } from './components/commande/commande.component';
import { EditProduitComponent } from './components/produit/edit-produit/edit-produit.component';
import { VenteComponent } from './components/vente/vente.component';
import { AdminGuard } from './guards/admin.guard';
import { LivraisonLivreurComponent } from './components/livraison-livreur/livraison-livreur.component';
import { ConditionUtilisationComponent } from './components/condition-utilisation/condition-utilisation.component';
import { ConfidentialiteSecuriteComponent } from './components/confidentialite-securite/confidentialite-securite.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ClientGuard } from './guards/client.guard';
import { VendeurGuard } from './guards/vendeur.guard';
import { LivreurGuard } from './guards/livreur.guard';
import { IsOnlineGuard } from './guards/is-online.guard';
import { InitPasswordComponent } from './auth/init-password/init-password.component';


export const routes: Routes = [

  // {
  //   path:"",
  //   component:AccueilComponent
  // },
  {
    path:"",redirectTo:"accueil",pathMatch:"full"
  },
  {
    path:"accueil",
    component:AccueilComponent
  },
  {
    path:"catalogue",
    component:CatalogueComponent
  },
  {
    path:"detailsProduit/:id",
    component:DetailsProduitComponent
  },
  {
    path:"panier",
    component:PanierComponent
  },
  {
    path:"confirmCommand",
    component:ConfirmCommandComponent,
    canActivate:[ClientGuard]
  },
  {
    path:"connexion",
    component:ConnexionComponent
  },
  {
    path:"inscription",
    component:InscriptionComponent
  },
  {
    path:"contact",
    component:ContactComponent
  },
  {
    path:"addProduit",
    component:AddProduitComponent,
    canActivate:[VendeurGuard]
  },
  {
    path:"listProduit",
    component:ListProduitComponent,
    canActivate:[VendeurGuard]
  },
  {
    path:"profile",
    component:ProfileComponent,
    canActivate:[IsOnlineGuard]
  },
  {
    path:"adresse",
    component:AdresseComponent,
    canActivate:[IsOnlineGuard]
  },
  {
    path:"commande",
    component:CommandeComponent,
    canActivate:[ClientGuard]
  },
  {
    path:"editProduit/:id",
    component:EditProduitComponent,
    canActivate:[VendeurGuard]
  },
  {
    path:"listVente",
    component:VenteComponent,
    canActivate:[VendeurGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canActivate:[AdminGuard]
  },
  {
    path:'livraisonLivreur',
    component:LivraisonLivreurComponent,
    canActivate:[LivreurGuard]
  },
  {
    path:'conditionUtilisation',
    component:ConditionUtilisationComponent
  },
  {
    path:'confidentialiteSecurite',
    component:ConfidentialiteSecuriteComponent
  },
  {
    path:'initPass',
    component:InitPasswordComponent
  },

  {
    path:'**',
    component:PageNotFoundComponent
  },
];
