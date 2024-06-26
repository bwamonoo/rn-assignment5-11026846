import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import MyCardsScreen from './screens/MyCardsScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      setIsDarkTheme(theme === 'dark');
    })();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    AsyncStorage.setItem('theme', !isDarkTheme ? 'dark' : 'light');
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={isDarkTheme ? DarkTheme : DefaultTheme}>
        <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'My Cards') {
                  iconName = 'wallet';
                } else if (route.name === 'Statistics') {
                  iconName = 'chart-bar';
                } else if (route.name === 'Settings') {
                  iconName = 'cog';
                }

                return <Icon name={iconName} color={color} size={size} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="My Cards" component={MyCardsScreen} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} />
            <Tab.Screen name="Settings">
              {(props) => (
                <SettingsScreen {...props} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
