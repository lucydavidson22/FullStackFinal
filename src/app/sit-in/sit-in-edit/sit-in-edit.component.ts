import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {  } from 'express';
import { Subscription } from 'rxjs';
import { SitIn } from '../sit-in.model';
import { SitInService } from '../sit-in.service';

@Component({
  selector: 'app-sit-in-edit',
  templateUrl: './sit-in-edit.component.html',
  styleUrls: ['./sit-in-edit.component.css']
})
export class SitInEditComponent implements OnInit {
  subscription: Subscription;
  originalSitIn: SitIn;
  sitIn:SitIn
  editMode: boolean = false;
  id: string;

  constructor(private sitInService: SitInService,
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
        this.originalSitIn = this.sitInService.getSitIn(this.id);
        if(!this.originalSitIn){
          return;
        }
        this.editMode = true;
        this.sitIn = JSON.parse(JSON.stringify(this.originalSitIn));
      })
  }

  onCancel(){
    this.router.navigate(['/sitIns']);
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newSitIn = new SitIn(
      '0',
      value.name,
      value.imageUrl,
      value.favoriteItems,
      value.menuUrl
    );

    if(this.editMode){
      this.sitInService.updateSitIn(this.originalSitIn, newSitIn)
    } else{
      this.sitInService.addSitIn(newSitIn)
    }
    this.router.navigate(['sitIns']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
