import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scroll: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
    paddingHorizontal: 0,
    backgroundColor: '#0c3d84'
  },
  courseItem: {
    width: '50%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 5,
    paddingBottom: 10,
    paddingRight: 5,
    borderColor: 'transparent'
  },
  courseItemLast: {
    width: '25%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 2,
    paddingBottom: 4,
    paddingRight: 2,
    borderColor: 'transparent'
  },
  courseItemNext: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    aspectRatio: 16 / 9,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0
  },
  courseItemEven: {
    borderLeftWidth: 0
  },
  darkBlock: {
    backgroundColor: 'rgba(0, 16, 31, 0.8)',
    width: '100%',
    height: '100%',
    borderRadius: 3
  },
  courseItemActive: {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#24bf53'
  },
  courseItemInner: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  text: {
    color: '#FFF',
    paddingHorizontal: 10,
    fontFamily: 'LatoBold',
    fontSize: 12,
    textAlign: 'center'
  },
  headlineWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20
  },
  headline: {
    color: '#fffcf9',
    fontSize: 16,
    fontFamily: 'LatoBlack'
  },
  seasonText: {
    backgroundColor: '#3366b1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 3,
    fontFamily: 'LatoRegular'
  },
  sticker: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickerBuy: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickerIcon: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute', 
    top: 5, 
    right: 6
  },
  ImageParam: {
    flex: 1, 
    alignSelf: 'stretch',
    width: null,
    height: null,
    borderRadius: 3
  },
  ImageParamNext: {
    borderRadius: 0
  },
  TriangleShapeCSS: {
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

  progessBar: {
    backgroundColor: 'rgba(34, 191, 86, 0.8)',
    width: '45%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    zIndex: 2,
    position: 'absolute',
    borderBottomLeftRadius: 3
  },
  progressBarTitle: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    zIndex: 5,
    position: 'absolute',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
  shadowSet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    backgroundColor: '#0c3c82',
    elevation: 7,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1
  },
  alignEnd: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1
  },
  textBlockParam: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    textAlignVertical: 'center', 
    padding: 5,
    minHeight: 40,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
  finalCourceWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 12,
    marginRight: 12,
    position: 'relative'
  },
  finalCourceWrapperShadow: {
    backgroundColor: 'rgba(0, 16, 31, 0.7)',
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 4,
    position: 'absolute',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
  finalCourceText: {
    color: '#FFF',
    fontFamily: 'LatoBold',
    fontSize: 11
  },
  finalCourceIconWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 4,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '42%',
    zIndex: 1,
    alignItems: 'center'
  },
  finalCourceIcon: {
    color: '#7ef2a3',
    fontSize: 27,
    textAlign: 'center',
    paddingLeft: 10,
    paddingTop: 5
  },
  headerContent: {
    flexWrap: 'wrap', 
    flexDirection: 'row', 
    alignItems: 'center', 
    alignSelf: 'flex-end' 
  },
  topIconText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'LatoSemibold'
  },
  topIcon: {
    color: '#FFF',
    fontSize: 20,
    paddingLeft: 8
  },
  headerBackground: {
    position: 'absolute', 
    alignSelf: 'stretch', 
    width: '100%', 
    height: 120, 
    zIndex: 1, 
    elevation: 5 
  },
  headerBody: {
    backgroundColor: 'transparent', 
    height: 56,
    paddingLeft: 16,
    paddingTop: 20,
    paddingRight: 16, 
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  rows: {
    flexWrap: 'wrap', 
    flexDirection: 'row', 
    alignItems: 'center', 
    alignSelf: 'flex-end' 
  },
  daysSliderWrapper: {
    //left: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row', 
    overflow: 'hidden', 
    marginVertical: 20 
  },
  activeDayBtn: {
    width: 90, 
    justifyContent: 'center', 
    alignItems: 'center',
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'white'
  },
  activeDay: {
    textAlign: 'center', 
    fontSize: 14, 
    fontFamily: 'LatoBold', 
    color: 'black'
  },
  inactiveDayBtn: {
    marginLeft: 20,
    width: 40, 
    justifyContent: 'center', 
    alignItems: 'center',
    height: 40,
    borderRadius: 40 / 2,
    borderWidth: 1, 
    borderColor: 'white'
  },
  inactiveDay: {
    textAlign: 'center', 
    fontSize: 14, 
    fontFamily: 'LatoBold', 
    color: 'white'
  }

});
