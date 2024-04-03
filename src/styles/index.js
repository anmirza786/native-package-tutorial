import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../config/theme';

// Get the height of the screen
const screenHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  spinner: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 1,
    width: '100%',
    height: screenHeight,
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  textInputWraper: {
    borderRadius: 5,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: THEME.COLORS.INPUT_GRAY,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrappedInput: {
    color: THEME.COLORS.BLACK,
    flex: 1,
  },
  textInput: {
    borderRadius: 5,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    backgroundColor: THEME.COLORS.INPUT_GRAY,
    color: THEME.COLORS.BLACK,
  },
  actionBtn: {
    marginTop: 30,
    backgroundColor: THEME.COLORS.PRIMARY,
    padding: 10,
    borderRadius: 84,
    height: 57,
    justifyContent: 'center',
  },
  actionBtnLight: {
    marginTop: 30,
    backgroundColor: THEME.COLORS.GRAY_LIGHT,
    padding: 10,
    borderRadius: 84,
    height: 57,
    justifyContent: 'center',
  },
  actionBtnText: {
    color: THEME.COLORS.WHITE,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  actionBtnLightText: {
    color: THEME.COLORS.WHITE,
  },
  rowContainerSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainerCenterALign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  strongText: {
    fontWeight: 'bold',
  },
  centerAlignSelf: {
    alignSelf: 'center',
  },
  snackBarError: {
    marginBottom: '5%',
    backgroundColor: THEME.COLORS.ERROR,
    borderRadius: 5,
  },

  snackBarSuccess: {
    marginBottom: '5%',
    backgroundColor: THEME.COLORS.SUCCESS,
    borderRadius: 5,
  },

  snackBarWarning: {
    marginBottom: '5%',
    backgroundColor: THEME.COLORS.WARNING,
    borderRadius: 5,
  },

  MessageSnackBarTexts: {
    marginTop: 10,
  },

  container: {
    height: '100%',
    backgroundColor: THEME.COLORS.WHITE,
  },
  screenContainer: {
    flex: 1,
  },
  fullWidthContainer: {
    height: '100%',
    backgroundColor: THEME.COLORS.WHITE,
  },

  containerContent: {
    paddingHorizontal: 25,
  },

  paddingHorizontal: {
    paddingHorizontal: 25,
  },

  buttonIcon: {
    marginTop: 2,
    fontSize: 15,
    color: THEME.COLORS.WHITE,
  },
  primaryButtonText: {
    color: THEME.COLORS.WHITE,
    fontSize: 20,
  },
  outlinedButtonText: {
    color: THEME.COLORS.PRIMARY,
    fontSize: 20,
  },
  bottomSheet: {
    backgroundColor: THEME.COLORS.WHITE,
    padding: 16,
    height: '100%',
    alignContent: 'center',
  },
  professionalBtn: {
    backgroundColor: THEME.COLORS.PRIMARY_BUTTON,
  },
  customerBtn: {
    borderColor: THEME.COLORS.PRIMARY_BUTTON,
  },

  dropDown: {
    placeholderStyle: {
      fontSize: 14,
      fontWeight: '400',
      color: 'gray',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: THEME.COLORS.PRIMARY,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    dropdown: {
      height: 50,
      borderColor: THEME.COLORS.GRAY_DARK,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 8,
      marginTop: 5,
      marginBottom: 3,
    },
  },
  modal: {
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    modalView: {
      backgroundColor: THEME.COLORS.WHITE,
      padding: 30,
      borderRadius: 10,
      maxWidth: '90%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      gap: 20,
    },
    closeContainer: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    modalClose: {
      fontSize: 25,
      color: THEME.COLORS.GRAY,
    },
  },
  notificationBadge: {
    backgroundColor: '#FF8A00',
    zIndex: 1,
    height: 10,
    width: 10,
    position: 'absolute',
    borderRadius: 5,
    right: 1,
    top: 1,
  },
  imageContainer: {
    // width: '100%',
    // height: 'auto',
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    padding: 5,
    borderColor: THEME.COLORS.GRAY_DARK,
    borderStyle: 'dashed',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});
