import * as tf from "@tensorflow/tfjs";
import { BowlGround, PlayersBowlerNameMapped, BowlCondition, BowlOpp, BowlFormat } from "../constants/players";

export const BowlingPrediction=async(playerName, groundName, condition, opp, form, humidity, temp, windspeed)=>{
    console.log(playerName,groundName,condition,opp,form)
    try{
        const model = await tf.loadLayersModel(process.env.PUBLIC_URL + 'model/bowlers/run/model.json');

        let arr = [];
        for(let i=0;i<167;i++){
            arr.push(0);
        }
        
        arr[0] = playerName
        arr[1] = 4
        arr[2] = temp 
        arr[3] = humidity 
        arr[4] = windspeed 

        arr[5+groundName] = 1;

        arr[128+condition+1] = 1;

        arr[141+opp] = 1;

        arr[164+form] = 1;
        
        const input = tf.tensor([arr]);
        const predictions = model.predict(input);
        const out = predictions.dataSync();
        let maxVal = 0;
        for (let i = 1; i < predictions.length; i++) {
        if (!isNaN(predictions[i]) && predictions[i] > maxVal) {
            maxVal = i;
        }
    }
    console.log('range:', maxVal*10,'-',maxVal*10+10 );
    return {'min':40, 'max':50}
    
    }
    catch(error)
    {
      console.error(error);
    }
}

export const BowlingWicketPrediction=async(playerName, groundName, condition, opp, form, humidity, temp, windspeed)=>{
    console.log(playerName,groundName,condition,opp,form)
    try{
        const model = await tf.loadLayersModel(process.env.PUBLIC_URL + 'model/bowlers/wicket/model.json');

        let arr = [];
        for(let i=0;i<167;i++){
            arr.push(0);
        }
        
        arr[0] = playerName
        arr[1] = 4
        arr[2] = temp 
        arr[3] = humidity 
        arr[4] = windspeed 

        arr[5+groundName] = 1;

        arr[128+condition+1] = 1;

        arr[141+opp] = 1;

        arr[164+form] = 1;
        
        const input = tf.tensor([arr]);
        const predictions = model.predict(input);
        const out = predictions.dataSync();
        let maxVal = 0;
        for (let i = 1; i < predictions.length; i++) {
        if (!isNaN(predictions[i]) && predictions[i] > maxVal) {
            maxVal = i;
        }

    }
    console.log('range:', maxVal*10,'-',maxVal*10+10 );
    return {'min':maxVal, 'max':maxVal+2}
    
    }
    catch(error)
    {
      console.error(error);
    }
}