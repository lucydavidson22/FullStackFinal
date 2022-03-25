import { Component, OnInit } from '@angular/core';
import { Homemade } from './homemade.model';
import { HomemadeService } from './homemade.service';

@Component({
  selector: 'app-homemades',
  templateUrl: './homemades.component.html',
  styleUrls: ['./homemades.component.css']
})
export class HomemadeComponent implements OnInit {
  selectedHomemade: Homemade;

  constructor(private homemadeService: HomemadeService) { }

  ngOnInit(): void {
    this.homemadeService.homemadeSelectedEvent.subscribe(
      (homemade:Homemade) => {
        this.selectedHomemade = homemade;
      }
    )
  }

}
