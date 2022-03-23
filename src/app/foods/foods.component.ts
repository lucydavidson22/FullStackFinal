import { Component, OnInit } from '@angular/core';
import { Foods } from './food.model';
import { FoodsService } from './food.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  selectedRestaurant: Foods;

  constructor(private foodService: FoodsService) { }

  ngOnInit(): void {
    this.foodService.foodSelectedEvent.subscribe(
      (food:Foods) => {
        this.selectedRestaurant = food;
      }
    )
  }

}
