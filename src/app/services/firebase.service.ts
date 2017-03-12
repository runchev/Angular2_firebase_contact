import {Injectable} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import {Business} from '../models/busines';
import {Category} from '../models/category';

@Injectable()
export class FirebaseService{
  business: FirebaseListObservable<Business[]>;
  categories: FirebaseListObservable<Category[]>;

  constructor(private _af: AngularFire) {
  }
  getBusiness(categoryName:string=null){
      if(categoryName && categoryName !="0"){
        this.business=this._af.database.list('/businesses',{
            query:{
                orderByChild:'category',
                equalTo:categoryName
            }
        }) as
        FirebaseListObservable<Business[]>
      }else{
        this.business=this._af.database.list('/businesses') as
        FirebaseListObservable<Business[]>
      }
              return this.business;
  }
  getCategories(){
      this.categories=this._af.database.list('/categories') as
      FirebaseListObservable<Category[]>
      return this.categories;
  }
  addBusiness(business){
      this.business.push(business);
  }

}