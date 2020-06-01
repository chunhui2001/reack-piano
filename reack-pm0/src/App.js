import React, { Component } from 'react';
import A1 from './_components/a1/A1';

// https://medium.com/codingthesmartway-com-blog/getting-started-with-material-ui-for-react-material-design-for-react-364b2688b555
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="App">
        <A1>a1</A1>
        <AppBar position="static">
            <Toolbar>
                <Typography color="inherit">
                React & Material-UI Sample Application
                </Typography>
            </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default App;
