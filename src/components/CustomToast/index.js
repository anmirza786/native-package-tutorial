import { Text, View } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import THEME from '../../config/theme';

const CustomToast = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: THEME.COLORS.SUCCESS,
        borderColor: THEME.COLORS.SUCCESS,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        color: THEME.COLORS.WHITE,
      }}
      text2Style={{
        fontSize: 15,
        color: THEME.COLORS.WHITE,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: THEME.COLORS.ERROR,
        borderColor: THEME.COLORS.ERROR,
      }}
      text1Style={{
        fontSize: 17,
        color: THEME.COLORS.WHITE,
      }}
      text2Style={{
        fontSize: 15,
        color: THEME.COLORS.WHITE,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export default CustomToast;
