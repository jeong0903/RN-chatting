const Colors={
  white: '#ffffff',
  black: '#000000',
  main: '#4C4637',
  grey_0: '#d5d5d5',
  grey_1: '#a6a6a6',
  red: '#F99053',
  bgColor: '#FFF8E7',
  transparent: 'transparent',
};

export const theme={
  background: Colors.bgColor,
  text: Colors.black,
  errorText: Colors.red,

  // Button
  btnBackground: Colors.main,
  btnTitle: Colors.white,
  btnTextLink: Colors.main,
  btnSignout: Colors.red,

  // Image
  imgBackground: Colors.transparent,
  imgBtnBackground: Colors.grey_1,
  imgBtnIcon: Colors.white,

  // Input
  inputBackground: Colors.transparent,
  inputLabel: Colors.grey_1,
  inputPlaceholder: Colors.grey_1,
  inputBorder:Colors.grey_1,
  inputDisabled:Colors.grey_0,

  //Spinner
  spinnerBackground: Colors.black,
  spinnerIndicator: Colors.white,

  //Tab
  tabBtnActive: Colors.main,
  tabBtnInactive: Colors.grey_1,

  //List-Item
  itemBorder: Colors.grey_0,
  itemTime:Colors.grey_1,
  itemDesc:Colors.grey_1,
  itemIcon:Colors.grey_1
};