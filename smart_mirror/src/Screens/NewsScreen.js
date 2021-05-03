import React from "react";

import Clock from "../Components/Clock/Clock";
import News from "../Components/News/News";

import moment from "moment";

import { Col, Row} from "react-bootstrap";

const config = require('../config/config')
const phrases = require('../local/en-US.json');

config.language ? moment.locale(config.language) : moment.locale('en');

export default class NewsScreen extends React.Component {
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
            isRecording: false,
            message: {
                text: 'No messages set',
                visible: false,
            },
            visibility: {
                news: true,
                clock: true,
            },
        };
    }

    handleMessage(message) {
        message = JSON.parse(message.data);
        console.log(message);
        const data = message.data;
        switch (message.event) {
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
            news;
        if(config.modules.dateTime === true) {
            dateTime = (
                <Clock
                    visible={this.state.visibility.clock}
                    /*showTemperature={config.modules.tempPirSensor}*/ //can be used when temp Sensor data is ready
                />
            );
        }
        if(config.modules.news === true) {
            news = (
            <News
                visible={this.state.visibility.news}
            />
            );
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
            <div style={AppStyles} className="NewsScreen">

                <Row className="Container">
                    <Col xs={4}>
                        <Row style={{marginLeft: 20}}>{dateTime}</Row>
                    </Col>
                    <Col xs={4} />
                    <Col xs={4}>
                        <Row style={{marginLeft: 20}}>{news}</Row>
                    </Col>
                </Row>
                <Row style={{ height: '1%' }} />
            </div>
        );
    }
}
