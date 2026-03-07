import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class Recognition {
  
  model:any;

async loadModel(){
this.model = await tf.loadLayersModel('assets/model/naira-model.json');
}

async detect(image:any){

// convert image to tensor
const tensor = tf.browser.fromPixels(image)
.resizeNearestNeighbor([224,224])
.expandDims();

const prediction = await this.model.predict(tensor).data();

const classes = [
"₦5",
"₦10",
"₦50",
"₦100",
"₦200",
"₦500",
"₦1000"
];

const index = prediction.indexOf(Math.max(...prediction));

return classes[index];

}
}
