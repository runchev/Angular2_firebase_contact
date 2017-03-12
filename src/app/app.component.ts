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
  activeCompany:string;
  activeCategory:string;
  activeYearsInBusiness:string; 
  activeDescription:string;
  activePhone:string;
  activeEmail:string;
  activeStreetAddress:string;
  activeCity:string;
  activeState:string;
  activeZipcode:string;

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
  showEdit(business){
    this.changeState('edit', business.$key);
    this.activeCompany=business.company;
    this.activeCategory=business.category;
    this.activeYearsInBusiness=business.years_in_business; 
    this.activeDescription=business.description;
    this.activePhone=business.phone;
    this.activeEmail=business.email;
    this.activeStreetAddress=business.street_address;
    this.activeCity=business.city;
    this.activeState=business.state;
    this.activeZipcode=business.zipcode;
  }
  cancelEdit(business){
    this.changeState('default', null);

  }
  updateBusiness(){
    var updBusiness ={
              company:this.activeCompany,
              description:this.activeDescription,
              category:this.activeCategory,
              years_in_business:this.activeYearsInBusiness,
              street_address:this.activeStreetAddress,
              city:this.activeCity,
              state:this.activeState,
              zipcode:this.activeZipcode,
              phone:this.activePhone,
              email:this.activeEmail,
              created_at:Date().toString()  
            }
    this._firebaseService.updateBusiness(updBusiness,this.activeKey);
    this.changeState('default',null);

  }
  deleteBusiness(bussiness){
    this._firebaseService.deleteBusiness(bussiness.$key);
    this.changeState('default',null);
  }
}