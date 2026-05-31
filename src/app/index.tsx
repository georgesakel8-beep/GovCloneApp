import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, ImageBackground, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const [screen, setScreen] = useState<'login' | 'pin' | 'wallet' | 'id_detail'>('login');
  const [pin, setPin] = useState('');
  const [showQR, setShowQR] = useState(false);
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

  // --- 1. LOGIN SCREEN ---
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

  // --- 2. PIN SCREEN ---
  if (screen === 'pin') {
    return (
      <SafeAreaView style={styles.pinContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0052B4" />
        <Text style={styles.pinTitle}>Εισάγετε κωδικό PIN</Text>
        <View style={styles.dotsRow}>
          {[1, 2, 3, 4].map((_, i) => (
            <View key={i} style={[styles.dot, pin.length > i && styles.dotFilled]} />
          ))}
        </View>
        <View style={styles.numPad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⬅️'].map((num, i) => (
            <TouchableOpacity key={i} style={styles.numButton} onPress={() => {
              if (num === 'C') setPin(''); 
              else if (num === '⬅️') setPin(pin.slice(0, -1)); 
              else handlePinInput(num);
            }}>
              <Text style={styles.numText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  // --- 3. WALLET SCREEN ---
  if (screen === 'wallet') {
    return (
      <SafeAreaView style={styles.walletContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0052B4" />
        <View style={styles.walletHeader}>
          <TouchableOpacity style={styles.mailCircle}><Text style={styles.walletHeaderIcon}>✉️</Text></TouchableOpacity>
          <View style={styles.walletHeaderLogo}>
            <Text style={styles.wLogoMain}>gov.gr</Text>
            <Text style={styles.wLogoSub}>wallet</Text>
          </View>
          <TouchableOpacity style={styles.walletAddBtn}><Text style={styles.walletAddBtnText}>+</Text></TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.walletContent}>
          <Text style={styles.welcomeText}>Καλωσόρισες,</Text>
          <Text style={styles.userName}>ΓΕΩΡΓΙΟΣ ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ</Text>
          <TouchableOpacity style={styles.walletCardId} onPress={() => setScreen('id_detail')}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardMainTitleId}>Δελτίο Ταυτότητας</Text>
              <View style={styles.miniPlusId}><Text style={styles.miniPlusTextId}>+</Text></View>
            </View>
            <View style={styles.cardBottomRow}>
              <Text style={styles.cardPlaceholdersId}>--  ------  ----</Text>
              <Text style={styles.cardLabelId}>Ημ. Έκδοσης</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.walletCardLicense}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardMainTitleLicense}>Άδεια Οδήγησης</Text>
              <View style={styles.miniPlusLicense}><Text style={styles.miniPlusTextLicense}>+</Text></View>
            </View>
            <View style={styles.cardBottomRow}>
              <Text style={styles.cardPlaceholdersLicense}>---------  -------</Text>
              <Text style={styles.cardLabelLicense}>Ισχύει μέχρι:</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- 4. ID DETAIL SCREEN ---
  return (
    <SafeAreaView style={styles.detailContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#3A86C0" />
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => { setScreen('wallet'); setShowQR(false); }}>
          <Text style={styles.backArrow}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle}>Δελτίο Ταυτότητας</Text>
        <TouchableOpacity><Text style={styles.moreOptions}>⋮</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={{ flex: 1 }}>

        {/* Επάνω Ανοιχτό Γαλάζιο Πλαίσιο */}
        <View style={styles.photoContainerGradient}>
          <View style={styles.numberSideBox}>
            <Text style={styles.idNumberLabel}>Αριθμός ταυτότητας:</Text>
            <Text style={styles.idNumberValue}>A03449095</Text>
            <Text style={[styles.idNumberLabel, { marginTop: 12 }]}>Ημ. Έκδοσης:</Text>
            <Text style={[styles.idNumberValue, { fontSize: 20, fontWeight: '500', marginTop: 2 }]}>07/05/2026</Text>
          </View>
        </View>

        {/* Φωτογραφία */}
        <View style={styles.photoWrapperAbsolute}>
          <Image source={require('../../assets/myphoto.jpeg.jpeg')} style={styles.idPhotoLive} />
        </View>

        {/* Κάτω Σκούρο Μπλε Πλαίσιο */}
        <View style={styles.mainDarkSection}>

          {/* Action Grid */}
          <View style={styles.actionGrid}>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Image source={require('../../assets/wallet_icon.png')} style={styles.actionIconImage} />
                <Text style={styles.actionText}>Προσθήκη στο Wallet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Image source={require('../../assets/copy_icon.png')} style={styles.actionIconImage} />
                <Text style={styles.actionText}>Αντίγραφο</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.actionBtn, showQR && styles.actionBtnActive]} onPress={() => setShowQR(!showQR)}>
                <Image source={require('../../assets/qrcode.jpeg')} style={styles.miniQrIcon} />
                <Text style={styles.actionText}>Προβολή QR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Image source={require('../../assets/scan_icon.png')} style={styles.actionIconImage} />
                <Text style={styles.actionText}>Quick Scan</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Στοιχεία Κατόχου - Ρυθμισμένα ακριβώς όπως στη φωτογραφία */}
          <View style={styles.idDetailsBlock}>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΕΠΩΝΥΜΟ</Text><Text style={styles.fieldValue}>ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>SURNAME</Text><Text style={styles.fieldValue}>SAKELLAROPOULOS</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΟΝΟΜΑ</Text><Text style={styles.fieldValue}>ΓΕΩΡΓΙΟΣ</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>GIVEN NAME</Text><Text style={styles.fieldValue}>GEORGIOS</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΟΝΟΜΑ ΠΑΤΕΡΑ</Text><Text style={styles.fieldValue}>ΑΛΕΞΙΟΣ</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>FATHER'S NAME</Text><Text style={styles.fieldValue}>ALEXIOS</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΟΝΟΜΑ ΜΗΤΕΡΑΣ (MOTHER'S NAME)</Text><Text style={styles.fieldValue}>ΑΡΕΤΗ</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΗΜ. ΓΕΝΝΗΣΗΣ (DATE OF BIRTH)</Text><Text style={styles.fieldValue}>25/02/2007</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΤΟΠΟΣ ΓΕΝΝΗΣΗΣ / PLACE OF BIRTH</Text><Text style={styles.fieldValue}>ΠΑΤΡΑ ΑΧΑΪΑΣ</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΑΡΧΗ ΕΚΔΟΣΗΣ / ISSUANCE OFFICE</Text><Text style={styles.fieldValue}>Υ.Δ.Ε.Ε. ΠΑΤΡΩΝ</Text></View>

            {showQR && (
              <View style={styles.detailQrSection}>
                <View style={styles.realQrFrame}>
                  <Image source={require('../../assets/qrcode.jpeg')} style={{ width: 180, height: 180 }} />
                </View>
                <Text style={styles.detailQrSubtext}>Κωδικός μιας χρήσης για έλεγχο ταυτότητας</Text>
              </View>
            )}

            <View style={styles.footerDocs}>
              <Text style={styles.docCodeText}>Κωδικός εγγράφου: GR-7489201-BXC-9084</Text>
              <Text style={styles.travelWarningText}>Δεν αποτελεί διεθνές ταξιδιωτικό έγγραφο</Text>
              <Text style={styles.travelWarningText}>Not an international travel document</Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Καθαρή, εργοστασιακή sans-serif γραμματοσειρά συστήματος
