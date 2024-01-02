import {createStackNavigator} from '@react-navigation/stack';
import {
  AccountPage,
  DetailLookupPage,
  DetailNavigatePage,
  DomainPage,
  HomePage,
  LoginPage,
  LookupPage,
  NavigatePage,
  SearchBusPage,
} from './src/screen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Domain"
            component={DomainPage}
            options={{headerTitle: 'Domain'}}
          />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{headerTitle: 'Đăng nhập'}}
          />
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{headerTitle: 'Trang chủ'}}
          />
          <Stack.Screen
            name="Lookup"
            component={LookupPage}
            options={{headerTitle: 'Chọn tuyến xe'}}
          />
          <Stack.Screen
            name="Navigate"
            component={NavigatePage}
            options={{headerTitle: 'Tìm đường'}}
          />
          <Stack.Screen
            name="DetailNavigate"
            component={DetailNavigatePage}
            options={{headerTitle: 'Hướng dẫn'}}
          />
          <Stack.Screen
            name="DetailLookup"
            component={DetailLookupPage}
            options={{headerTitle: 'Chi tiết'}}
          />
          <Stack.Screen
            name="SearchBus"
            component={SearchBusPage}
            options={{headerTitle: 'Tìm kiếm xe'}}
          />
          <Stack.Screen
            name="Account"
            component={AccountPage}
            options={{headerTitle: 'Tài khoản'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
