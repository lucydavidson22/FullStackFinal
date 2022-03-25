import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Homemade } from '../homemade.model';
import { HomemadeService } from '../homemade.service';

@Component({
  selector: 'app-homemade-detail',
  templateUrl: './homemade-detail.component.html',
  styleUrls: ['./homemade-detail.component.css']
})
export class HomemadeDetailComponent implements OnInit {
  homemade: Homemade;
  id: string;
  nativeWindow: any;

  constructor(private homemadeService: HomemadeService,
              private windowRefService: WindRefService,
              private route: ActivatedRoute,
              private router: Router) {
      this.nativeWindow = windowRefService.getNativeWindow();
    }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.homemade = this.homemadeService.getHomemadeMeal(this.id)
      }
    )
  }

  onEditHomemade(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  // onView(){
  //   if(this.homemade.menuUrl){
  //     this.nativeWindow.open(this.homemade.menuUrl);
  //   }
  // }

  onDelete(){
    this.homemadeService.deleteHomemadeMeal(this.homemade);
    this.router.navigate(['homemades']);
  }

}
