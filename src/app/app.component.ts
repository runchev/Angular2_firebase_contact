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
}