import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Foods } from '../food.model';
import { FoodsService } from '../food.service';

@Component({
  selector: 'app-foods-edit',
  templateUrl: './foods-edit.component.html',
  styleUrls: ['./foods-edit.component.css']
})
export class FoodsEditComponent implements OnInit {
  @ViewChild('f') foodForm: NgForm;
  subscription: Subscription;
  originalFood: Foods;
  food:Foods
  editMode: boolean = false;
  id: string;

  constructor(private foodService: FoodsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if(!this.id){
          this.editMode = false;
          return;
        }
        this.originalFood = this.foodService.getFood(this.id);
        if(!this.originalFood){
          return;
        }
        this.editMode = true;
        this.food = JSON.parse(JSON.stringify(this.originalFood));
      })
  }

  onCancel(){
    this.router.navigate(['/foods']);
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newFood = new Foods(
      '0',
      value.name,
      value.imageUrl,
      value.mainCourse,
      value.sides,
      value.drinks,
      value.desserts,
      value.menuUrl
    );

    if(this.editMode){
      this.foodService.updateFood(this.originalFood, newFood)
    } else{
      this.foodService.addFood(newFood)
    }
    this.router.navigate(['foods']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
