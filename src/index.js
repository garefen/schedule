import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import App from './App';
import Alert from './components/Alert'
import * as serviceWorker from './serviceWorker';

const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
}

const Root = () => {
    return (
        <AlertProvider template={Alert} {...options}>
            <App />
        </AlertProvider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.register();
