import React from 'react';
import {
	View,
	Text,
	Alert,
	ActivityIndicator,
	StatusBar,
	TouchableOpacity,
	TouchableNativeFeedback,
	StyleSheet
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {
	emailChanged,
	passwordChanged,
	loginUser,
	googleLogin,
	facebookLogin
} from '../../actions';
import {
	Input,
	Loader,
	HeaderBackground2,
	Header,
	Title,
	Left,
	TopIcon
} from '../../components/common';
import OlimpIcon from '../../styles/Icons';

class AuthScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputName: '',
			inputEmail: '',
			emailError: null,
			passwordError: null,
			isLoading: false,
			showActivity: false
		};
	}
	componentDidUpdate(prevProps) {
		const { error, isLoggedIn } = this.props;
		if (!prevProps.error && error) {
			this.dropdown.alertWithType('error', 'Ошибка', error);
		}

		if (isLoggedIn && this.props.user) {
			this.initLoader();
			setTimeout(() => {
				this.props.navigation.navigate('Common');
			}, 3000);
		}
		
	}

	onGoogleLogin() {
		googleLogin();
	}
	onEmailChanged(text) {
		this.props.emailChanged(text);
		if (this.props.email) {
			this.setState(() => ({ emailError: null }));
		}
	}
	onPasswordChanged(text) {
		this.props.passwordChanged(text);
		if (this.props.password) {
			this.setState(() => ({ passwordError: null }));
		}
	}
	facebookLogin() {
		this.setState({
			isLoading: true
		});
		facebookLogin();
	}
	checkInputFieldsAndPress() {
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
		} else {
			this.props.loginUser({ email, password });
		}
	}
	renderButton() {
		if (this.props.loading) {
			return <Loader style={{ marginTop: 20 }} size='small' color='white' />;
		}
		return (
			<TouchableNativeFeedback
				onPress={this.checkInputFieldsAndPress.bind(this)}
				background={TouchableNativeFeedback.SelectableBackground()}
			>
				<View style={styles.button}>
					<Text style={styles.buttonText}>
						{'Войти'.toUpperCase()}
					</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}
	initLoader() {
		return (
				<View style={{ 
					flex: 1, 
					backgroundColor: '#FFF', 
					justifyContent: 'center', 
					alignItems: 'center' 
				}}>
					<Loader />
				</View> 
			);
	}
	render() {
		const { loginWrapper, inputStyle } = styles;
		return (
			<View style={{ flex: 1 }}>
			<StatusBar animated translucent backgroundColor="transparent" />
				<View style={loginWrapper}>
					<Text
						style={{
							fontSize: 18,
							marginTop: 10,
							color: '#FFF',
							paddingBottom: 20,
							fontFamily: 'LatoBold'
						}}
					>
						{'Покори Олимп'.toUpperCase()}
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
					<Text style={{ color: '#FFF', marginVertical: 10 }}>
						Войти через соц.сети
					</Text>
					<View
						style={{
							flexDirection: 'row',
							paddingTop: 10,
							justifyContent: 'space-around',
							width: 300
						}}
					>
						<View style={{ width: '50%' }}>
							<Icon.Button
								name='facebook'
								backgroundColor='#3b5998'
								onPress={this.facebookLogin.bind(this)}
							>
								Facebook
							</Icon.Button>
						</View>
						<View style={{ marginLeft: 10, width: '50%' }}>
							<Icon.Button
								name='google'
								backgroundColor='#ea4335'
								onPress={this.onGoogleLogin.bind(this)}
							>
								Google
							</Icon.Button>
						</View>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'space-around',
							justifyContent: 'center',
							marginVertical: 30
						}}
					>
						<TouchableOpacity
							style={{ paddingLeft: 5 }}
							onPress={() =>
								this.props.navigation.navigate('ForgotPassword')
							}
						>
							<Text
								style={{
									fontFamily: 'LatoBlack',
									color: 'white',
									textDecorationLine: 'underline'
								}}
							>
								Забыли пароль?
							</Text>
						</TouchableOpacity>
					</View>
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
		backgroundColor: '#0c3d84',
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
		marginVertical: 5,
		paddingVertical: 8
	},
	buttonText: {
		fontSize: 14,
		color: '#FFF',
		fontFamily: 'LatoBold',
		textAlign: 'center'
	},
	icon: {
		color: 'white',
		fontSize: 42
	}
});

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, user, isLoggedIn } = auth;
	return { email, password, error, loading, user, isLoggedIn };
};

export default connect(mapStateToProps, {
	emailChanged,
	passwordChanged,
	loginUser
})(AuthScreen);
