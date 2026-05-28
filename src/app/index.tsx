import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Animated.View style={[styles.circlePulse, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.logoText}>gov.gr</Text>
          <Text style={styles.subText}>wallet</Text>
        </Animated.View>
        <TouchableOpacity style={styles.btn} onPress={() => setScreen('pin')}>
          <Text style={styles.btnText}>Σύνδεση με κωδικούς TaxisNet</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'pin') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Εισάγετε κωδικό PIN</Text>
        <View style={styles.dotsRow}>
          {[1, 2, 3, 4].map((_, i) => <View key={i} style={[styles.dot, pin.length > i && styles.dotFilled]} />)}
        </View>
        <View style={styles.numPad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⬅️'].map((n) => (
            <TouchableOpacity key={n} style={styles.numBtn} onPress={() => {
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
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.userName}>ΓΕΩΡΓΙΟΣ ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ</Text>
          <TouchableOpacity style={styles.card} onPress={() => setScreen('id_detail')}>
            <Text style={styles.cardTitle}>Δελτίο Ταυτότητας</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.detailContainer}>
      <TouchableOpacity onPress={() => setScreen('wallet')}><Text style={styles.back}>◀ Πίσω</Text></TouchableOpacity>
      <ScrollView>
        <View style={styles.photoBox}>
          <Image source={require('../../assets/myphoto.jpeg')} style={styles.photo} />
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>ΟΝΟΜΑ</Text>
          <Text style={styles.val}>ΓΕΩΡΓΙΟΣ</Text>
          <Text style={styles.label}>ΕΠΩΝΥΜΟ</Text>
          <Text style={styles.val}>ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ</Text>
        </View>
        <View style={styles.qrContainer}>
          <Image source={require('../../assets/qrcode.jpeg')} style={styles.qrCode} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0052B4', alignItems: 'center', justifyContent: 'center' },
  circlePulse: { width: 210, height: 210, borderRadius: 105, borderWidth: 2, borderColor: '#00D2FF', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 82, 180, 0.25)' },
  logoText: { color: '#FFF', fontSize: 42, fontWeight: 'bold' },
  subText: { color: '#00D2FF', fontSize: 22 },
  btn: { backgroundColor: '#00D2FF', padding: 16, borderRadius: 12, marginTop: 40 },
  btnText: { color: '#0052B4', fontWeight: 'bold' },
  title: { color: '#FFF', fontSize: 20, marginBottom: 30 },
  dotsRow: { flexDirection: 'row', marginBottom: 50 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#FFF', margin: 10 },
  dotFilled: { backgroundColor: '#00D2FF' },
  numPad: { flexDirection: 'row', flexWrap: 'wrap', width: 280, justifyContent: 'center' },
  numBtn: { width: 75, height: 75, justifyContent: 'center', alignItems: 'center', margin: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 37.5 },
  numText: { color: '#FFF', fontSize: 24 },
  walletContainer: { flex: 1, backgroundColor: '#0052B4' },
  scroll: { padding: 24 },
  userName: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  card: { backgroundColor: '#80E8FF', padding: 20, borderRadius: 16, marginTop: 20 },
  cardTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  detailContainer: { flex: 1, backgroundColor: '#00469B' },
  back: { color: '#FFF', fontSize: 18, padding: 16 },
  photoBox: { alignItems: 'center', padding: 20 },
  photo: { width: 130, height: 170, borderRadius: 12 },
  details: { padding: 20 },
  label: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
  val: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  qrContainer: { alignItems: 'center', marginTop: 20 },
  qrCode: { width: 135, height: 135 }
});