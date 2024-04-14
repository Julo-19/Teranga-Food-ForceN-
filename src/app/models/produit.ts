export class Produit {
  constructor(
    private nom_produit:string,
    private quantite:string,
    private prix: string,
    private description:string,
    private commercant_id:number,
    private categorie_id:number,
    private image:any
  ) {

  }
}
