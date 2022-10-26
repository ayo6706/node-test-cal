import { Request, Response } from "express";

export async function calculateHandler(req: Request, res: Response) {

    let { Drive_Time, 
        Floor_Charge, 
        Mileage, 
        Distance_Travel_In_Miles, 
        Van_Type, 
        Carbon_Offset, 
        Congestion_Charge, 
        Driver_Charge_Hourly, 
        Helper_Charge_Hourly
    } = req.body;


    let Driver_Time_To_hour: number = 0;
    let Carbon_Offset_value: number = 0;
    let Congestion_Charge_value: number = 0;
    const van_size: any ={
        small: 60,
        medium: 60,
        large: 150,
        gaint: 180
    }

    const Driver_charge_per_hour: any = {
        small: 50,
        medium: 60,
        large: 70,
        gaint: 90
    }

    let Mileage_charge = Distance_Travel_In_Miles * Mileage;
    if (Carbon_Offset){
        Carbon_Offset_value = 5;
    }
    if (Congestion_Charge){
        Congestion_Charge_value = 15;
    }

    let total_time
    if (Drive_Time<60){
        let standard_unloading_Loading_time = 60 + (60 - Drive_Time )
        total_time =  standard_unloading_Loading_time * van_size[Van_Type] + Drive_Time
    }else if(Drive_Time>60){
        total_time =  van_size[Van_Type] + Drive_Time
    }
    total_time = Math.round(total_time * 2)/2;
    if (Drive_Time>60){
        Driver_Time_To_hour = Drive_Time/60;
        
    }


    let Driver_charge = total_time  * Math.floor(Driver_Time_To_hour) * Driver_Charge_Hourly

    let Helper_charge = total_time * (Math.floor(Driver_Time_To_hour) * Helper_Charge_Hourly)
    const current_time = new Date().getHours();

    let Late_Charge: number =0 ;
    if (current_time>18){
        Late_Charge = Math.floor(Driver_Time_To_hour) * Driver_charge_per_hour[Van_Type]/4  
    }
    
    let Price = Driver_charge + Helper_charge + Floor_Charge + Congestion_Charge_value + 
    Late_Charge + Carbon_Offset_value + Mileage_charge;
    return res.send({price: Price});
  }
  