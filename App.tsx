import { init } from 'rn-okto-sdk';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigtion';

init(process.env.EXPO_PUBLIC_CLIENT_API_KEY!)

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
