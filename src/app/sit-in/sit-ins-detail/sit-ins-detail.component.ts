import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { SitIn } from '../sit-in.model';
import { SitInService } from '../sit-in.service';

@Component({
  selector: 'app-sit-ins-detail',
  templateUrl: './sit-ins-detail.component.html',
  styleUrls: ['./sit-ins-detail.component.css']
})
export class SitInsDetailComponent implements OnInit {
  sitIn: SitIn;
  id: string;
  nativeWindow: any;

  constructor(private sitInService: SitInService,
              private windowRefService: WindRefService,
              private route: ActivatedRoute,
              private router: Router) {
      this.nativeWindow = windowRefService.getNativeWindow();
    }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.sitIn = this.sitInService.getSitIn(this.id)
      }
    )
  }

  onEditSitIn(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onView(){
    if(this.sitIn.menuUrl){
      this.nativeWindow.open(this.sitIn.menuUrl);
    }
  }

  onDelete(){
    this.sitInService.deleteSitIn(this.sitIn);
    this.router.navigate(['sitIns']);
  }

}
