import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BomberForm from './components/BomberForm';
import Navbar from './components/Navbar';
import VisitCounter from './components/VisitCounter';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <Navbar />
        <LinearGradient
          colors={['#F8FAFC', '#EDE9FE', '#EEF2FF']}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 48 }}>
            <View style={{ alignItems: 'center', marginBottom: 48 }}>
              <View style={{
                backgroundColor: '#F3E8FF',
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 20,
                marginBottom: 16
              }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#6B21A8' }}>
                  2025 Edition - sms bomber online
                </Text>
              </View>

              <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 24,
                color: '#7C3AED'
              }}>
                Welcome To SMS Bomber
              </Text>

              <Text style={{
                fontSize: 18,
                color: '#4B5563',
                textAlign: 'center',
                lineHeight: 28,
                marginBottom: 24,
                maxWidth: 600
              }}>
                Experience the most powerful SMS bombing service on the internet.
                Perfect for pranking friends with our mobile-friendly and easy-to-use platform.
              </Text>
            </View>

            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: 16,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5,
              borderWidth: 1,
              borderColor: 'rgba(233, 213, 255, 0.5)',
              marginBottom: 24
            }}>
              <BomberForm />
            </View>

            <VisitCounter />

            <View style={{ alignItems: 'center', marginTop: 48 }}>
              <Text style={{ fontSize: 14, color: '#6B7280', opacity: 0.8 }}>
                🔒 Safe & Secure • 100% Anonymous • No Registration Required
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default App;