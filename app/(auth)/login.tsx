// login.tsx
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
    ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import authApiService from '../api/auth/authApiService';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');
    const [isLoading, setIsLoading] = useState(false);


    const validateFields = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Erro", "Por favor, insira um email válido.");
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
            console.log(email, password)
            const res = await authApiService.loginUser(email, password)
            console.log({ res: res?.data })
            router.push("/(tabs)/jobs")
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log({ error: error })
            Alert.alert("Houve um erro ao fazer o login!")
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Cabeçalho azul */}
            <View style={styles.header}>
                <Text style={styles.title}>Olá bem-vindo(a)!</Text>
            </View>

            {/* Card branco */}
            <View style={styles.card}>
                {/* Tabs */}
                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={styles.tabButton}
                        onPress={() => setActiveTab('login')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'login' && styles.tabTextActive,
                            ]}
                        >
                            Iniciar sessão
                        </Text>
                        {activeTab === 'login' && <View style={styles.tabDot} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tabButtonRegiter}
                        onPress={() => {
                            setActiveTab('signup')
                            router.push("/(auth)/register")
                        }}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'signup' && styles.tabTextActive,
                            ]}
                        >
                            Criar conta
                        </Text>
                        {activeTab === 'signup' && <View style={styles.tabDot} />}
                    </TouchableOpacity>
                </View>

                <View style={styles.containerCard}>
                    {/* Email */}
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="Inserir email"
                        placeholderTextColor="#9CA3AF"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                    />

                    {/* Senha */}
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

                    {/* Esqueceu a senha */}
                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
                        <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    {/* Botão Continuar */}
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Continuar</Text>
                        )}
                    </TouchableOpacity>

                    {/* Divider */}
                    <Text style={styles.divider}>Ou entrar com</Text>

                    {/* Botões Sociais */}
                    <View style={styles.socialContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Image
                                source={{
                                    uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_Gmail.png',
                                }}
                                style={styles.socialIcon}
                            />
                            <Text style={styles.socialText}>Gmail</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton}>
                            <Image
                                source={{
                                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png',
                                }}
                                style={styles.socialIcon}
                            />
                            <Text style={styles.socialText}>Linkedin</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Criar conta */}
                    <Text style={styles.footerText}>
                        Não tem uma conta?{' '}
                        <Text style={styles.footerLink}>Criar conta</Text>
                    </Text>
                </View>
            </View>
        </View>
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
        borderTopLeftRadius: 40,
        borderTopRightRadius: 30,
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
        paddingVertical: 20,
        paddingHorizontal: 24,
        width: "100%",
        height: "100%",
        borderTopRightRadius: 40
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
