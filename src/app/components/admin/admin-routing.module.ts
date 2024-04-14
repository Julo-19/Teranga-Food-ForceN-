import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { SignalementComponent } from './signalement/signalement.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { CategorieComponent } from './categorie/categorie.component';
import { LivreurComponent } from './livreur/livreur.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [

  {
    path: "",
    component: SidebarComponent,
    children: [
      {
        path: "",
        component: AccueilAdminComponent,
      },
      {

        path: "accueil",
        component: AccueilAdminComponent,
      },
      {
        path: "", redirectTo: "sidebar", pathMatch: "full"
      },
      {
        path: "feedback",
        component: FeedbackComponent
      },
      {
        path: "utilisateur",
        component: UtilisateurComponent
      },
      {
        path: "signalement",
        component: SignalementComponent
      },
      {
        path: "livraison",
        component: LivraisonComponent
      },
      {
        path: "newsletter",
        component: NewsletterComponent
      },
      {
        path: "categorie",
        component: CategorieComponent
      },
      {
        path: "livreur",
        component: LivreurComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {


}
