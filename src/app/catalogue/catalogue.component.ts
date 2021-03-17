import { Component, OnInit } from '@angular/core';
import {Observable,of,from} from 'rxjs';
import {filter} from 'rxjs/operators';
import {PremierServiceService} from '../premier.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(private premier : PremierServiceService)  { }
  observableBouchon$ : Observable<any> = null;
  observable$ : Observable<any> =null;

  tableauVoiture : Array<any> = [];
  //voitureCher : number = 100000;
  prixVoiture : string="";
  //regEx = /^[0-9]{10}$/;

  ngOnInit(): void {
    this.observable$= from(
      [{"modele":"Ferrari","prix":100000},
      {"modele":"Twingo","prix":150000},
      {"modele":"Mustang","prix":50000}]
  );
  }
  //recupere depuis mock
  onClickGetVoiture(){
    console.log ("Liste toute les voitures ...")
    this.observableBouchon$ = this.premier.getVoitures();
  }
  //marche pas en recup de mock / pas de filtre sur le json
  onClickGetVoitureCher() 
    { 
      console.log ("Recherche de la voiture la plus cher ...")
      if ((this.prixVoiture == "")){
        alert("Rentrer un nombre!")
      }
      this.observable$.pipe(filter (voiture => voiture.prix > this.prixVoiture )).subscribe (voiture => {this.tableauVoiture.push (voiture)});
    }

}
