import {createStackNavigator} from '@react-navigation/stack';
import {
  DetailNavigatePage,
  HomePage,
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
            name="SearchBus"
            component={SearchBusPage}
            options={{headerTitle: 'Tìm kiếm xe'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
