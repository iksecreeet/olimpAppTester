import React from 'react';
import { 
	View, 
	Text,
	StatusBar,
	TouchableOpacity,
	ActivityIndicator, 
	StyleSheet
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, signInUser } from '../../actions';
import { 
	Input,
	HeaderBackground2,
	Header,
	Title, 
	Left,
	TopIcon, 
	Loader 
} from '../../components/common';
import OlimpIcon from '../../styles/Icons';

class SignIn extends React.Component {
	constructor(props) {
	super(props);
	this.AnimationFinish = this.AnimationFinish.bind(this);
	this.state = {
		progress: false,
		isVisible: false,
		emailError: null,
		nameError: null,
		passwordError: null,
		isLoading: false,
		isModalVisible: false
	};
	}
	componentDidUpdate(prevProps) {
		const { errorsign, isLoggedIn } = this.props;
		if (!prevProps.errorsign && errorsign) {
			this.dropdown.alertWithType('error', 'Ошибка', errorsign);
		}
		if (isLoggedIn) {
			this.AnimationFinish();
		}
	}
	/*componentWillReceiveProps(nextProps) {
		if (this.props.signedIn !== nextProps.signedIn) {
			this.AnimationFinish();
		}
	}*/
	onEmailChanged(text) {
		this.props.emailChanged(text);
	}
	onPasswordChanged(text) {
		this.props.passwordChanged(text);
	}
	onButtonPress() {
		const { email, password } = this.props;
		if (email === '' || password === '') {
			if (email === '') {
				this.setState({
				emailError: 'Пожалуйста заполните поле e-mail.',
			});
			}
			if (password === '') {
				this.setState({
				passwordError: 'Пожалуйста заполните поле пароль.'
			});
			}
		}
		else {
			this.props.signInUser({ email, password });
		}	
	}
	/*ShowAlertWithDelay=()=>{
		setTimeout(){
	 
		  //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
		  Alert.alert("Alert Shows After 5 Seconds of Delay.")
	 
		}, 5000);
 
  }*/
	renderButton() {
		if (this.props.loading) {
			return <Loader style={{ marginTop: 20 }} size='small' color='white' />;
		}
		if (!this.props.loading) {
		return (
			<TouchableOpacity
				onPress={this.onButtonPress.bind(this)}
				style={styles.button}
			>
			<Text style={styles.buttonText}>
				Зарегистрироваться
			</Text>
			</TouchableOpacity>
		);	
		}
	}
	AnimationFinish() {
			this.setState({ 
				isVisible: true,
			});
			setTimeout(() => {
				this.props.navigation.navigate('Common');
			}, 5000);
	}
	render() {
		const { loginWrapper, inputStyle } = styles;
		return (
			<View style={{ flex: 1 }}>
			<StatusBar animated translucent backgroundColor="transparent" />
			<View style={loginWrapper}>
			
				<Text
					style={{
						fontSize: 20,
						color: '#FFF',
						paddingBottom: 30,
						fontFamily: 'LatoBold'
					}}
				>
					{'Регистрация'.toUpperCase()}
				</Text>
				<Input
					style={inputStyle}
					autoCorrect={false}
					underlineColorAndroid='transparent'
					label='E-mail'
					placeholder='почта@mail.ru'
					value={this.props.email}
					onChangeText={this.onEmailChanged.bind(this)}
				/>
				<Text style={{ color: 'white', marginVertical: 5 }}>
						{this.state.emailError}
					</Text>
				<Input
					style={inputStyle}
					secureTextEntry
					underlineColorAndroid='transparent'
					label='Пароль'
					autoCorrect={false}
					value={this.props.password}
					onChangeText={this.onPasswordChanged.bind(this)}
				/>
				<Text style={{ color: 'white', marginVertical: 5 }}>
						{this.state.passwordError}
					</Text>
				{this.renderButton()}
			</View>
			<DropdownAlert 
				updateStatusBar={false}
				useNativeDriver
				defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
				activeStatusBarBackgroundColor="#133a72" 
				ref={ref => (this.dropdown = ref)} />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loginWrapper: {
		backgroundColor: '#0c3d84',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputStyle: {
		width: 300,
		backgroundColor: '#f2f2f2',
		paddingVertical: 5,
		paddingHorizontal: 5,
		fontSize: 14,
		marginVertical: 5
	},
	button: {
		width: 300,
		backgroundColor: '#24bf53',
		borderRadius: 6,
		marginVertical: 10,
		paddingVertical: 8
	},
	buttonText: {
		fontSize: 14,
		color: '#FFF',
		fontFamily: 'LatoBold',
		textAlign: 'center'
	}
});

const mapStateToProps = ({ auth }) => {
	const { email, password, errorsign, loading, signedIn, isLoggedIn, user } = auth;
	return { email, password, errorsign, loading, signedIn, isLoggedIn, user };
};

export default connect(mapStateToProps, { 
	emailChanged, passwordChanged, signInUser 
})(SignIn);