const GOV_FONT = Platform.OS === 'ios' ? 'System' : 'sans-serif';

const styles = StyleSheet.create({
  // Login Styles
  loginContainer: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 60 },
  loginLogoSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circlePulse: { width: 210, height: 210, borderRadius: 105, borderWidth: 2, borderColor: '#00D2FF', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 82, 180, 0.25)' },
  loginLogoText: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 42, fontWeight: 'bold' },
  loginLogoSubtext: { fontFamily: GOV_FONT, color: '#00D2FF', fontSize: 22, fontWeight: '600', marginTop: -3 },
  loginButtonSection: { width: '100%', marginBottom: 30 },
  btnTaxis: { backgroundColor: '#00D2FF', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 14 },
  btnTaxisText: { fontFamily: GOV_FONT, color: '#0052B4', fontSize: 16, fontWeight: '700' },
  btnOutline: { backgroundColor: 'transparent', paddingVertical: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)', marginBottom: 14 },
  btnOutlineText: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 15, fontWeight: '600' },
  loginDividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  loginLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  loginDividerText: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.6)', paddingHorizontal: 10, fontSize: 13 },
  loginFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 25 },
  loginFooterText: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 'bold' },
  loginFooterCyanText: { fontFamily: GOV_FONT, color: '#00D2FF', fontSize: 14, fontWeight: 'bold' },

  // Pin Screen Styles
  pinContainer: { flex: 1, backgroundColor: '#0052B4', alignItems: 'center', justifyContent: 'center' },
  pinTitle: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 20, fontWeight: '600', marginBottom: 30 },
  dotsRow: { flexDirection: 'row', marginBottom: 50 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#FFF', marginHorizontal: 12 },
  dotFilled: { backgroundColor: '#00D2FF', borderColor: '#00D2FF' },
  numPad: { flexDirection: 'row', flexWrap: 'wrap', width: 280, justifyContent: 'center' },
  numButton: { width: 75, height: 75, justifyContent: 'center', alignItems: 'center', margin: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 37.5 },
  numText: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 24, fontWeight: '600' },

  // Wallet Main Styles
  walletContainer: { flex: 1, backgroundColor: '#0052B4' },
  walletHeader: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 },
  mailCircle: { backgroundColor: '#FFF', width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  walletHeaderIcon: { fontFamily: GOV_FONT, color: '#0052B4', fontSize: 16 },
  walletHeaderLogo: { alignItems: 'center' },
  wLogoMain: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  wLogoSub: { fontFamily: GOV_FONT, color: '#00D2FF', fontSize: 13, marginTop: -3, fontWeight: '600' },
  walletAddBtn: { backgroundColor: '#00D2FF', width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  walletAddBtnText: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  walletContent: { padding: 24 },
  welcomeText: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 18, fontWeight: '400' },
  userName: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 26, fontWeight: 'bold', marginBottom: 30, marginTop: 4 },

  walletCardId: { backgroundColor: '#80E8FF', borderRadius: 16, padding: 20, height: 175, justifyContent: 'space-between', marginBottom: 20 },
  cardMainTitleId: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  miniPlusId: { backgroundColor: '#FFF', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  miniPlusTextId: { fontFamily: GOV_FONT, color: '#00D2FF', fontSize: 26, fontWeight: 'bold' },
  cardPlaceholdersId: { fontFamily: GOV_FONT, color: '#00469B', fontSize: 28, fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 },
  cardLabelId: { fontFamily: GOV_FONT, color: 'rgba(0, 70, 155, 0.5)', fontSize: 11, fontWeight: '600' },
  walletCardLicense: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, height: 175, justifyContent: 'space-between', marginBottom: 20 },
  cardMainTitleLicense: { fontFamily: GOV_FONT, color: '#80E8FF', fontSize: 22, fontWeight: 'bold' },
  miniPlusLicense: { backgroundColor: '#00D2FF', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  miniPlusTextLicense: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  cardPlaceholdersLicense: { fontFamily: GOV_FONT, color: '#00469B', fontSize: 28, fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 },
  cardLabelLicense: { fontFamily: GOV_FONT, color: 'rgba(0, 70, 155, 0.3)', fontSize: 11, fontWeight: '600' },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardBottomRow: { flexDirection: 'column' },

  // ID Detail Screen Styles
  detailContainer: { flex: 1, backgroundColor: '#00377A' },
  detailHeader: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, backgroundColor: '#3A86C0', zIndex: 5 },
  backArrow: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  detailHeaderTitle: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  moreOptions: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  
  photoContainerGradient: { backgroundColor: '#3A86C0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: 15, height: 140, width: '100%', zIndex: 2 },
  numberSideBox: { flex: 1, justifyContent: 'flex-start' },
  
  photoWrapperAbsolute: { position: 'absolute', right: 20, top: 85, zIndex: 99, elevation: 99 },
  idPhotoLive: { width: 115, height: 150, borderRadius: 12 },
  
  idNumberLabel: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '400' },
  idNumberValue: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 27, fontWeight: 'bold', marginTop: 2 },

  mainDarkSection: { backgroundColor: '#00377A', paddingTop: 110, zIndex: 1 },

  actionGrid: { paddingHorizontal: 16, paddingBottom: 15 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  actionBtn: { backgroundColor: '#FFFFFF', borderRadius: 10, width: '48%', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#EAEAEA' },
  actionBtnActive: { borderColor: '#00D2FF', backgroundColor: '#F0FAFF' },
  actionIconImage: { width: 20, height: 20, marginRight: 8, resizeMode: 'contain' },
  miniQrIcon: { width: 20, height: 20, marginRight: 8, borderRadius: 4 },
  actionText: { fontFamily: GOV_FONT, color: '#1A1A1A', fontSize: 13, fontWeight: 'bold', flexShrink: 1 },

  // Εδώ έγιναν οι αλλαγές για να είναι μεγάλα και λεπτά τα γράμματα όπως στο IMG_5423_2.jpg
  idDetailsBlock: { paddingHorizontal: 20, paddingTop: 10 },
  detailField: { marginBottom: 18, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.15)', paddingBottom: 8 },
  fieldLabel: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '400', letterSpacing: 0.5 },
  fieldValue: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 25, fontWeight: '400', marginTop: 4, letterSpacing: 0.2 },
  
  detailQrSection: { alignItems: 'center', marginTop: 25, paddingVertical: 15, width: '100%' },
  realQrFrame: { backgroundColor: '#FFF', padding: 12, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  detailQrSubtext: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 12, fontWeight: '500', textAlign: 'center' },

  footerDocs: { marginTop: 25, marginBottom: 20, alignItems: 'center' },
  docCodeText: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 8 },
  travelWarningText: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.35)', fontSize: 11, textAlign: 'center', lineHeight: 16 }
});