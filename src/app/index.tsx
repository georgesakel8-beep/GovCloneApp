import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const [screen, setScreen] = useState<'login' | 'pin' | 'wallet' | 'id_detail'>('login');
  const [pin, setPin] = useState('');

  // Εφέ παλμού για premium αίσθηση στην αρχική οθόνη
  const scaleAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.04, duration: 2000, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 2000, useNativeDriver: true })
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

  // --- ΟΘΟΝΗ 1: ΑΡΧΙΚΟ LOGIN (Premium Look) ---
  if (screen === 'login') {
    return (
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop' }} 
        style={styles.loginContainer}
      >
        <StatusBar barStyle="light-content" backgroundColor="#0e1e38" />
        
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

          <TouchableOpacity style={styles.btnOutline}>
            <Text style={styles.btnOutlineText}>🔳  Έλεγχος Εγγράφου</Text>
          </TouchableOpacity>

          <View style={styles.loginDividerRow}>
            <View style={styles.loginLine} />
            <Text style={styles.loginDividerText}>Non Greek residents</Text>
            <View style={styles.loginLine} />
          </View>

          <TouchableOpacity style={styles.btnOutline}>
            <Text style={styles.btnOutlineText}>Event Tickets</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginFooter}>
          <Text style={styles.loginFooterText}>🏛️ gov</Text>
          <Text style={styles.loginFooterCyanText}>gr</Text>
        </View>
      </ImageBackground>
    );
  }

  // --- ΟΘΟΝΗ 1Β: ΕΙΣΑΓΩΓΗ PIN ---
  if (screen === 'pin') {
    return (
      <SafeAreaView style={styles.pinContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#111b2d" />
        <Text style={styles.pinTitle}>Εισάγετε κωδικό PIN</Text>
        
        <View style={styles.dotsRow}>
          {[1, 2, 3, 4].map((dot, index) => (
            <View key={index} style={[styles.dot, pin.length > index && styles.dotFilled]} />
          ))}
        </View>

        <View style={styles.numPad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⬅️'].map((num, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.numButton}
              onPress={() => {
                if (num === 'C') setPin('');
                else if (num === '⬅️') setPin(pin.slice(0, -1));
                else handlePinInput(num);
              }}
            >
              <Text style={styles.numText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  // --- ΟΘΟΝΗ 2: ΚΕΝΤΡΙΚΟ WALLET (Ρεαλιστικές Κάρτες) ---
  if (screen === 'wallet') {
    return (
      <SafeAreaView style={styles.walletContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0f1c2e" />
        
        <View style={styles.walletHeader}>
          <TouchableOpacity style={styles.mailCircle}>
            <Text style={styles.walletHeaderIcon}>✉️</Text>
          </TouchableOpacity>
          <View style={styles.walletHeaderLogo}>
            <Text style={styles.wLogoMain}>gov.gr</Text>
            <Text style={styles.wLogoSub}>wallet</Text>
          </View>
          <TouchableOpacity style={styles.walletAddBtn}>
            <Text style={styles.walletAddBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.walletContent}>
          <Text style={styles.welcomeText}>Καλωσόρισες,</Text>
          <Text style={styles.userName}>ΓΙΩΡΓΟΣ ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ</Text>

          <TouchableOpacity style={styles.walletCardId} activeOpacity={0.85} onPress={() => setScreen('id_detail')}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardMainTitleId}>Δελτίο Ταυτότητας</Text>
              <View style={styles.miniPlusId}><Text style={styles.miniPlusTextId}>+</Text></View>
            </View>
            <View style={styles.cardBottomRow}>
              <Text style={styles.cardPlaceholdersId}>AO 948215</Text>
              <Text style={styles.cardLabelId}>ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.walletCardLicense} activeOpacity={0.85}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardMainTitleLicense}>Άδεια Οδήγησης</Text>
              <View style={styles.miniPlusLicense}><Text style={styles.miniPlusTextLicense}>+</Text></View>
            </View>
            <View style={styles.cardBottomRow}>
              <Text style={styles.cardPlaceholdersLicense}>---------  -------</Text>
              <Text style={styles.cardLabelLicense}>Ισχύει μέχρι: --/--/----</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={[styles.tabIcon, styles.tabActive]}>📇</Text>
            <Text style={[styles.tabLabel, styles.tabActive]}>Έγγραφα</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabIcon}>🎟️</Text>
            <Text style={styles.tabLabel}>Εισιτήρια</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabIcon}>🔳</Text>
            <Text style={styles.tabLabel}>Έλεγχος</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabIcon}>•••</Text>
            <Text style={styles.tabLabel}>Περισσότερα</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- ΟΘΟΝΗ 3: ΑΝΑΛΥΤΙΚΗ ΤΑΥΤΟΤΗΤΑ ---
  return (
    <SafeAreaView style={styles.detailContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3b5c" />
      
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => setScreen('wallet')} style={{ padding: 5 }}>
          <Text style={styles.backArrow}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle}>Δελτίο Ταυτότητας</Text>
        <TouchableOpacity style={{ padding: 5 }}>
          <Text style={styles.moreOptions}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.detailScroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.photoContainer}>
          <View style={styles.numberSideBox}>
            <Text style={styles.idNumberLabel}>Αριθμός εγγράφου</Text>
            <Text style={styles.idNumberValue}>AO 948215</Text>
            <Text style={styles.idCountryLabel}>HELLENIC REPUBLIC</Text>
          </View>
          <View style={styles.photoRightBox}>
            {/* Online Placeholder Φωτογραφία Προφίλ για 100% επιτυχία στο Build */}
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop' }} 
              style={styles.idPhotoLive} 
            />
          </View>
        </View>

        <View style={styles.idDetailsBlock}>
          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΕΠΩΝΥΜΟ / SURNAME</Text>
            <Text style={styles.fieldValue}>ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΟΝΟΜΑ / GIVEN NAMES</Text>
            <Text style={styles.fieldValue}>ΓΙΩΡΓΟΣ</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΟΝΟΜΑ ΠΑΤΡΟΣ / FATHER'S NAME</Text>
            <Text style={styles.fieldValue}>ΑΛΕΞΙΟΣ</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΟΝΟΜΑ ΜΗΤΡΟΣ / MOTHER'S NAME</Text>
            <Text style={styles.fieldValue}>ΑΡΕΤΗ</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ / DATE OF BIRTH</Text>
            <Text style={styles.fieldValue}>25.02.2007</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΤΟΠΟΣ ΓΕΝΝΗΣΗΣ / PLACE OF BIRTH</Text>
            <Text style={styles.fieldValue}>ΠΑΤΡΑ / PATRAS</Text>
          </View>
        </View>

        <View style={styles.detailQrSection}>
          <View style={styles.realQrFrame}>
            {/* Online έτοιμο QR Code */}
            <Image 
              source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GovGrWalletCloneGeorge' }} 
              style={{ width: 140, height: 140 }} 
            />
          </View>
          <Text style={styles.detailQrSubtext}>Κράτησε πατημένο το QR για μεγέθυνση</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginContainer: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 50 },
  loginLogoSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circlePulse: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 210, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 30, 56, 0.6)',
    shadowColor: '#00D2FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  loginLogoText: { color: '#FFF', fontSize: 44, fontWeight: 'bold', letterSpacing: -0.5 },
  loginLogoSubtext: { color: '#00D2FF', fontSize: 22, fontWeight: '600', marginTop: -4, letterSpacing: 0.5 },
  loginButtonSection: { width: '100%', marginBottom: 25 },
  btnTaxis: { backgroundColor: '#00D2FF', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginBottom: 14, shadowColor: '#00D2FF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6 },
  btnTaxisText: { color: '#0e1e38', fontSize: 16, fontWeight: '700' },
  btnOutline: { backgroundColor: 'rgba(255,255,255,0.06)', paddingVertical: 16, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginBottom: 14 },
  btnOutlineText: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  loginDividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  loginLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.15)' },
  loginDividerText: { color: 'rgba(255,255,255,0.5)', paddingHorizontal: 12, fontSize: 13, fontWeight: '500' },
  loginFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 25 },
  loginFooterText: { color: 'rgba(255,255,255,0.4)', fontSize: 15, fontWeight: 'bold' },
  loginFooterCyanText: { color: '#00D2FF', fontSize: 15, fontWeight: 'bold' },

  pinContainer: { flex: 1, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center' },
  pinTitle: { color: '#FFF', fontSize: 21, fontWeight: '600', marginBottom: 35, letterSpacing: 0.3 },
  dotsRow: { flexDirection: 'row', marginBottom: 60 },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', marginHorizontal: 14 },
  dotFilled: { backgroundColor: '#00D2FF', borderColor: '#00D2FF', shadowColor: '#00D2FF', shadowOpacity: 0.6, shadowRadius: 5 },
  numPad: { flexDirection: 'row', flexWrap: 'wrap', width: 290, justifyContent: 'center' },
  numButton: { width: 72, height: 72, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 36, borderWidth: 1, borderColor: 'rgba(255,255,255,0.02)' },
  numText: { color: '#FFF', fontSize: 25, fontWeight: '500' },

  walletContainer: { flex: 1, backgroundColor: '#0b132b' },
  walletHeader: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 5 },
  mailCircle: { backgroundColor: 'rgba(255,255,255,0.1)', width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  walletHeaderIcon: { color: '#FFF', fontSize: 18 },
  walletHeaderLogo: { alignItems: 'center' },
  wLogoMain: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  wLogoSub: { color: '#00D2FF', fontSize: 13, marginTop: -3, fontWeight: '600' },
  walletAddBtn: { backgroundColor: '#00D2FF', width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  walletAddBtnText: { color: '#0b132b', fontSize: 22, fontWeight: 'bold' },
  walletContent: { padding: 20 },
  welcomeText: { color: 'rgba(255,255,255,0.6)', fontSize: 16 },
  userName: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 25, marginTop: 4, letterSpacing: -0.3 },
  
  walletCardId: { backgroundColor: '#1d3557', borderRadius: 20, padding: 22, height: 180, justifyContent: 'space-between', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 10 },
  cardMainTitleId: { color: '#FFF', fontSize: 22, fontWeight: '700' },
  miniPlusId: { backgroundColor: 'rgba(255,255,255,0.15)', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  miniPlusTextId: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  cardPlaceholdersId: { color: '#457b9d', fontSize: 26, fontWeight: 'bold', letterSpacing: 1 },
  cardLabelId: { color: '#a8dadc', fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
  
  walletCardLicense: { backgroundColor: '#ffffff', borderRadius: 20, padding: 22, height: 180, justifyContent: 'space-between', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 10 },
  cardMainTitleLicense: { color: '#1d3557', fontSize: 22, fontWeight: '700' },
  miniPlusLicense: { backgroundColor: '#1d3557', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  miniPlusTextLicense: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  cardPlaceholdersLicense: { color: '#b1a7a6', fontSize: 26, fontWeight: 'bold' },
  cardLabelLicense: { color: '#666', fontSize: 12, fontWeight: '600' },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardBottomRow: { flexDirection: 'column' },

  bottomTabBar: { height: 75, backgroundColor: '#070d19', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10 },
  tabItem: { alignItems: 'center' },
  tabIcon: { fontSize: 22, color: '#457b9d' },
  tabLabel: { fontSize: 11, color: '#457b9d', marginTop: 4, fontWeight: '500' },
  tabActive: { color: '#00D2FF', fontWeight: '700' },

  detailContainer: { flex: 1, backgroundColor: '#0f1a24' },
  detailHeader: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, backgroundColor: '#162636' },
  backArrow: { color: '#FFF', fontSize: 18 },
  detailHeaderTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  moreOptions: { color: '#FFF', fontSize: 24 },
  detailScroll: { paddingBottom: 30 },
  
  photoContainer: { backgroundColor: '#162636', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 25, alignItems: 'center', justifyContent: 'space-between' },
  numberSideBox: { flex: 1 },
  idNumberLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '500' },
  idNumberValue: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginTop: 4, letterSpacing: 0.5 },
  idCountryLabel: { color: '#00D2FF', fontSize: 12, fontWeight: '600', marginTop: 5, letterSpacing: 0.5 },
  photoRightBox: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  idPhotoLive: { width: 110, height: 145, borderRadius: 6 },
  
  idDetailsBlock: { paddingHorizontal: 20, paddingTop: 20 },
  detailField: { marginBottom: 18, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.12)', paddingBottom: 8 },
  fieldLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', letterSpacing: 0.3 },
  fieldValue: { color: '#FFF', fontSize: 18, fontWeight: '700', marginTop: 3 },
  
  detailQrSection: { alignItems: 'center', marginTop: 15 },
  realQrFrame: { backgroundColor: '#FFF', padding: 12, borderRadius: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 8 },
  detailQrSubtext: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 12, fontWeight: '500' }
});