import { router } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function AccountCreatedScreen() {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInUp"
        delay={100}
        duration={800}
        style={styles.card}
      >
        <Animatable.Image
          animation="zoomIn"
          duration={800}
          delay={200}
          source={require('../../assets/images/image.png')}
          style={styles.illustration}
        />
        <Animatable.Text
          animation="fadeIn"
          delay={400}
          style={styles.title}
        >
          Conta criada com sucesso!
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={600}
          style={styles.subtitle}
        >
          Para concluir o processo, é necessário adicionar as informações da empresa.
        </Animatable.Text>
        <Animatable.View animation="fadeInUp" delay={800} style={{ width: "100%" }}>
          <TouchableOpacity style={styles.button}
          onPress={() => router.push("/(tabs)/jobs")}>
            <Text style={styles.buttonText}>Concluir o processo</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  illustration: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0B89CE',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#66707A',
    fontWeight: "500",
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#0B89CE',
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: '100%',
    height: 56,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: '#FEFEFE',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
