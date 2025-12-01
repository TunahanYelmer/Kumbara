

import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is







export const createNavbarStyles = (theme: Theme  , activeTab : string) =>

    

      StyleSheet.create({
        navbarContainer: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: theme.BackgroundColor,
            height: 50,
            borderTopColor: theme.HiglightColor,
            borderTopWidth: 1
        },
       
        homeScreenImage: {
            width: 24,
            height: 24,
            tintColor: activeTab == "Home" ? theme.TabIconColour : theme.TabButtonInactiveColour
        },
        homeIconContainer: {
            flexDirection: "column",
            alignItems: "center",
            
        },
        homeIconText: {
            color: activeTab == "Home" ? theme.TabIconColour : theme.TabButtonInactiveColour,
            fontWeight: "500",
            fontSize: 9,
            
        },
        settingsIconText: {
            color: activeTab == "Settings" ? theme.TabIconColour : theme.TabButtonInactiveColour,
            fontWeight: "500",
            fontSize: 9,
            
        },
        settinsIconContainer: {
            flexDirection: "column",
            alignItems: "center",
            
        },
         settingsImage: {
            width: 24,
            height: 24,
            tintColor: activeTab=="Settings" ? theme.TabIconColour : theme.TabButtonInactiveColour
        },


       
      });


 