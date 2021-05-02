import React from "react";

import Weather from "../Components/Weather/Weather";
import Clock from "../Components/Clock/Clock";

import moment from "moment";

import { Col, Row} from "react-bootstrap";

const config = require('../config/config')
const phrases = require('../local/en-US.json');

config.language ? moment.locale(config.language) : moment.locale('en');

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        let s = new WebSocket('ws://' + config.wsServerBaseURL);
        s.onmessage = this.handleMessage.bind(this);
        s.addEventListener('error', m => console.log(m));
        s.addEventListener('open', m => {
            console.log(m);
            s.send({ event: 'connect', data: 'Hey there' });
        });
        this.state = {
            temperature: '22.6',
            isRecording: false,
            message: {
                text: 'No messages set',
                visible: false,
            },
            visibility: {
                news: true,
                forecasts: true,
                article: false,
                weather: true,
                clock: true,
                temperatureGraph: false,
            },
        };
    }

    handleMessage(message) {
        message = JSON.parse(message.data);
        console.log(message);
        const data = message.data;
        switch (message.event) {
            case 'temperature':
                this.setState({
                    temperature: data.temperature,
                });
                break;
            case 'recording':
                this.setState({
                    isRecording: message.data.isRecording,
                });
                break;
            case 'motion':
                if (!this.state.message.visible) {
                    this.setState({
                        message: {
                            text: data.message,
                            visible: true,
                        },
                    });
                    setTimeout(() => {
                        this.setState({
                            message: {
                                visible: false,
                            },
                        });
                    }, 10000);
                }
                break;
            case 'visibility':
                const prevStateVisibility = this.state.visibility;
                prevStateVisibility[data.component] = data.visible;
                this.setState({
                    visibility: prevStateVisibility,
                });
                break;
            case 'command':
                this.refs[data.component].onEvent(data);
                break;
            default:
                console.log('Unhandled event: ' + message.event);
                break;
        }
    }

    render() {
        let dateTime,
            weather
        if(config.modules.dateTime === true) {
            dateTime = (
                <Clock
                    temperature={this.state.temperature}
                    visible={this.state.visibility.clock}
                    /*showTemperature={config.modules.tempPirSensor}*/ //can be used when temp Sensor data is ready
                />
            );
        }
        if (config.modules.weather === true) {
            weather = <Weather visible={this.state.visibility.weather} phrases={phrases} />;
        }

        const AppStyles = {
            fontSize: config.styles.textScale,
            fontFamily: config.styles.fontFamily,
            fontWeight: config.styles.fontWeight,
            paddingTop: config.styles.paddingTop,
            paddingLeft: config.styles.paddingLeft,
            paddingRight: config.styles.paddingRight,
            paddingBottom: config.styles.paddingBottom,
        };

        return (
            <div style={AppStyles} className="App">

                <Row className="Container">
                    <Col xs={4}>
                        {dateTime}
                    </Col>
                    <Col xs={4} />
                    <Col xs={4}>
                        <Row>{weather}</Row>
                    </Col>
                </Row>
                <Row style={{ height: '1%' }} />
            </div>
        );
    }
}
