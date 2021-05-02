/*import React, { Component } from "react";

class gestures extends Component {
    constructor(props) {
        super(props.);
    }

    showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            console.log(text)
            alert(text)
        };
        reader.readAsText(e.target.files[0])
    }
}*/

import React from "react";
import gesture_text from 'gesture_text.txt' //import the txt file here + add path

export default function gesture() {
    fetch(gesture_text)
        .then(r => r.text())
        .then(text => {
            console.log('text decoded:', text)
        });
}

