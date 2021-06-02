import React from "react";

//already working: HomeScreen, NewsScreen (without API)
//TODO: - Make News self-scrollable
//      - Add clock on every page at the top (small)
//      - create working API for weather and forecast
//      - add calender screen + API
//      - Forecast(Screen)
//      - (Navigation for all screens)

import HomeScreen from "./Screens/HomeScreen";
import NewsScreen from "./Screens/NewsScreen";
import ForecastScreen from "./Screens/ForecastScreen";

export default function App() {
        return (
            <div>
                <HomeScreen/>
            </div>
        )
}

