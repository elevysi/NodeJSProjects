import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";


@Component({
  moduleId : module.id,
  selector: 'my-app',
  templateUrl : "app.component.html",
})
export class AppComponent  { name = 'Angular'; }
