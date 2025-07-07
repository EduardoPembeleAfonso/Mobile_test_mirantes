import { Stack } from 'expo-router';
import 'react-native-reanimated';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';


export default function AuthLayout() {

    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="accountCreated" options={{ headerShown: false }} />
        </Stack>
    );
}
