import React from "react";

//TODO: - Make News self-scrollable
//      - Add clock on every page at the top (small)
//      - create working API for weather and forecast
//      - render pictograms for forecast + restyle

import HomeScreen from "./Screens/HomeScreen";
import NewsScreen from "./Screens/NewsScreen";
import Forecast from "./Components/Weather/Forecast";

export default function App() {
    return (
        <div>
            <Forecast/>
        </div>
    )
}

