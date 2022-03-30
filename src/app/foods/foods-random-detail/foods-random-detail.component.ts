import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Foods } from '../food.model';
import { FoodsService } from '../food.service';

@Component({
  selector: 'app-foods-edit',
  templateUrl: './foods-random-detail.component.html',
  styleUrls: ['./foods-random-detail.component.css']
})
export class FoodsRandomDetailComponent implements OnInit {
  food: Foods;
  id: string;
  nativeWindow: any;

  constructor(private foodService: FoodsService,
              private windowRefService: WindRefService,
              private route: ActivatedRoute,
              private router: Router) {
    this.nativeWindow = windowRefService.getNativeWindow();
              }

  ngOnInit(): void {
    // this.router.navigate(['foods']);
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params[':id/random'];
        this.food = this.foodService.getRandomDinnerIdea(this.id);

      }
    )
  }

  onEditFood(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onView(){
    if(this.food.menuUrl){
      this.nativeWindow.open(this.food.menuUrl);
    }
  }

  onDelete(){
    this.foodService.deleteFood(this.food);
    this.router.navigate(['foods']);
  }

}
