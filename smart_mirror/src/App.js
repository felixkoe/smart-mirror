import React, { Component } from "react";
import styled, { createGlobalStyle} from "styled-components";
import Weather from "./Components/Weather/Weather";

/* This is the main file
* it brings together every component of the program and displays it in the wanted order and direction (hopefully)*/

const GlobalStyles = createGlobalStyle`
    body {
      padding: 20px;
      background-color: #000;
      color: aqua;
      @import url('https://fonts.googleapis.com/css?family=Aldrich');
      font-family: 'Aldrich', sans-serif;
    }
    `;

const LeftSidebar = styled.div`
    float: left;
`;

const RightSidebar = styled.div`
  float: right;
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: null,
        };
    }

    componentDidMount() {
        this.getWeather();
        this.weatherInterval = setInterval(() => this.getWeather(), 600000);
    }

    componentWillUnmount() {
        clearInterval(this.weatherInterval);
    }

    getWeather() {
        fetch('http://localhost:4000/weather', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ zip: '20001' }),
        })
            .then(response => {
                return response.json();
            })
            .then(({ data }) => {
                this.setState({
                    weather: {
                        current: {
                            temperature: Math.round(data.current.main.temp),
                            icon: data.current.weather[0].icon,
                        },
                        forecast: data.forecast.map(({ day, hi, low, icon }) => {
                            return {
                                day: new Date(day),
                                hi: Math.round(hi),
                                low: Math.round(low),
                                icon,
                            };
                        }),
                    },
                });
            });
    }

    render() {
        const { weather} = this.state;
        return (
            <div className={App}>
                <GlobalStyles />
                <LeftSidebar className="Left-sidebar">
                    <Clock
                        dateTime={dateTime}
                        timeZone="us-EN"
                        dateOpts={{
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }}
                        timeOpts={{ hour: '2-digit', minute: '2-digit' }}
                    />
                </LeftSidebar>
                <RightSidebar>
                    {weather ? <Weather weather={weather} /> : <div>Loading...</div>}
                </RightSidebar>
            </div>
        );
    }
}

export default App;
