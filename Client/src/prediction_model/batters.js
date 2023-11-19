import * as tf from "@tensorflow/tfjs";
import { RunRange, FoursRange } from "../constants/players";

export const BattersRunPrediction=async(playerIndex,opposition,condition,ground,format)=>{
    console.log('kyfh',playerIndex,opposition,condition,ground,format,'jfegv')
    try{
    console.log('hii')
    const battersModel = await tf.loadLayersModel(process.env.PUBLIC_URL + 'model/batters/lat_run/model.json');

    let arr = [];
        for(let i=0;i<160;i++){
            arr.push(0);
        }

    arr[playerIndex]=1;
    arr[19+format]=1;
    arr[22+ground]=1;
    arr[129+condition]=1;
    arr[140+opposition]=1;
        console.log(arr)
    const input = tf.tensor([arr]);
    const predictions = battersModel.predict(input);
    const tensordata = predictions.dataSync();
    const arr_vals=Array.from(tensordata)

    console.log("arr vals",arr_vals)
    let maxVal = 0;
        for (let i = 1; i < arr_vals.length; i++) {
            console.log(arr_vals[i]," ");
        if (!isNaN(arr_vals[i]) && arr_vals[i] > maxVal) {
            maxVal = i;
        }
    }

      console.log("Index with maximum predicted run value:",RunRange[maxVal])
      return RunRange[maxVal];
    }
    catch(e)
    {
        console.log('Some error in prediction runs.', e)
    }
}

export const BattersFoursPrediction = async(playerIndex,opposition,condition,ground,format)=>{
    try{
        console.log('hii')
        const battersModel = await tf.loadLayersModel(process.env.PUBLIC_URL + 'model/batters/fours/model.json');
        const check = tf.tensor1d(new Array(160).fill(0));
        const indicesToSetAs1 = [playerIndex,opposition,condition,ground,format];
        indicesToSetAs1.forEach(index => check[index] = 1);
        const checkReshaped = check.reshape([1, -1]);
        const final = checkReshaped.arraySync();
        const predictions = battersModel.predict(tf.tensor2d(final));
        const maxIndex = predictions.argMax().dataSync()[0];
  
        console.log("Index with maximum fours predicted value:",FoursRange[maxIndex])
        return FoursRange[maxIndex];
      }
      catch(e)
      {
          console.log('Some error in prediction fours.')
      }
}
