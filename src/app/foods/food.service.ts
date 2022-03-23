import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Foods } from './food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  foodsListChangedEvent = new Subject<Foods[]>();
  foodSelectedEvent = new EventEmitter<Foods>();
  foodChangedEvent = new EventEmitter<Foods[]>();
  private foods: Foods[] = [];
  maxFoodsId: number;

  constructor(private http: HttpClient) {
    this.getFoodsHttp();
   }

   getFoods(){
     return this.foods.slice();
   }

   getFoodsHttp(){
    return this.http
     .get<Foods[]>('http://localhost:3000/foods')
     .subscribe(
       //success method
       (foods:Foods[]) => {
         this.foods = foods;
         this.maxFoodsId = this.getMaxId();
         foods.sort((a, b) => {
           if(a.name > b.name){ return 1; }
           if(a.name < b.name){ return -1; }
           else { return 0; }
          });
            let foodsListClone = this.foods.slice();
            this.foodsListChangedEvent.next(foodsListClone);
       }
       //error method
       ,(error: any)=> {
         console.log(error.message)
       }
     );
   }

   getFood(id:string){
    for(let food of this.foods){
      if(id == food.id){
        return food;
      }
    }
    return null!;
   }

  getMaxId(): number {
    let maxId = 0;
    for(let food of this.foods){
        if(parseInt(food.id, 10) > maxId){
          maxId = parseInt(food.id, 10);
        }
    }
    return maxId;
  }

  addFood(food: Foods) {
    if (!food) {
      return;
    }
    console.log("Add another food");

    food.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, food: Foods }>('http://localhost:3000/foods',
      food,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new food to foods
          console.log('Push new data');
          this.foods.push(responseData.food);
          this.foodsListChangedEvent.next(this.foods.slice());
          // this.sortAndSend();
        }
      );

  }

  updateFood(originalFood: Foods, newFood: Foods) {
    if (!originalFood || !newFood) {
      return;
    }
    const pos = this.foods.findIndex(d => d.id === originalFood.id);
    if (pos < 0) {
      return;
    }
    // set the id of the new Food to the id of the old Food
    newFood.id = originalFood.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/foods/' + originalFood.id,
      newFood, { headers: headers })
      .subscribe(
        () => {
          this.foods[pos] = newFood;
          this.foodsListChangedEvent.next(this.foods.slice());
          // this.sortAndSend();
        }
      );

  }

  deleteFood(food: Foods) {
    if (!food) {
      return;
    }

    const pos = this.foods.findIndex(d => d.id === food.id);
    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/foods/' + food.id)
      .subscribe(
        () => {
          this.foods.splice(pos, 1);
          this.foodsListChangedEvent.next(this.foods.slice());
          // this.sortAndSend();
        }
      );
  }

}
