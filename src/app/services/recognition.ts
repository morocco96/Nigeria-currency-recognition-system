import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

@Injectable({
  providedIn: 'root',
})
export class Recognition {
  
 model: any;

async loadModel() {

this.model = await tf.loadLayersModel('assets/model/model.json')
console.log("Model loaded:", this.model);
}

async detect(image: HTMLImageElement) {

const tensor = tf.browser.fromPixels(image)
.resizeBilinear([224,224])
.toFloat()
.div(255)
.expandDims(0);

const prediction = this.model.predict(tensor) as any;

const data = await prediction.data();

console.log("Prediction:", data);

const labels = [
"5 Naira",
"10 Naira",
"50 Naira",
"100 Naira",
"200 Naira",
"500 Naira",
"1000 Naira"
];

const maxIndex = data.indexOf(Math.max(...data));

return labels[maxIndex];

}
}
