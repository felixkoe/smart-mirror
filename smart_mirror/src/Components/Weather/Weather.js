import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { getCurrentWeather, fileFromInt} from "../../lib/smhi";

import day1 from '../../resources/weather-icons/1_day.png';

console.log(day1);

const styles = {
    container: {},
    weather: {
        color: 'white',
        fontSize: '1.8em',
        margin: 0,
        textAlign: 'right',
    },
    weatherImg: {
        maxWidth: '50%',
        height: '170px',

    },
};

export default class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weather: {},
        };
        this.refreshWeather = this.refreshWeather.bind(this);
        this.handleNewWeather = this.handleNewWeather.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.refreshWeather(), 1000 * 60 * 10);
        this.refreshWeather();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    refreshWeather() {
        getCurrentWeather()
            .then(this.handleNewWeather)
            .catch(err => console.log(err));
    }

    handleNewWeather(weather) {
        this.setState({
            weather: weather,
        });
    }

    render() {
        let weatherSymbol;
        if (this.state.weather.weatherSymbol) {
            weatherSymbol = (
                <img
                    style={styles.weatherImg}
                    role="presentation"
                    src={require('../../resources/weather-icons/' + fileFromInt(this.state.weather.weatherSymbol))}
                />
            );
        } else {
            weatherSymbol = (
                <img
                    style={styles.weatherImg}
                    role="presentation"
                    src={day1}
                />
            );
        }
        let windDirectionSymbol;
        if (this.state.weather.windDirection) {
            windDirectionSymbol = (
                <img
                    style={{
                        position: 'absolute',
                        right: 40,
                        textAlign: 'right',
                        marginTop: 20,
                        marginLeft: 0,
                        maxWidth: '16%',
                        height: 'auto',
                        WebkitTransform: 'rotate(' + this.state.weather.windDirection + 'deg)',
                    }}
                    role="presentation"
                    src={require('../../resources/weather-icons/wind_arrow.png')}
                />
            );
        } else {
            windDirectionSymbol = null;
        }

        return (
            <div hidden={!this.props.visible} style={styles.container}>
                <Row>
                    <Col xs={4}>
                        <p style={styles.weather}>Current: {this.state.weather.temp}22.6 °C</p>
                        <p style={styles.weather}>
                            Feels like:{this.props.phrases.feels_like} {this.state.weather.windChill} 20.0 °C
                        </p>
                        <p style={styles.weather}>
                            {this.props.phrases.wind_speed} {this.state.weather.windVelocity}Wind: 0.3 m/s
                        </p>
                        {windDirectionSymbol}
                    </Col>
                    <Col style={{ textAlign: 'right', paddingLeft: 0, marginTop:-100, marginRight: 230}} xs={4}>
                        {weatherSymbol}
                    </Col>
                </Row>
            </div>
        );
    }
}
