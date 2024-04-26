import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Produit } from '../models/produit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
// import { HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AllservicesService {
  // local server
  // urlBase = 'http://localhost:8000/';
  // urlBaseImage = 'http://localhost:8000/images/';

  // distant server
  // urlBase = 'https://www.falltech.site/panierlocal_backend/';
    urlBase = 'http://127.0.0.1:8000/';
  urlBaseImage = 'https://www.falltech.site/panierlocal_backend/public/images/';

  public readonly prixLivraion = 2000;
  public nombreProduitPanier = JSON.parse(localStorage.getItem('panier') ?? '[]').length;

  constructor(private http: HttpClient) {

  }


  post(path: string, dataToSend: any, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("onlineUser") ?? '{}').token
      })
    };
    this.http.post(this.urlBase + path, dataToSend, httpOptions).subscribe((reponse: any) => onSuccess(reponse));
  }

  simplePost(path: string, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("onlineUser") ?? '{}').token
      })
    };
    this.http.post(this.urlBase + path, httpOptions).subscribe((reponse: any) => onSuccess(reponse));
  }
  deleteFunction(path: string, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("onlineUser") ?? '{}').token
      })
    };
    this.http.delete(this.urlBase + path, httpOptions).subscribe((reponse: any) => onSuccess(reponse));
  }

  get(path: string, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("onlineUser") ?? '{}').token
      })
    };
    this.http.get(this.urlBase + path, httpOptions).subscribe((reponse: any) => onSuccess(reponse));
  }


  message(title: any, icon: any, message: any) {
    if (icon == 'warning') {

      Swal.fire({
        title: title,
        text: message,
        icon: icon,
        timer: 600
      });
    } else if (icon == 'success') {

      Swal.fire({
        title: title,
        text: message,
        icon: icon,
        timer: 600
      });
    } else {
      Swal.fire({
        title: title,
        text: message,
        icon: icon
      });

    }
  }

  whoIsOnline() {
    if (localStorage.getItem("onlineUser") != null || localStorage.getItem("onlineUser") != undefined) {
      let data = JSON.parse(localStorage.getItem("onlineUser") ?? '{}');
      return data.type;
    } else {
      return null;
    }
  }

  idOnline() {
    if (localStorage.getItem("onlineUser") != null || localStorage.getItem("onlineUser") != undefined) {
      let data = JSON.parse(localStorage.getItem("onlineUser") ?? '{}');
      return data.id;
    } else {
      return null;
    }
  }
  // la fonction qui retourne l'id de l'utilisateur connécté
  IsOnline() {
    if (localStorage.getItem("onlineUser") != null || localStorage.getItem("onlineUser") != undefined) {
      let data = JSON.parse(localStorage.getItem("onlineUser") ?? '{}');
      return data;
    } else {
      return null;
    }
  }

  postToPanier(produit: any, quantite = 0) {
    if (produit.quantite == 0) {
      this.message('Oops', 'warning', 'Ce produit est en rupture de stock');
    } else {

      let produitPanier = {};
      if (localStorage.getItem('panier') == null || localStorage.getItem('panier') == undefined) {
        if (quantite != 0) {

          produitPanier = {
            produit: produit,
            quantitePanier: quantite
          }
        } else {

          produitPanier = {
            produit: produit,
            quantitePanier: 1
          }
        }
        localStorage.setItem('panier', JSON.stringify([produitPanier]));
        this.message("parfait", "success", "produit ajouté au panier");
      } else {
        let panier = JSON.parse(localStorage.getItem('panier') ?? '[]');
        let a = panier.filter((item: any) => item.produit.id == produit.id);
        // console.log(a.length);
        if (a.length > 0) {

          this.message("oops", "warning", "Ce produit existe déja dans le panier");
        } else {
          if (quantite != 0) {

            produitPanier = {
              produit: produit,
              quantitePanier: quantite
            }
          } else {

            produitPanier = {
              produit: produit,
              quantitePanier: 1
            }
          }
          // let produitPanier = {
          //   produit: produit,
          //   quantitePanier: 1
          // }
          panier.push(produitPanier);
          localStorage.setItem('panier', JSON.stringify(panier));
          this.message("parfait", "success", "produit ajouté au panier");
        }
      }
      // cardContent = JSON.parse(localStorage.getItem('panier') ?? '[]').length;
      this.nombreProduitPanier = JSON.parse(localStorage.getItem('panier') ?? '[]').length;
    }
  }

  getFromPanier() {
    return JSON.parse(localStorage.getItem('panier') ?? '[]');
  }

  clearPanier() {
    localStorage.removeItem('panier');
  }



  // gestion du token déconnexion après le délai du token
  setTokenTimeValidity(key: any, value: any, ttl: any) {
    const dateActuelle = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const userOnline = {
      value: value,
      délai: dateActuelle.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(userOnline));
  }


  isTokenStillValid(expirykey: any, expiryToken: any) {
    const tokenExpiryTime = JSON.parse(localStorage.getItem(expirykey) ?? '[]');
    alert('loken validyty verif')
    // if the item doesn't exist, return null
    if (!tokenExpiryTime) {
      return null
    }
    const item = tokenExpiryTime;
    const now = new Date()
    // compare the délai time of the item with the current time
    if (now.getTime() > item) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(expiryToken);
      this.message('Raison de sécurité', 'warning', 'Pour des raisons de sécurité la déconnexionn se fait après une de temps')
      // alert('supprimé')
      return null
      // this.isTokenStillValid("tokenExpiryTime","onlineUser");

    }
    return item
  }

  messageConfirm() {
    Swal.fire({
      title: "Etes vous sûr ",
      text: "Cette action est irréversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non"
    }).then((result) => {
      if (result.isConfirmed) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  // popup notiflix
  errorMessage(message: any) {
    Notify.failure(message);

    // Notify.
  }

  successMessage(message: any) {
    Notify.success(message);
  }


  // panierItemNumber
  private refresh: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  public getRefresh(): Observable<any> {
    return this.refresh.asObservable();
  }

  public setRefresh(value: any): void {
    this.refresh.next(value);
  }
}
