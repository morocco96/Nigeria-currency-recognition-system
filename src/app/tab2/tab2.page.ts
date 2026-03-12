import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
  IonIcon,IonList, IonItem, IonThumbnail, IonLabel} from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Recognition } from '../services/recognition';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, 
    IonContent,  IonIcon, IonItem, IonThumbnail, IonList,
    IonLabel, CommonModule]
})
export class Tab2Page implements OnInit {

  
  image:any;
result:any;

constructor(
private recognition:Recognition,

){}

async ngOnInit() {
  await this.recognition.loadModel();
}


async scanMoney(){

const photo = await Camera.getPhoto({
quality:90,
resultType:CameraResultType.DataUrl,
  width: 224,
  height: 224
});

this.image = photo.dataUrl;

const image = await this.createImage(photo.dataUrl!);
this.result = await this.recognition.detect(image);

console.log(this.result)



await TextToSpeech.speak({
  text: `This is ${this.result}`,
  lang: 'en-US',
  rate: 1.0
});

}


createImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => resolve(img);
  });
}


async speak() {
  await TextToSpeech.speak({
    text: `This is ${this.result}`,
    lang: "en-US"
  });

}
}