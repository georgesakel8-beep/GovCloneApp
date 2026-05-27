import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
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

  // --- ΟΘΟΝΗ 1: ΑΡΧΙΚΟ LOGIN (gov.gr wallet) ---
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

        <View style={styles.loginFooter}>
          <Text style={styles.loginFooterText}>🏛️ govgr</Text>
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
          <Text style={styles.userName}>ΓΙΩΡΓΟΣ ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ</Text>

          <TouchableOpacity style={styles.walletCardId} activeOpacity={0.9} onPress={() => setScreen('id_detail')}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardMainTitleId}>Δελτίο Ταυτότητας</Text>
              <View style={styles.miniPlusId}><Text style={styles.miniPlusTextId}>+</Text></View>
            </View>
            <View style={styles.cardBottomRow}>
              <Text style={styles.cardPlaceholdersId}>AO 948215</Text>
              <Text style={styles.cardLabelId}>ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.walletCardLicense} activeOpacity={0.9}>
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

  // --- ΟΘΟΝΗ 3: ΑΝΑΛΥΤΙΚΗ ΠΡΟΒΟΛΗ ΤΑΥΤΟΤΗΤΑΣ ---
  return (
    <SafeAreaView style={styles.detailContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#79E7FF" />
      
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
        
        <View style={styles.photoContainer}>
          {/* Default γκρίζο placeholder σιλουέτας για να μην κρασάρει ποτέ το build αν λείπει αρχείο */}
          <Image 
            source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAACWCAMAAAAj6S32AAAAMFBMVEUAAICAAMDAwMCAgIDAwMDAwID///8AAIDAwMCAgID///8AAICAgMDAwID///8AAIAv4TscAAAADnRSTlMAESIzRFVmd4iZqru8zMzzun7IAAAByUlEQVR42u3b23KCMBSG4TshgAnI+7/t6mAnatWh9bZZzbybXvTrgAnSbhvGZDKZTMb/Ybe9bZofmU7N7mO++YpPizK9vL5vN6V6bHcbby6Z6pZ6bL7vFvVovpZg48ZgY2OwsTHY2BhsBAw2GgYbDYONjcHGxmBjY7CxMdgIGGw0DDYaBhsbg42NwcbGYGNjsBEw2GgYbDQMNjYGGxuDjY3BxsZgI2Cw0TDYaBhsBAw2GgYbDYONjcHGxmBjY7CxMdgIGGw0DDYaBhsNg42NwcbGYGNjsBEYbDQMNhoGGxuDjY3BxsZgY2OwETDYaBhsNAw2NgYbG4ONjcHGxmAjYLDb3N6exuC9f83BxsZgY2OwEeg7g+vR6M8/Hxtb9bM5WIdf6tS7vT8XG1v1pznYqB8N/wBstA42NgYbG4ONjcFGwGCjYbDRMNjYGGxsDDY2Bhsbg42AwUbDYKNhsNEw2NgYbG4ONjYGGwGDjYbBRsNgY2OwsTHY2BhsbAw2AgYbDYONhsFGwGBjY7CxMdgIGGw0DDYaBhsbg42Nwb9ksP9N/P8WwV7qf/+S++0vS59v/v8U7K9V6XUymeoXvEw6v9wO7pMAAAAASUVORK5CYII=' }} 
            style={styles.idPhotoLive} 
          />
        </View>

        <View style={styles.idDetailsBlock}>
          <Text style={styles.idNumberLabel}>Αριθμός ταυτότητας:</Text>
          <Text style={styles.idNumberValue}>AO 948215</Text>

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
            <Text style={styles.fieldValue}>ΓΙΩΡΓΟΣ</Text>
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

        <View style={styles.detailQrSection}>
          <View style={styles.realQrFrame}>
            <Image 
              source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=GovGrWalletCloneGeorge' }} 
              style={{ width: 130, height: 130 }} 
            />
          </View>
          <Text style={styles.detailQrSubtext}>Κωδικός Ασφαλείας: 8492-1024</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  loginFooter: { alignItems: 'center', paddingBottom: 20 },
  loginFooterText: { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 'bold' },

  pinContainer: { flex: 1, backgroundColor: '#0052B4', alignItems: 'center', justifyContent: 'center' },
  pinTitle: { color: '#FFF', fontSize: 20, fontWeight: '600', marginBottom: 30 },
  dotsRow: { flexDirection: 'row', marginBottom: 50 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#FFF', marginHorizontal: 12 },
  dotFilled: { backgroundColor: '#00D2FF', borderColor: '#00D2FF' },
  numPad: { flexDirection: 'row', flexWrap: 'wrap', width: 280, justifyContent: 'center' },
  numButton: { width: 75, height: 75, justifyContent: 'center', alignItems: 'center', margin: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 37.5 },
  numText: { color: '#FFF', fontSize: 24, fontWeight: '600' },

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
  
  walletCardId: { backgroundColor: '#80E8FF', borderRadius: 16, padding: 20, height: 175, justifyContent: 'space-between', marginBottom: 20 },
  cardMainTitleId: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  miniPlusId: { backgroundColor: '#FFF', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  miniPlusTextId: { color: '#00D2FF', fontSize: 26, fontWeight: 'bold' },
  cardBottomRow: { flexDirection: 'column' },
  cardPlaceholdersId: { color: '#00469B', fontSize: 28, fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 },
  cardLabelId: { color: 'rgba(0, 70, 155, 0.5)', fontSize: 11, fontWeight: '600' },

  walletCardLicense: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, height: 175, justifyContent: 'space-between', marginBottom: 20 },
  cardMainTitleLicense: { color: '#80E8FF', fontSize: 22, fontWeight: 'bold' },
  miniPlusLicense: { backgroundColor: '#00D2FF', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  miniPlusTextLicense: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  cardPlaceholdersLicense: { color: '#00469B', fontSize: 28, fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 },
  cardLabelLicense: { color: 'rgba(0, 70, 155, 0.3)', fontSize: 11, fontWeight: '600' },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },

  bottomTabBar: { height: 75, backgroundColor: '#003A80', borderTopWidth: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 12 },
  tabItem: { alignItems: 'center' },
  tabIcon: { fontSize: 24, color: '#66A3FF' },
  tabLabel: { fontSize: 11, color: '#66A3FF', marginTop: 4, fontWeight: '500' },
  tabActive: { color: '#FFF', fontWeight: '700' },

  detailContainer: { flex: 1, backgroundColor: '#00469B' },
  detailHeader: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, backgroundColor: '#79E7FF' },
  backArrow: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  detailHeaderTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  moreOptions: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  detailScroll: { paddingBottom: 40 },
  photoContainer: { backgroundColor: '#79E7FF', alignItems: 'center', paddingVertical: 20, width: '100%' },
  idPhotoLive: { width: 130, height: 170, borderRadius: 12, borderWidth: 3, borderColor: 'rgba(255,255,255,0.2)', backgroundColor: '#E0E0E0' },
  idDetailsBlock: { paddingHorizontal: 20, paddingTop: 20 },
  idNumberLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '500' },
  idNumberValue: { color: '#00D2FF', fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 2 },
  detailField: { marginBottom: 18, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 8 },
  fieldLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '600', letterSpacing: 0.5 },
  fieldValue: { color: '#FFF', fontSize: 18, fontWeight: '700', marginTop: 3 },
  detailQrSection: { alignItems: 'center', marginTop: 25, paddingVertical: 20 },
  realQrFrame: { backgroundColor: '#FFF', padding: 12, borderRadius: 16 },
  detailQrSubtext: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 10, fontWeight: '500' }
});