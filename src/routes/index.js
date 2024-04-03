// Routes.js
import React from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import THEME from '../config/theme';
import generalStyle from '../styles';
import { useSelector } from 'react-redux';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import UpdateProfile from '../screens/UpdateProfile/index';
import AccountScreen from '../screens/Account';
import ScanDocumentScreen from '../screens/ScanDocument';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import WelcomeScreen from '../screens/Welcome';
import OtpScreen from '../screens/OTP';
import ResetPasswordScreen from '../screens/ResetPassword';
import BottomNav from '../components/BottomNav';
import FilesScreen from '../screens/Files';
import FileViewerScreen from '../screens/FileViewer';
// import { RefreshControl } from 'react-native-gesture-handler';
import { getAlbumsListing } from '../shared/api';
import Toast from 'react-native-toast-message';
import CustomToast from '../components/CustomToast';
import { RefreshControl } from 'react-native-gesture-handler';
import DocScannerComponent from '../components/DcoScannerComponent';

const Stack = createStackNavigator();

const ScrollableContentScreen = ({ children, screenName, onRefresh }) => {
  const showLoader = useSelector(state => state.Theme.showLoader);

  // Define a function to determine the conditional styles based on the screen name
  const getConditionalStyles = () => {
    if (
      screenName === 'DealerInfo' ||
      screenName === 'Maintenance' ||
      screenName === 'DeviceDetail'
    ) {
      return generalStyle.fullWidthContainer; // Assuming you have a style defined for Welcome screen
    }
    // Add more conditions for other screen names if needed
    return generalStyle.container; // Default style
  };

  return (
    <View style={generalStyle.screenContainer}>
      {screenName !== 'Files' ? (
        <ScrollView
          style={[getConditionalStyles()]} // Apply the conditional styles
          keyboardShouldPersistTaps="handled"
          scrollEnabled={!showLoader}
          refreshControl={
            <RefreshControl refreshing={showLoader} onRefresh={onRefresh} />
          }
        >
          {showLoader ? (
            <ActivityIndicator
              size="large"
              color={THEME.COLORS.PRIMARY}
              style={generalStyle.spinner}
            />
          ) : null}

          <View style={generalStyle.containerContent}>{children}</View>
        </ScrollView>
      ) : (
        <View style={getConditionalStyles()}>
          <View style={generalStyle.containerContent}>{children}</View>
        </View>
      )}
      <Toast config={CustomToast} />
      {screenName === 'SignIn' || screenName === 'SignUp' ? null : (
        <>
          <View style={{ height: 80 }} />
          <BottomNav />
        </>
      )}
    </View>
  );
};

const ContentContainer = ({ children }) => {
  return <View style={generalStyle.containerContent}>{children}</View>;
};

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" options={{ headerShown: false }}>
        {props => (
          <ContentContainer>
            <WelcomeScreen {...props} />
          </ContentContainer>
        )}
      </Stack.Screen>
      <Stack.Screen name="SignUp" options={{ headerShown: false }}>
        {props => (
          <ScrollableContentScreen screenName="SignUp">
            <SignUpScreen {...props} />
          </ScrollableContentScreen>
        )}
      </Stack.Screen>
      <Stack.Screen name="SignIn" options={{ headerShown: false }}>
        {props => (
          <ScrollableContentScreen screenName="SignIn">
            <SignInScreen {...props} />
          </ScrollableContentScreen>
        )}
      </Stack.Screen>
      <Stack.Screen name="Scanner" options={{ headerShown: false }}>
        {props => (
          // <MenuDrawer>
          <ScrollableContentScreen screenName="Scanner">
            <ScanDocumentScreen {...props} />
          </ScrollableContentScreen>
          // </MenuDrawer>
        )}
      </Stack.Screen>
      <Stack.Screen name="DocScanner" options={{ headerShown: false }}>
        {props => (
          // <MenuDrawer>
          // <ScrollableContentScreen screenName="DocScanner">
          <DocScannerComponent {...props} />
          // </ScrollableContentScreen>
          // </MenuDrawer>
        )}
      </Stack.Screen>
      <Stack.Screen name="Files" options={{ headerShown: false }}>
        {props => (
          // <MenuDrawer>
          <ScrollableContentScreen
            screenName="Files"
            onRefresh={() => {
              getAlbumsListing();
            }}
          >
            <FilesScreen {...props} />
          </ScrollableContentScreen>
          // </MenuDrawer>
        )}
      </Stack.Screen>
      <Stack.Screen name="FileViewer" options={{ headerShown: false }}>
        {props => (
          // <MenuDrawer>
          <ScrollableContentScreen screenName="FileViewer">
            <FileViewerScreen {...props} isChild={true} />
          </ScrollableContentScreen>
          // </MenuDrawer>
        )}
      </Stack.Screen>
      <Stack.Screen name="Account" options={{ headerShown: false }}>
        {props => (
          <ScrollableContentScreen screenName="Account">
            <AccountScreen {...props} />
          </ScrollableContentScreen>
        )}
      </Stack.Screen>
      <Stack.Screen name="UpdateProfile" options={{ headerShown: false }}>
        {props => (
          // <MenuDrawer>
          <ScrollableContentScreen screenName="UpdateProfile">
            <UpdateProfile {...props} />
          </ScrollableContentScreen>
          // </MenuDrawer>
        )}
      </Stack.Screen>
      <Stack.Screen name="ForgotPassword" options={{ headerShown: false }}>
        {props => (
          <ScrollableContentScreen screenName="ForgotPassword">
            <ForgotPasswordScreen {...props} isChild={true} />
          </ScrollableContentScreen>
        )}
      </Stack.Screen>
      <Stack.Screen name="OTP" options={{ headerShown: false }}>
        {props => (
          <ScrollableContentScreen screenName="OTP">
            <OtpScreen {...props} isChild={true} />
          </ScrollableContentScreen>
        )}
      </Stack.Screen>
      <Stack.Screen name="ResetPassword" options={{ headerShown: false }}>
        {props => (
          <ScrollableContentScreen screenName="ResetPassword">
            <ResetPasswordScreen {...props} isChild={true} />
          </ScrollableContentScreen>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Routes;
