import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Homemade } from '../homemade.model';
import { HomemadeService } from '../homemade.service';

@Component({
  selector: 'app-homemade-edit',
  templateUrl: './homemade-edit.component.html',
  styleUrls: ['./homemade-edit.component.css']
})
export class HomemadeEditComponent implements OnInit {
  @ViewChild('f') homemadeForm: NgForm;
  subscription: Subscription;
  originalHomemade: Homemade;
  homemade:Homemade;
  editMode: boolean = false;
  id: string;

  constructor(private homemadeService: HomemadeService,
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
        this.originalHomemade = this.homemadeService.getHomemadeMeal(this.id);
        if(!this.originalHomemade){
          return;
        }
        this.editMode = true;
        this.homemade = JSON.parse(JSON.stringify(this.originalHomemade));
      })
  }

  onCancel(){
    this.router.navigate(['/homemades']);
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newHomemade = new Homemade(
      '0',
      value.name,
      value.imageUrl,
      value.sides
    );

    if(this.editMode){
      this.homemadeService.updateHomemadeMeal(this.originalHomemade, newHomemade)
    } else{
      this.homemadeService.addHomemadeMeal(newHomemade)
    }
    this.router.navigate(['homemades']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
