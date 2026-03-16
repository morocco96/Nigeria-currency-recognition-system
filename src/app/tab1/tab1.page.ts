import { Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Recognition } from '../services/recognition';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon],
})
export class Tab1Page implements OnInit {
  
   image:any;
 result:any;
  speechText = "";
 
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
 


 if(!this.result){
   this.speechText = "I couldn't recognize the currency. Please scan again.";
 }else{
   this.speechText = `This is ${this.result}`;
 }
 
 await TextToSpeech.speak({
   text: this.speechText,
   lang: 'en-US',
   rate: 1.0
 });
 
 }


 async speak() {
   await TextToSpeech.speak({
   text: this.speechText,
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
}
