import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  viewBackground: {
    flex: 1,
    backgroundColor: '#0d3d85',
  },
  coverImage: {
    position: 'absolute',
    alignSelf: 'stretch',
    width: '100%',
    height: 200,
    zIndex: 1
  },
  headerBody: {
    backgroundColor: 'transparent',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  topIconText: {
    color: '#FFF',
    fontSize: 16
  },
  topIcon: {
    color: '#FFF',
    fontSize: 20,
    paddingLeft: 8
  },
  wrappFlex: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingRight: 28
  },
  flexAlign: {
    flex: 1,
    alignSelf: 'center'
  },
  wrappMainTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  mainTitle: {
    width: '80%', 
    fontFamily: 'LatoBlack',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: '#fefff8',
    paddingBottom: 5
  },
  playBlock: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  wrapCourse: {
    flex: 1,
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 16,
  },
  timLineWrapper: {
    borderRadius: 5,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  dayText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'LatoRegular',
    paddingBottom: 15
  },
  durationText: {
    fontFamily: 'LatoBold',
    color: '#c6ddfe',
    fontSize: 20
  },
  playBtnText: {
    marginLeft: 15,
    paddingBottom: 5,
    fontSize: 10,
    color: '#c6ddfe',
    fontFamily: 'LatoRegular'
  },
  playBtnTextNext: {
    marginLeft: 15,
    fontSize: 15,
    color: '#c6ddfe',
    lineHeight: 20,
    fontFamily: 'LatoBold'
  },
  buttonPlay: {
    borderRadius: 50,
    backgroundColor: '#FFF',
    elevation: 4,
    paddingVertical: 12,
    marginBottom: 10
  },
  activityIndicator: {
    backgroundColor: '#0c3d84',
    borderRadius: 50
  },
  nonActivePlayBtn: {
    opacity: 0,
    height: 0
  },
  activePlayBtn: {
    opacity: 1
  },
  // Animated image
  animateImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    resizeMode: 'cover',
  },
  animateView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#17478d',
    overflow: 'hidden',
  },
  animateViewTransform: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0
  }
});
