import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../model/widget.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../service/widget.service';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  @Input() widget: Widget;
  @ViewChild('widgetForm') widgetForm: NgForm;
  userId: string;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.userId = param.uid;
      }
    );
  }
  save() {
    const text = this.widgetForm.value.widgetText;
    const size = this.widgetForm.value.widgetSize;
    this.widgetService.updateWidget(this.widget.id, new Widget(this.widget.id, this.widget.widgetType,
      this.widget.pageId, size, text, this.widget.width, this.widget.url)).subscribe(
      (widget: Widget) => {
        alert( 'save successfully');
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget.id).subscribe(
      (data: any) => {
        this.router.navigate(['../'],  {relativeTo:this.activatedRoute});
      }
    );
  }

}
