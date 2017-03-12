import { Category } from './models/category';
import { Business } from './models/busines';
import { Component, OnInit } from '@angular/core';
import {FirebaseService} from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[FirebaseService]
})
export class AppComponent implements OnInit {
  appState:string;
  activeKey:string;
  businesses:Business[];
  categories:Category[];
  constructor(private _firebaseService:FirebaseService) {}
  ngOnInit() {
    this._firebaseService.getBusiness().subscribe(business=>{
      this.businesses=business;
    });
    this._firebaseService.getCategories().subscribe(categories=>{
      this.categories=categories;
    });    
  }
  changeState(state,key){
    if(key){
      this.activeKey=key;
    }
    this.appState=state;
  }
  filterByCategory(categoryName:string){
    this._firebaseService.getBusiness(categoryName).subscribe(business=>{
      this.businesses=business;
    });
  }
addBusiness(
        company:string,
        category:string,
        years_in_business:number, 
        description:string,
        phone:string,
        email:string,
        street_address:string,
        city:string,
        state:string,
        zipcode:string){
          var created_at = new Date().toString();
          var newBusiness ={
            company:company,
            description:description,
            category:category,
            years_in_business:years_in_business,
            street_address:street_address,
            city:city,
            state:state,
            zipcode:zipcode,
            phone:phone,
            email:email,
            created_at:created_at  
          }
          this._firebaseService.addBusiness(newBusiness);
          this.changeState('default',null);
        }
}