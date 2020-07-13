import React, { Component } from 'react';
import { Fake } from 'reack-fake';

const moment = Fake('moment');
const Immutable = Fake('Immutable');
const _lodash = Fake('_');
const randomColor = Fake('randomColor');

const digits = Immutable.fromJS({
    '0': [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
    '1': [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    '2': [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    '3': [1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1],
    '4': [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    '5': [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    '6': [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    '7': [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    '8': [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    '9': [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    ':': [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
});

function Segment(props) {

    const style = {
        backgroundColor: props.active ? props.color : 'transparent'
    };

    return (<div className="segment" style={style} />);
}

class Digit extends Component {

    shouldComponentUpdate = (nextProps) => {
        return nextProps.data !== this.props.data;
    }

    render = () => {
        const colors = randomColor({count: 15});
        const segments = _lodash.zipWith(this.props.data.toArray(), colors, (active, color) => {
            return {
                active: active,
                color: color
            };
        });
        
        return (
            <div className="digit">
                {segments.map((segment, i) => <Segment key={i} {...segment} />)}
            </div>
        );
    }
}

export class DigitClock extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            time: props.serverTime
        };
    }

    shouldComponentUpdate = (nextProps) => {
        return nextProps.serverTime !== this.props.serverTime;
    }

    render = () => {
        if (!this.props.serverTime) {
            return null;
        }
        const time = moment(this.state.time).format('HH:mm:ss').split('');
        return (
            <div className="clock">
                {time.map((digit, i) => <Digit key={i} data={digits.get(digit)} />)}
            </div>
        );
    }
}

export default DigitClock;
