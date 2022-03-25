import { Component, Input, OnInit } from '@angular/core';
import { Homemade } from '../homemade.model';

@Component({
  selector: 'app-homemade-item',
  templateUrl: './homemade-item.component.html',
  styleUrls: ['./homemade-item.component.css']
})
export class HomemadeItemComponent implements OnInit {
  @Input() homemade: Homemade;

  constructor() { }

  ngOnInit(): void {
  }

}
