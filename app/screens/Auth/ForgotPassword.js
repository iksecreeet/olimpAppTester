import React from 'react';
import { 
	View, 
	Text,
	TouchableOpacity, 
	StyleSheet
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { emailChanged, resetPassword } from '../../actions';
import { 
	Input,
	HeaderBackground2,
	Header,
	Title, 
	Left,
	TopIcon, 
	Loader 
} from '../../components/common';

class ForgotPassword extends React.Component {
	constructor(props) {
	super(props);

	this.state = {
		emailError: null,
		isLoading: false,
		isModalVisible: false
	};
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.signedIn !== nextProps.signedIn) {
			this.props.navigation.navigate('Home');
		}
	}
	onEmailChanged(text) {
		this.props.emailChanged(text);
	}
	onButtonPress() {
		const { email } = this.props;
		if (email === '') {
			this.setState(() => ({ emailError: 'Пожалуйста заполните поле e-mail.' }));
		}
		else {
			this.props.resetPassword({ email });
		}	
	}
	renderButton() {
		if (this.props.loading) {
			return <Loader size='small' color='white' />;
		}
		if (!this.props.loading) {
		return (
			<TouchableOpacity
				onPress={this.onButtonPress.bind(this)}
				style={styles.button}
			>
			<Text style={styles.buttonText}>
				Сбросить пароль
			</Text>
			</TouchableOpacity>
		);	
		}
	}

	render() {
		const { loginWrapper, inputStyle } = styles;
		if (this.props.reset) {
			alert('Ссылка для сброса отправлена на ваш email.');
		}
		return (
			<View style={{ flex: 1 }}>
			<View style={loginWrapper}>
			
				<Text
					lineNumbers={1}
					style={{
						fontSize: 20,
						color: '#FFF',
						paddingBottom: 30,
						fontFamily: 'LatoBold'
					}}
				>
					{'Восстановление пароля'.toUpperCase()}
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
				{this.renderButton()}

				<Text style={{ color: 'red', marginVertical: 10 }}>
					{this.props.errorsign}
				</Text>
			</View>
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
		paddingVertical: 8,
		paddingHorizontal: 8,
		fontSize: 14,
		marginVertical: 5
	},
	button: {
		width: 300,
		backgroundColor: '#24bf53',
		borderRadius: 6,
		marginVertical: 10,
		paddingVertical: 12
	},
	buttonText: {
		fontSize: 16,
		color: '#FFF',
		fontFamily: 'LatoBold',
		textAlign: 'center'
	}
});

const mapStateToProps = ({ auth }) => {
	const { email, error, loading, errorsign, reset } = auth;
	return { email, error, loading, errorsign, reset };
};

export default connect(mapStateToProps, { 
	emailChanged, resetPassword 
})(ForgotPassword);
