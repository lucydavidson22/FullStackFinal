import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Foods } from '../food.model';
import { FoodsService } from '../food.service';

@Component({
  selector: 'app-foods-list',
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.css']
})
export class FoodsListComponent implements OnInit {
  foods: Foods[];
  private subscription: Subscription;
  id: string;

  constructor(private foodService: FoodsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.foodService.foodChangedEvent.subscribe(
      (food:Foods[]) => {
        this.foods = food;
      }
    )
    this.foods = this.foodService.getFoods();
    this.subscription = this.foodService.foodsListChangedEvent.subscribe(foodList => {
      this.foods = foodList;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  selectRandom(){
    this.foodService.getRandomDinnerIdea(this.id);
  }

}

