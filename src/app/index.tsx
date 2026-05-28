import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, Image, Alert, Animated, ImageBackground } from 'react-native';

export default function Index() {
  const [screen, setScreen] = useState<'login' | 'pin' | 'wallet' | 'id_detail'>('login');
  const [pin, setPin] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.06, duration: 2200, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 2200, useNativeDriver: true })
      ])
    ).start();
  }, []);

  const handlePinInput = (value: string) => {
    if (pin.length < 4) {
      const newPin = pin + value;
      setPin(newPin);
      if (newPin === '1234') {
        setTimeout(() => { setScreen('wallet'); setPin(''); }, 200);
      } else if (newPin.length === 4) {
        setTimeout(() => { Alert.alert('Σφάλμα', 'Λανθασμένος κωδικός PIN'); setPin(''); }, 200);
      }
    }
  };

  if (screen === 'login') {
    return (
      <View style={styles.loginContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0052B4" />
        <View style={styles.loginLogoSection}>
          <Animated.View style={[styles.circlePulse, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.loginLogoText}>gov.gr</Text>
            <Text style={styles.loginLogoSubtext}>wallet</Text>
          </Animated.View>
        </View>
        <View style={styles.loginButtonSection}>
          <TouchableOpacity style={styles.btnTaxis} onPress={() => setScreen('pin')}>
            <Text style={styles.btnTaxisText}>Σύνδεση με κωδικούς TaxisNet</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (screen === 'pin') {
    return (
      <SafeAreaView style={styles.pinContainer}>
        <Text style={styles.pinTitle}>Εισάγετε κωδικό PIN</Text>
        <View style={styles.dotsRow}>
          {[1, 2, 3, 4].map((_, index) => <View key={index} style={[styles.dot, pin.length > index && styles.dotFilled]} />)}
        </View>
        <View style={styles.numPad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⬅️'].map((num) => (
            <TouchableOpacity key={num} style={styles.numButton} onPress={() => {
              if (num === 'C') setPin(''); else if (num === '⬅️') setPin(pin.slice(0, -1)); else handlePinInput(num);
            }}>
              <Text style={styles.numText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'wallet') {
    return (
      <SafeAreaView style={styles.walletContainer}>
        <ScrollView contentContainerStyle={styles.walletContent}>
          <Text style={styles.userName}>ΓΕΩΡΓΙΟΣ ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ</Text>
          <TouchableOpacity style={styles.walletCardId} onPress={() => setScreen('id_detail')}>
            <Text style={styles.cardMainTitleId}>Δελτίο Ταυτότητας</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.detailContainer}>
      <TouchableOpacity onPress={() => setScreen('wallet')}><Text style={styles.backArrow}>◀</Text></TouchableOpacity>
      <ScrollView>
        <View style={styles.photoContainer}>
          <Image source={require('../../assets/myphoto.jpeg')} style={styles.idPhotoLive} />
        </View>
        <View style={styles.idDetailsBlock}>
          <Text style={styles.fieldLabel}>ΟΝΟΜΑ</Text>
          <Text style={styles.fieldValue}>ΓΕΩΡΓΙΟΣ</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginContainer: { flex: 1, backgroundColor: '#0052B4', padding: 24 },
  circlePulse: { width: 210, height: 210, borderRadius: 105, borderWidth: 2, borderColor: '#00D2FF', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 82, 180, 0.25)' },
  loginLogoSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loginLogoText: { color: '#FFF', fontSize: 42, fontWeight: 'bold' },
  loginLogoSubtext: { color: '#00D2FF', fontSize: 22 },
  btnTaxis: { backgroundColor: '#00D2FF', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnTaxisText: { color: '#0052B4', fontWeight: 'bold' },
  pinContainer: { flex: 1, backgroundColor: '#0052B4', alignItems: 'center', justifyContent: 'center' },
  pinTitle: { color: '#FFF', fontSize: 20, marginBottom: 30 },
  dotsRow: { flexDirection: 'row', marginBottom: 50 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#FFF', margin: 10 },
  dotFilled: { backgroundColor: '#00D2FF' },
  numPad: { flexDirection: 'row', flexWrap: 'wrap', width: 280, justifyContent: 'center' },
  numButton: { width: 75, height: 75, justifyContent: 'center', alignItems: 'center', margin: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 37.5 },
  numText: { color: '#FFF', fontSize: 24 },
  walletContainer: { flex: 1, backgroundColor: '#0052B4' },
  walletContent: { padding: 24 },
  userName: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  walletCardId: { backgroundColor: '#80E8FF', padding: 20, borderRadius: 16, marginTop: 20 },
  cardMainTitleId: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  detailContainer: { flex: 1, backgroundColor: '#00469B' },
  backArrow: { color: '#FFF', fontSize: 20, padding: 16 },
  photoContainer: { alignItems: 'center', padding: 20 },
  idPhotoLive: { width: 130, height: 170, borderRadius: 12 },
  idDetailsBlock: { padding: 20 },
  fieldLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
  fieldValue: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }