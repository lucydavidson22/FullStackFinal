import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Homemade } from '../homemade.model';
import { HomemadeService } from '../homemade.service';

@Component({
  selector: 'app-homemade-list',
  templateUrl: './homemade-list.component.html',
  styleUrls: ['./homemade-list.component.css']
})
export class HomemadeListComponent implements OnInit {
  homemades: Homemade[] = [];
  private subscription: Subscription;
  id:string;

  constructor(private homemadeService: HomemadeService,
              ) { }

  ngOnInit(): void {
    this.homemadeService.homemadeChangedEvent.subscribe(
      (homemade:Homemade[]) => {
        this.homemades = homemade;
      }
    )
    this.homemades = this.homemadeService.getHomemade();
    this.subscription = this.homemadeService.homemadeListChangedEvent.subscribe(documentList => {
      this.homemades = documentList;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  selectRandom(){
    this.homemadeService.getRandomDinnerIdea(this.id);
  }


}
