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

const Digit = React.createClass({
    
    shouldComponentUpdate: function (nextProps) {
        return nextProps.data !== this.props.data;
    },

    render: function() {
        
        const colors = randomColor({count: 15});
        const segments = _.zipWith(this.props.data.toArray(), colors, (active, color) => {
            return {
                active: active,
                color: color
            };
        });
        
        return (
            <div className="digit">
                {segments.map((segment) => <Segment {...segment} />)}
            </div>
        );
    }
});

const DigitClock = React.createClass({
    
    getInitialState: function() {
        return {
            time: moment()
        };
    },
    
    componentDidMount: function() {
        this.interval = setInterval(this.updateTime, 1000);
    },
    
    componentWillUnmount: function() {
        clearInterval(this.interval);
        delete(this.interval);
    },
    
    updateTime: function() {
        this.setState({
            time: moment()
        });
    },
    
    render: function() {
        const time = this.state.time.format('HH:mm:ss').split('');
        
        return (
            <div className="clock">
                {time.map((digit) => <Digit data={digits.get(digit)} />)}
            </div>
        );
    }
});

export default DigitClock;
