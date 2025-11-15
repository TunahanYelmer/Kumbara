import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is


export const createNotificationStyles = (theme: Theme , height :number,  width:number ) =>



     StyleSheet.create({
        view:{flex:1, alignItems:"center",justifyContent:"center"},
        icon:{
            alignItems:"center",
            justifyContent:"center",
            height:height * 0.1,
            width:width * 0.1

        },
        button:{
            justifyContent:"center",
            alignItems:"center"
        }
  
});

 