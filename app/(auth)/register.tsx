import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    Dimensions,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import authApiService from '../api/auth/authApiService';

const { height } = Dimensions.get('window');

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const validateFields = () => {
        if (!name.trim()) {
            Alert.alert("Erro", "Por favor, insira o nome da empresa.");
            return false;
        }

        if (!email.trim()) {
            Alert.alert("Erro", "Por favor, insira o email corporativo.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Erro", "Por favor, insira um email válido.");
            return false;
        }

        if (!address.trim()) {
            Alert.alert("Erro", "Por favor, insira o endereço da empresa.");
            return false;
        }

        if (!password.trim()) {
            Alert.alert("Erro", "Por favor, insira uma senha.");
            return false;
        }

        if (password.length < 6) {
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        if (!validateFields()) return;

        setIsLoading(true);
        try {
            await authApiService.signup(email, name, address, password);
            router.push("/(auth)/accountCreated");
        } catch (error) {
            console.log({ error });
            Alert.alert("Houve um erro ao criar a conta!");
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <StatusBar style="light" />

                {/* Cabeçalho azul */}
                <View style={styles.header}>
                    <Text style={styles.title}>Criar uma conta</Text>
                </View>

                {/* Card branco */}
                <View style={styles.card}>
                    {/* Tabs */}
                    <View style={styles.tabs}>
                        <TouchableOpacity
                            style={styles.tabButtonRegiter}
                            onPress={() => router.push('/(auth)/login')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    styles.tabTextActive
                                ]}
                            >
                                Iniciar sessão
                            </Text>
                            <View style={styles.tabDot} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.tabButton}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                ]}
                            >
                                Criar conta
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerCard}>
                        {/* Email */}
                        <Text style={styles.label}>Nome da empresa</Text>
                        <TextInput
                            placeholder="Inserir nome da empresa"
                            placeholderTextColor="#9CA3AF"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                            keyboardType="default"
                        />

                        <Text style={styles.label}>Email corporativo da empresa</Text>
                        <TextInput
                            placeholder="Inserir corporativo da empresa"
                            placeholderTextColor="#9CA3AF"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            keyboardType="email-address"
                        />

                        <Text style={styles.label}>Endereço da empresa</Text>
                        <TextInput
                            placeholder="Inserir endereço da empresa"
                            placeholderTextColor="#9CA3AF"
                            value={address}
                            onChangeText={setAddress}
                            style={styles.input}
                            keyboardType="default"
                        />

                        <Text style={styles.label}>Senha</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder="Inserir senha"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                style={styles.passwordInput}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={22}
                                    color="#9CA3AF"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Botão Continuar */}
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Continuar</Text>
                            )}
                        </TouchableOpacity>

                        {/* Criar conta */}
                        <Text style={styles.footerText}>
                            Não tem uma conta?{' '}
                            <Text style={styles.footerLink}>Criar conta</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B89CE',
    },
    header: {
        height: height * 0.2,
        backgroundColor: '#0B89CE',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'semibold',
        position: 'absolute',
        top: 80,
    },
    card: {
        flex: 1,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 20,
        paddingTop: 50,
        marginTop: -40,
    },
    tabs: {
        flexDirection: 'row',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        paddingBottom: 8,
        backgroundColor: '#fff',
        height: 100,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 30,
    },
    tabButtonRegiter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        paddingBottom: 8,
        backgroundColor: '#0B89CE',
        height: 100
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0B89CE',
    },
    tabTextActive: {
        color: '#fff',
    },
    tabDot: {
        marginTop: 6,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff',
    },
    containerCard: {
        backgroundColor: "#fff",
        paddingVertical: 30,
        paddingHorizontal: 24,
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 40
    },
    label: {
        marginBottom: 8,
        fontSize: 14,
        color: '#374151',
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#F9FAFB',
        marginBottom: 16,
        fontSize: 16,
        height: 52
    },
    passwordContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 8,
        height: 52
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
    },
    forgotText: {
        color: '#0B89CE',
        fontWeight: '600',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#0B89CE',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
        height: 52
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    divider: {
        textAlign: 'center',
        color: '#9CA3AF',
        marginBottom: 16,
        fontSize: 14,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 30,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 52
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    socialText: {
        fontWeight: '600',
        color: '#374151',
        fontSize: 15,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#374151',
    },
    footerLink: {
        color: '#0B89CE',
        fontWeight: 'bold',
    },
});
