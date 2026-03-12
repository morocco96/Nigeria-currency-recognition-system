import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem,IonToggle } from '@ionic/angular/standalone';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,  IonLabel, IonItem,IonToggle],
})
export class Tab3Page {
  constructor() {}
}
