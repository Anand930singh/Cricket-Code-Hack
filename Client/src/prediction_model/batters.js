import * as tf from "@tensorflow/tfjs";
import { RunRange } from "../constants/players";

export const BattersRunPrediction=async()=>{
    try{
      console.log('hii')
      const battersModel = await tf.loadLayersModel(process.env.PUBLIC_URL + 'model/batters/runs/model.json');
      const check = tf.tensor1d(new Array(160).fill(0));
      const indicesToSetAs1 = [18,153, 139, 62, 19];
      indicesToSetAs1.forEach(index => check[index] = 1);
      const checkReshaped = check.reshape([1, -1]);
      const final = checkReshaped.arraySync();
      const predictions = battersModel.predict(tf.tensor2d(final));
      const maxIndex = predictions.argMax().dataSync()[0];

      console.log("Index with maximum predicted value:",RunRange[maxIndex])
      return RunRange[maxIndex];
    }
    catch(e)
    {
        console.log('Some error in prediction.')
    }
}

export const BattersFoursPrediction = async()=>{
    try{
        console.log('hii')
        const battersModel = await tf.loadLayersModel(process.env.PUBLIC_URL + 'model/batters/fours/model.json');
        const check = tf.tensor1d(new Array(160).fill(0));
        const indicesToSetAs1 = [18,153, 139, 62, 19];
        indicesToSetAs1.forEach(index => check[index] = 1);
        const checkReshaped = check.reshape([1, -1]);
        const final = checkReshaped.arraySync();
        const predictions = battersModel.predict(tf.tensor2d(final));
        const maxIndex = predictions.argMax().dataSync()[0];
  
        console.log("Index with maximum predicted value:",RunRange[maxIndex])
        return RunRange[maxIndex];
      }
      catch(e)
      {
          console.log('Some error in prediction.')
      }
}