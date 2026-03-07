import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Recognition } from '../services/recognition';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonButton, IonToolbar, IonTitle, IonContent,  CommonModule]
})
export class Tab2Page {

  
  image:any;
result:any;

constructor(
private recognition:Recognition,

){}

async scanMoney(){

const photo = await Camera.getPhoto({
quality:90,
resultType:CameraResultType.DataUrl
});

this.image = photo.dataUrl;

this.result = await this.recognition.detect(photo.dataUrl);



await TextToSpeech.speak({
  text: `This is ${this.result} Naira`,
  lang: 'en-US',
  rate: 1.0
});

}

}
