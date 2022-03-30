import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Homemade } from '../homemade.model';
import { HomemadeService } from '../homemade.service';

@Component({
  selector: 'app-homemade-edit',
  templateUrl: './homemade-random-detail.component.html',
  styleUrls: ['./homemade-random-detail.component.css']
})
export class HomemadeRandomDetailComponent implements OnInit {
  homemade: Homemade;
  id: string;
  nativeWindow: any;

  constructor(private homemadeService: HomemadeService,
              private route: ActivatedRoute,
              private router: Router) {
              }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params[':id/random'];
        this.homemade = this.homemadeService.getRandomDinnerIdea(this.id);

      }
    )
  }

  onEditHomemade(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }


  onDelete(){
    this.homemadeService.deleteHomemadeMeal(this.homemade);
    this.router.navigate(['homemades']);
  }

}
