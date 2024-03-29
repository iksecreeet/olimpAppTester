import React, {Component} from 'react-native';
import Toast from 'react-native-root-toast';

export default class ToastNoConnection extends Component{
    constructor() {
        super(...arguments);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({
            visible: true
        }), 1000); // show toast after 2s

        setTimeout(() => this.setState({
            visible: false
        }), 5000); // hide toast after 5s
    }
    render() {
        return 
        <Toast
            visible={this.state.visible}
            position={50}
            shadow={false}
            animation={false}
            hideOnPress={true}
        >Проверьте подключение к сети. Основные функции будут недоступны
        </Toast>;
    }
}
