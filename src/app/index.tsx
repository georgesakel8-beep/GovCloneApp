import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      <ImageBackground source={require('../../assets/background.jpg')} style={styles.loginContainer}>
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
        <View style={styles.loginFooter}>
          <Text style={styles.loginFooterText}>🏛️ gov</Text>
          <Text style={styles.loginFooterCyanText}>gr</Text>
        </View>
      </ImageBackground>
    );
  }

  if (screen === 'pin') {
    return (
      <SafeAreaView style={styles.pinContainer}>
        <Text style={styles.pinTitle}>Εισάγετε κωδικό PIN</Text>
        <View style={styles.dotsRow}>
          {[1, 2, 3, 4].map((_, i) => <View key={i} style={[styles.dot, pin.length > i && styles.dotFilled]} />)}
        </View>
        <View style={styles.numPad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⬅️'].map((n) => (
            <TouchableOpacity key={n} style={styles.numButton} onPress={() => {
              if (n === 'C') setPin(''); else if (n === '⬅️') setPin(pin.slice(0, -1)); else handlePinInput(n);
            }}>
              <Text style={styles.numText}>{n}</Text>
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
      <TouchableOpacity onPress={() => setScreen('wallet')}><Text style={styles.backArrow}>◀ Πίσω</Text></TouchableOpacity>
      <ScrollView contentContainerStyle={styles.detailScroll}>
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
  loginContainer: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 60 },
  loginLogoSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circlePulse: { width: 210, height: 210, borderRadius: 105, borderWidth: 2, borderColor: '#00D2FF', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 82, 180, 0.25)' },
  loginLogoText: { color: '#FFF', fontSize: 42, fontWeight: 'bold' },
  loginLogoSubtext: { color: '#00D2FF', fontSize: 22, fontWeight: '600' },
  loginButtonSection: { width: '100%', marginBottom: 30 },
  btnTaxis: { backgroundColor: '#00D2FF', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  btnTaxisText: { color: '#0052B4', fontWeight: '700' },
  loginFooter: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 25 },
  loginFooterText: { color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' },
  loginFooterCyanText: { color: '#00D2FF', fontWeight: 'bold' },
  pinContainer: { flex: 1, backgroundColor: '#0052B4', alignItems: 'center', justifyContent: 'center' },
  pinTitle: { color: '#FFF', fontSize: 20, marginBottom: 30 },
  dotsRow: { flexDirection: 'row', marginBottom: 50 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#FFF', marginHorizontal: 12 },
  dotFilled: { backgroundColor: '#00D2FF' },
  numPad: { flexDirection: 'row', flexWrap: 'wrap', width: 280, justifyContent: 'center' },
  numButton: { width: 75, height: 75, justifyContent: 'center', alignItems: 'center', margin: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 37.5 },
  numText: { color: '#FFF', fontSize: 24 },
  walletContainer: { flex: 1, backgroundColor: '#0052B4' },
  walletContent: { padding: 24 },
  userName: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  walletCardId: { backgroundColor: '#80E8FF', borderRadius: 16, padding: 20, height: 175 },
  cardMainTitleId: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  detailContainer: { flex: 1, backgroundColor: '#00469B' },
  backArrow: { color: '#FFF', fontSize: 20, padding: 16 },
  detailScroll: { paddingBottom: 40 },
  photoContainer: { alignItems: 'center', paddingVertical: 20 },
  idPhotoLive: { width: 130, height: 170, borderRadius: 12 },
  idDetailsBlock: { paddingHorizontal: 20 },
  fieldLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
  fieldValue: { color: '#FFF', fontSize: 18, fontWeight: '600' }
});