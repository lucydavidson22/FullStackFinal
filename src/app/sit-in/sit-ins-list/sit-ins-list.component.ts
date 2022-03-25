import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SitIn } from '../sit-in.model';
import { SitInService } from '../sit-in.service';

@Component({
  selector: 'app-sit-ins-list',
  templateUrl: './sit-ins-list.component.html',
  styleUrls: ['./sit-ins-list.component.css']
})
export class SitInListComponent implements OnInit {
  sitIns: SitIn[] = [];
  private subscription: Subscription;

  constructor(private sitInService: SitInService,
              ) { }

  ngOnInit(): void {
    this.sitInService.sitInChangedEvent.subscribe(
      (sitIn:SitIn[]) => {
        this.sitIns = sitIn;
      }
    )
    this.sitIns = this.sitInService.getSitIns();
    this.subscription = this.sitInService.sitInListChangedEvent.subscribe(documentList => {
      this.sitIns = documentList;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }


}
