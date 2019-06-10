import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	avatarBody: {
	  position: 'absolute',
      alignSelf: 'flex-start',
      top: 40,
      left: 20
    },
  	avatarImg: {
  		height: 60,
        width: 60,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#b9d3ea'
  	},
	sideBarTop: {
	    height: 120,
	    backgroundColor: '#17478d',
	    width: '100%',
	    
	},
	  sidebarBody: {
	    backgroundColor: '#092754',
	},
	ListData: {
	    marginTop: 20,
	    paddingLeft: 0
	},
	ListDataBottom: {
		marginTop: 20,
		borderTopWidth: 1,
		borderTopColor: '#172f45',
	    paddingTop: 10,
	    paddingBottom: 10,
	    paddingLeft: 0
	},
    listItem: {
	    borderBottomWidth: 0
	},
	StatusText: {
	    position: 'absolute',
	    top: 70,
	    left: 90,
	    fontFamily: 'LatoRegular',
	    fontSize: 14,
	    color: '#b9d3ea'
	},
	NameText: {
	    position: 'absolute',
	    top: 50,
	    left: 90
	}
});
