#### dependencys
https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js
https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js
https://cdnjs.cloudflare.com/ajax/libs/immutable/3.7.6/immutable.min.js
https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min.js
https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js
https://cdnjs.cloudflare.com/ajax/libs/randomcolor/0.4.4/randomColor.min.js


# windows 下需执行 npm run dist2
# npm install -g win-node-env
# npm install -g cross-env

# 新建项目
$ sudo npm install -g npx
$ sudo npm install -g create-react-app
$ npx create-react-app rock-reack
$ cd rock-reack && npm start 

# 新建一个 Button 组件
index.js Button.js

# 启动
npm start

# 打包(生成 dist 文件夹)
npm run dist

# 优化(生成 build 文件夹)
npm run build

# 发布到 npmjs.org (发布前先执行 $ npm run dist)
npm publish

# ENOSPC: System limit for number of file watchers reached
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# 查看最新版本
npm info reack-button version


### Analyzing the Bundle Size
npm install --save source-map-explorer
yarn add source-map-explorer

npm run build
npm run analyze





### Babel
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

const Clock = React.createClass({
    
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

const mountNode = document.getElementById('i-am-root');
ReactDOM.render(<Clock />, mountNode);

