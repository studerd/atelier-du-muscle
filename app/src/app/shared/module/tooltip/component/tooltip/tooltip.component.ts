import { Component, OnInit } from '@angular/core';
import {TooltipPosition, TooltipTheme} from '../../model';
import {LabelWithParam} from '@shared/model/label-with-param.interface';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  position: TooltipPosition = TooltipPosition.DEFAULT;
  theme: TooltipTheme = TooltipTheme.DEFAULT;
  tooltip:LabelWithParam = {label:''};
  left = 0;
  top = 0;
  visible = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
