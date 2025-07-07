import { Stack } from 'expo-router';
import 'react-native-reanimated';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';


export default function CreateLayout() {

    return (
        <Stack>
            <Stack.Screen name="createJobs" options={{ headerShown: false }} />
        </Stack>
    );
}
