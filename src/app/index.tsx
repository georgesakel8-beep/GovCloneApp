import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  // Καταστάσεις οθόνης: 'login' | 'pin' | 'wallet' | 'id_detail'
  const [screen, setScreen] = useState<'login' | 'pin' | 'wallet' | 'id_detail'>('login');
  const [pin, setPin] = useState('');

  const handlePinInput = (value: string) => {
    if (pin.length < 4) {
      const newPin = pin + value;
      setPin(newPin);
      if (newPin === '1234') { 
        setTimeout(() => {
          setScreen('wallet');
          setPin('');
        }, 200);
      } else if (newPin.length === 4) {
        setTimeout(() => {
          Alert.alert('Σφάλμα', 'Λανθασμένος κωδικός PIN');
          setPin('');
        }, 200);
      }
    }
  };

  // --- ΟΘΟΝΗ 1: ΑΡΧΙΚΟ LOGIN ---
  if (screen === 'login') {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0052B4" />
        <View style={styles.loginLogoSection}>
          <View style={styles.cropMarks}>
            <Text style={styles.loginLogoText}>gov.gr</Text>
            <Text style={styles.loginLogoSubtext}>wallet</Text>
          </View>
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

        {/* ΔΙΟΡΘΩΣΗ: Χωρίστηκε το κείμενο για να γίνει το gr σιαν */}
        <View style={styles.loginFooter}>
          <Text style={styles.loginFooterText}>🏛️ gov</Text>
          <Text style={styles.loginFooterCyanText}>gr</Text>
        </View>
      </SafeAreaView>
    );
  }

  // --- ΟΘΟΝΗ 1Β: ΕΙΣΑΓΩΓΗ PIN ---
  if (screen === 'pin') {
    return (
      <SafeAreaView style={styles.pinContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0052B4" />
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

  // --- ΟΘΟΝΗ 2: ΚΕΝΤΡΙΚΟ WALLET ---
  if (screen === 'wallet') {
    return (
      <SafeAreaView style={styles.walletContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0052B4" />
        
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
          <Text style={styles.userName}>ΓΕΩΡΓΙΟΣ ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ</Text>

          {/* ΚΑΡΤΑ 1: Δελτίο Ταυτότητας */}
          <TouchableOpacity style={styles.walletCardId} activeOpacity={0.9} onPress={() => setScreen('id_detail')}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardMainTitleId}>Δελτίο Ταυτότητας</Text>
              <View style={styles.miniPlusId}><Text style={styles.miniPlusTextId}>+</Text></View>
            </View>
            <View style={styles.cardBottomRow}>
              <Text style={styles.cardPlaceholdersId}>--  ------  ----</Text>
              <Text style={styles.cardLabelId}>Ημ. Έκδοσης</Text>
            </View>
          </TouchableOpacity>

          {/* ΚΑΡΤΑ 2: Άδεια Οδήγησης */}
          <TouchableOpacity style={styles.walletCardLicense} activeOpacity={0.9}>
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

  // --- ΟΘΟΝΗ 3: ΑΝΑΛΥΤΙΚΗ ΠΡΟΒΟΛΗ ΤΑΥΤΟΤΗΤΑΣ ---
  return (
    <SafeAreaView style={styles.detailContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4AD7F0" />
      
      {/* Detail Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => setScreen('wallet')}>
          <Text style={styles.backArrow}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle}>Δελτίο Ταυτότητας</Text>
        <TouchableOpacity>
          <Text style={styles.moreOptions}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.detailScroll}>
        
        {/* Πάνω Μέρος: Οριζόντια Διάταξη Αριθμού και Φωτογραφίας */}
        <View style={styles.photoContainer}>
          <View style={styles.numberSideBox}>
            <Text style={styles.idNumberLabel}>Αριθμός ταυτότητας:</Text>
            <Text style={styles.idNumberValue}>ΑΝ 714079</Text>
          </View>
          <View style={styles.photoRightBox}>
            <Image source={require('../../assets/myphoto.jpeg.jpeg')} style={styles.idPhotoLive} />
          </View>
        </View>

        {/* Στοιχεία με τις επίσημες διαχωριστικές γραμμές */}
        <View style={styles.idDetailsBlock}>
          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΕΠΩΝΥΜΟ</Text>
            <Text style={styles.fieldValue}>ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>SURNAME</Text>
            <Text style={styles.fieldValue}>SAKELLAROPOULOS</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΟΝΟΜΑ</Text>
            <Text style={styles.fieldValue}>ΓΕΩΡΓΙΟΣ</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>GIVEN NAME</Text>
            <Text style={styles.fieldValue}>GEORGIOS</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΠΑΤΡΩΝΥΜΟ / FATHER'S NAME</Text>
            <Text style={styles.fieldValue}>ΑΛΕΞΙΟΣ</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΜΗΤΡΩΝΥΜΟ / MOTHER'S NAME</Text>
            <Text style={styles.fieldValue}>ΑΡΕΤΗ</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ / DATE OF BIRTH</Text>
            <Text style={styles.fieldValue}>25/02/2007</Text>
          </View>

          <View style={styles.detailField}>
            <Text style={styles.fieldLabel}>ΤΟΠΟΣ ΓΕΝΝΗΣΗΣ / PLACE OF BIRTH</Text>
            <Text style={styles.fieldValue}>ΠΑΤΡΑ</Text>
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.detailQrSection}>
          <View style={styles.realQrFrame}>
            <Image source={require('../../assets/qrcode.jpeg')} style={{ width: 135, height: 135 }} />
          </View>
          <Text style={styles.detailQrSubtext}>Κωδικός Ασφαλείας: 8492-1024</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Login Styles
  loginContainer: { flex: 1, backgroundColor: '#0052B4', justifyContent: 'space-between', paddingHorizontal: 24 },
  loginLogoSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cropMarks: { borderWidth: 0, padding: 10, alignItems: 'center' },
  loginLogoText: { color: '#FFF', fontSize: 42, fontWeight: 'bold' },
  loginLogoSubtext: { color: '#00D2FF', fontSize: 22, fontWeight: '600', marginTop: -5 },
  loginButtonSection: { width: '100%', marginBottom: 40 },
  btnTaxis: { backgroundColor: '#00D2FF', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 14 },
  btnTaxisText: { color: '#0052B4', fontSize: 16, fontWeight: '700' },
  btnOutline: { backgroundColor: 'transparent', paddingVertical: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)', marginBottom: 14 },
  btnOutlineText: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  loginDividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  loginLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  loginDividerText: { color: 'rgba(255,255,255,0.6)', paddingHorizontal: 10, fontSize: 13 },
  
  // Footer Διευθέτηση για να μπει το gr ξεχωριστά
  loginFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 20 },
  loginFooterText: { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 'bold' },
  loginFooterCyanText: { color: '#00D2FF', fontSize: 14, fontWeight: 'bold' }, // ΔΙΟΡΘΩΣΗ: gr σε Σιαν (Cyan)

  // Pin Screen Styles
  pinContainer: { flex: 1, backgroundColor: '#0052B4', alignItems: 'center', justifyContent: 'center' },
  pinTitle: { color: '#FFF', fontSize: 20, fontWeight: '600', marginBottom: 30 },
  dotsRow: { flexDirection: 'row', marginBottom: 50 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#FFF', marginHorizontal: 12 },
  dotFilled: { backgroundColor: '#00D2FF', borderColor: '#00D2FF' },
  numPad: { flexDirection: 'row', flexWrap: 'wrap', width: 280, justifyContent: 'center' },
  numButton: { width: 75, height: 75, justifyContent: 'center', alignItems: 'center', margin: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 37.5 },
  numText: { color: '#FFF', fontSize: 24, fontWeight: '600' },

  // Wallet Main Styles
  walletContainer: { flex: 1, backgroundColor: '#0052B4' },
  walletHeader: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 },
  mailCircle: { backgroundColor: '#FFF', width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  walletHeaderIcon: { color: '#0052B4', fontSize: 16 },
  walletHeaderLogo: { alignItems: 'center' },
  wLogoMain: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  wLogoSub: { color: '#00D2FF', fontSize: 13, marginTop: -3, fontWeight: '600' },
  walletAddBtn: { backgroundColor: '#00D2FF', width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  walletAddBtnText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  walletContent: { padding: 24 },
  welcomeText: { color: '#FFF', fontSize: 18, fontWeight: '400' },
  userName: { color: '#FFF', fontSize: 26, fontWeight: 'bold', marginBottom: 30, marginTop: 4 },
  
  // Κάρτες Αρχικής
  walletCardId: { backgroundColor: '#80E8FF', borderRadius: 16, padding: 20, height: 175, justifyContent: 'space-between', marginBottom: 20 },
  cardMainTitleId: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  miniPlusId: { backgroundColor: '#FFF', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  miniPlusTextId: { color: '#00D2FF', fontSize: 26, fontWeight: 'bold' },
  cardPlaceholdersId: { color: '#00469B', fontSize: 28, fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 },
  cardLabelId: { color: 'rgba(0, 70, 155, 0.5)', fontSize: 11, fontWeight: '600' },
  walletCardLicense: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, height: 175, justifyContent: 'space-between', marginBottom: 20 },
  cardMainTitleLicense: { color: '#80E8FF', fontSize: 22, fontWeight: 'bold' },
  miniPlusLicense: { backgroundColor: '#00D2FF', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  miniPlusTextLicense: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  cardPlaceholdersLicense: { color: '#00469B', fontSize: 28, fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 },
  cardLabelLicense: { color: 'rgba(0, 70, 155, 0.3)', fontSize: 11, fontWeight: '600' },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardBottomRow: { flexDirection: 'column' },

  // Bottom Tab Bar
  bottomTabBar: { height: 75, backgroundColor: '#003A80', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 12 },
  tabItem: { alignItems: 'center' },
  tabIcon: { fontSize: 24, color: '#66A3FF' },
  tabLabel: { fontSize: 11, color: '#66A3FF', marginTop: 4, fontWeight: '500' },
  tabActive: { color: '#FFF', fontWeight: '700' },

  // Detail ID Styles
  detailContainer: { flex: 1, backgroundColor: '#00469B' },
  detailHeader: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, backgroundColor: '#4AD7F0' },
  backArrow: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  detailHeaderTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  moreOptions: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  detailScroll: { paddingBottom: 40 },
  
  // ΔΙΟΡΘΩΣΗ: Το φόντο έγινε ελαφρώς πιο σκούρο μπλε (#1B6395)
  photoContainer: { backgroundColor: '#1B6395', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 25, width: '100%', alignItems: 'center', justifyContent: 'space-between' },
  numberSideBox: { flex: 1, justifyContent: 'center' },
  photoRightBox: { marginLeft: 15 },
  idPhotoLive: { width: 115, height: 150, borderRadius: 8, borderWidth: 0 },
  
  idDetailsBlock: { paddingHorizontal: 20, paddingTop: 15 },
  idNumberLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '500' },
  idNumberValue: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginTop: 4 },
  
  // Πεδία με ρεαλιστικές λευκές γραμμές
  detailField: { marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.25)', paddingBottom: 6 },
  fieldLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '600' },
  fieldValue: { color: '#FFF', fontSize: 20, fontWeight: '700', marginTop: 2 },
  
  detailQrSection: { alignItems: 'center', marginTop: 20, paddingVertical: 15 },
  realQrFrame: { backgroundColor: '#FFF', padding: 12, borderRadius: 12 },
  detailQrSubtext: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 10, fontWeight: '500' }
});