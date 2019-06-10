import React, { Component } from 'react';
import { 
	View, 
	Text, 
	ImageBackground, 
	TouchableOpacity, 
	TouchableNativeFeedback,
	Platform,
	StyleSheet
	} from 'react-native';

import Svg, { Path, Symbol, Circle, Image } from 'react-native-svg';

import OlimpIcon from '../styles/Icons';

const CourseItem = ({course}) => {
	const { 
		courseItem,
		ImageParam,
		shadowSet,
		courseItemActive,
		TriangleShapeCSS,
		sticker,
		stickerIcon,
		text,
		textBlockParam,
		progessBar,
		stickerBuy
	} = styles;
	return (
		<TouchableOpacity
	onPress={() =>
		this.props.navigation.navigate("Details", {
			titleName: course.name
		})
	}
	style={courseItem}
	key={course.name}
>
	{course.active === 1 ? (
		<ImageBackground
			resizeMode={"cover"}
			borderRadius={3}
			style={[ ImageParam,shadowSet,courseItemActive ]}
			source={{ uri: course.thumb }}
		>
			<View style={TriangleShapeCSS} />
			{course.purchased === 1 ? (
				<View style={styles.sticker}>
					<OlimpIcon name="o-checkmark" style={stickerIcon} />
				</View>
			) : null}

			<Text style={[text, textBlockParam]}>
				{course.name.toUpperCase()}
			</Text>
		</ImageBackground>
	) : (
		<ImageBackground
			resizeMode={"cover"}
			borderRadius={3}
			style={[ImageParam, shadowSet]}
			source={{ uri: course.thumb }}
		>
			{course.progress === true ? <View style={progessBar} /> : null}
			{course.ordered === 1 ? (
				<View style={sticker}>
					<Svg
						viewBox="0 0 54 99"
						preserveAspectRatio="xMidYMin meet"
						width="35"
						height="38"
					>
						<Path
							d="M453,574h62a10,10,0,0,1,10,10v62a10,10,0,0,0-10-10H473a10,10,0,0,1-10-10V584A10,10,0,0,0,453,574Z"
							transform="translate(-453 -574)"
							fill="rgb(36, 191,83)"
						/>
					</Svg>
					<OlimpIcon name="o-checkmark" style={stickerIcon} />
				</View>
			) : (
				<View style={stickerBuy}>
					<Svg
						viewBox="0 0 150 99"
						preserveAspectRatio="xMidYMin meet"
						width="120"
						height="38"
					>
						<Path
							d="M818,1099h222a10,10,0,0,1,10,10v62a10,10,0,0,0-10-10H838a10,10,0,0,1-10-10v-42A10,10,0,0,0,818,1099Z"
							transform="translate(-818 -1099)"
							fill="rgb(1,29,30, 0.5)"
						/>
					</Svg>
					<Text
						style={{
							fontFamily: "LatoBold",
							position: "absolute",
							top: 1,
							fontSize: 14,
							right: 42,
							color: "#FFF"
						}}
					>
						{course.price}
					</Text>
					<OlimpIcon
						name="o-diamond"
						style={{
							color: "#7ef2a3",
							fontSize: 22,
							position: "absolute",
							top: 1,
							right: 6
						}}
					/>
				</View>
			)}
			<Text
				style={[
					text,
					textBlockParam,
					progressBarTitle
				]}
			>
				{course.name.toUpperCase()}
			</Text>
		</ImageBackground>
	)}
</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
courseItem: {
    width: '50%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 6,
    paddingBottom: 12,
    paddingRight: 6,
    borderColor: 'transparent'
  },
ImageParam: {
	flex: 1,
	alignSelf: 'stretch',
	width: null,
	height: null,
	borderRadius: 3
	},
shadowSet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1
  },
courseItemActive: {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#24bf53'
  },
triangleShapeCSS: {
    width: 0,
    height: 0,
    borderLeftWidth: 35,
    borderRightWidth: 35,
    borderBottomWidth: 50,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(34, 191, 86, 0.7)',
    position: 'absolute',
    top: '30%'
  },
sticker: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 20,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: 'rgba(34, 191, 86, 0.7)'
  },
stickerIcon: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold'
  },
text: {
    color: '#FFF',
    paddingHorizontal: 5,
    fontFamily: 'LatoBold',
    fontSize: 11,
    textAlign: 'center'
  },
textBlockParam: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    padding: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
progessBar: {
    backgroundColor: 'rgba(34, 191, 86, 0.5)',
    width: '45%',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    zIndex: 2,
    position: 'absolute',
    borderBottomLeftRadius: 3
  },
});
export default CourseItem;

