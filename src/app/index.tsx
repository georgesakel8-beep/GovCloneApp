import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, ImageBackground, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- ΟΡΙΣΜΟΣ ΔΕΔΟΜΕΝΩΝ ΓΙΑ ΚΑΘΕ ΧΡΗΣΤΗ ---
const PROFILES = {
  me: {
    fullName: 'ΓΕΩΡΓΙΟΣ ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ',
    lastName: 'ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ',
    firstName: 'ΓΕΩΡΓΙΟΣ',
    givenNameEn: 'GEORGIOS',
    surnameEn: 'SAKELLAROPOULOS',
    idNumber: 'AO714079',
    issueDate: '08/05/2025',
    birthDate: '25/02/2007',
    fatherName: 'ΑΛΕΞΙΟΣ',
    fatherNameEn: 'ALEXIOS',
    motherName: 'ΑΡΕΤΗ',
    birthPlace: 'ΠΑΤΡΑ ΑΧΑΪΑΣ',
    issuanceOffice: 'Υ.Δ.Ε.Ε. ΠΑΤΡΩΝ',
    docCode: 'GR-7489201-BXC-9084',
    photo: require('../../assets/myphoto.jpeg.jpeg'),
  },
  friend: {
    fullName: 'ΑΛΜΠΑΝ ΣΕΡΙΦΑΙ',
    lastName: 'ΣΕΡΙΦΑΙ',
    firstName: 'ΑΛΜΠΑΝ',
    givenNameEn: 'ALΒAN',
    surnameEn: 'SERIFAÏ',
    idNumber: 'AP604273',
    issueDate: '14/09/2007',
    birthDate: '14/08/2007',
    fatherName: 'ΙΡΙΟΝ',
    fatherNameEn: 'IRION',
    motherName: 'ELDISA',
    birthPlace: 'ΠΑΤΡΑ ΑΧΑΙΑΣ',
    issuanceOffice: 'Υ.Δ.Ε.Ε. ΠΑΤΡΩΝ',
    docCode: 'GR-1122334-KLP-5566',
    photo: require('../../assets/friendphoto.jpeg'), 
  }
};

export default function Index() {
  const [screen, setScreen] = useState<'login' | 'pin' | 'wallet' | 'id_detail'>('login');
  const [pin, setPin] = useState('');
  const [showQR, setShowQR] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [currentProfile, setCurrentProfile] = useState(PROFILES.me);

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
        setCurrentProfile(PROFILES.me);
        setTimeout(() => { setScreen('wallet'); setPin(''); }, 200);
      } else if (newPin === '5678') { 
        setCurrentProfile(PROFILES.friend);
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
          <Text style={styles.userName}>{currentProfile.fullName}</Text>
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
      <StatusBar barStyle="light-content" backgroundColor="#00D2FF" />
      
      {/* Watermark με το λογότυπο της ελληνικής κυβέρνησης */}
      {/* Τοποθετημένο πίσω από όλα, αλλά πάνω από το φόντο */}
      <View style={styles.watermarkContainer}>
        <Image 
          source={require('../../assets/greek_government_logo.png')} 
          style={styles.watermarkImage}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => { setScreen('wallet'); setShowQR(false); }}>
          <Text style={styles.backArrow}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle}>Δελτίο Ταυτότητας</Text>
        <TouchableOpacity><Text style={styles.moreOptions}>⋮</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={{ flex: 1, zIndex: 2 }}>

        {/* Επάνω Ανοιχτό Γαλάζιο Πλαίσιο */}
        <View style={styles.photoContainerGradient}>
          <View style={styles.numberSideBox}>
            <Text style={styles.idNumberLabel}>Αριθμός ταυτότητας:</Text>
            <Text style={styles.idNumberValue}>{currentProfile.idNumber}</Text>
            <Text style={[styles.idNumberLabel, { marginTop: 12 }]}>Ημ. Έκδοσης:</Text>
            <Text style={[styles.idNumberValue, { fontSize: 20, fontWeight: '500', marginTop: 2 }]}>{currentProfile.issueDate}</Text>
          </View>
        </View>

        {/* Δυναμική Φωτογραφία */}
        <View style={styles.photoWrapperAbsolute}>
          <Image source={currentProfile.photo} style={styles.idPhotoLive} />
        </View>

        {/* Κάτω Πλαίσιο - ΕΝΤΕΛΩΣ ΔΙΑΦΑΝΟ για να φαίνεται το watermark από πίσω */}
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

          {/* Δυναμικά Στοιχεία Κατόχου */}
          <View style={styles.idDetailsBlock}>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΕΠΩΝΥΜΟ</Text><Text style={styles.fieldValue}>{currentProfile.lastName}</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>SURNAME</Text><Text style={styles.fieldValue}>{currentProfile.surnameEn}</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΟΝΟΜΑ</Text><Text style={styles.fieldValue}>{currentProfile.firstName}</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>GIVEN NAME</Text><Text style={styles.fieldValue}>{currentProfile.givenNameEn}</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΟΝΟΜΑ ΠΑΤΕΡΑ</Text><Text style={styles.fieldValue}>{currentProfile.fatherName}</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>FATHER'S NAME</Text><Text style={styles.fieldValue}>{currentProfile.fatherNameEn}</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΟΝΟΜΑ ΜΗΤΕΡΑΣ (MOTHER'S NAME)</Text><Text style={styles.fieldValue}>{currentProfile.motherName}</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΗΜ. ΓΕΝΝΗΣΗΣ (DATE OF BIRTH)</Text><Text style={styles.fieldValue}>{currentProfile.birthDate}</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΤΟΠΟΣ ΓΕΝΝΗΣΗΣ / PLACE OF BIRTH</Text><Text style={styles.fieldValue}>{currentProfile.birthPlace}</Text></View>
            <View style={styles.detailField}><Text style={styles.fieldLabel}>ΑΡΧΗ ΕΚΔΟΣΗΣ / ISSUANCE OFFICE</Text><Text style={styles.fieldValue}>{currentProfile.issuanceOffice}</Text></View>

            {showQR && (
              <View style={styles.detailQrSection}>
                <View style={styles.realQrFrame}>
                  <Image source={require('../../assets/qrcode.jpeg')} style={{ width: 180, height: 180 }} />
                </View>
                <Text style={styles.detailQrSubtext}>Κωδικός μιας χρήσης για έλεγχο ταυτότητας</Text>
              </View>
            )}

            <View style={styles.footerDocs}>
              <Text style={styles.docCodeText}>Κωδικός εγγράφου: {currentProfile.docCode}</Text>
              <Text style={styles.travelWarningText}>Δεν αποτελεί διεθνές ταξιδιωτικό έγγραφο</Text>
              <Text style={styles.travelWarningText}>Not an international travel document</Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  detailContainer: { flex: 1, backgroundColor: '#0b0197' }, // Αυτό δίνει το μπλε φόντο σε όλη την οθόνη
  
  // Watermark Styles - Τώρα ρυθμισμένο σωστά
  watermarkContainer: {
    position: 'absolute',
    top: 150, // Ξεκινάει πιο κάτω από το header/φωτογραφία
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Βρίσκεται πάνω από το #0b0197 φόντο
    pointerEvents: 'none',
  },
  watermarkImage: {
    width: 650, // Αρκετά μεγάλο για να απλωθεί όμορφα πίσω από το κείμενο
    height: 650,
    opacity: 0.08, // Πολύ αχνό για το εφέ
    tintColor: '#FFFFFF',
  },
  
  detailHeader: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, backgroundColor: '#0077ff', zIndex: 5 },
  backArrow: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  detailHeaderTitle: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  moreOptions: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  
  photoContainerGradient: { backgroundColor: '#0077ff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: 15, height: 140, width: '100%', zIndex: 3 },
  numberSideBox: { flex: 1, justifyContent: 'flex-start' },
  
  photoWrapperAbsolute: { position: 'absolute', right: 20, top: 85, zIndex: 99, elevation: 99 },
  idPhotoLive: { width: 115, height: 150, borderRadius: 12 },
  
  // ΤΟ ΚΛΕΙΔΙ: Διάφανο background εδώ για να περνάει η εικόνα του watermark
  mainDarkSection: { backgroundColor: 'transparent', paddingTop: 110, zIndex: 4 },

  actionGrid: { paddingHorizontal: 16, paddingBottom: 15 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  actionBtn: { backgroundColor: '#FFFFFF', borderRadius: 10, width: '48%', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#EAEAEA' },
  actionBtnActive: { borderColor: '#0077ff', backgroundColor: '#F0FAFF' },
  actionIconImage: { width: 20, height: 20, marginRight: 8, resizeMode: 'contain' },
  miniQrIcon: { width: 20, height: 20, marginRight: 8, borderRadius: 4 },
  actionText: { fontFamily: GOV_FONT, color: '#1A1A1A', fontSize: 13, fontWeight: 'bold', flexShrink: 1 },

  idDetailsBlock: { paddingHorizontal: 20, paddingTop: 10 },
  detailField: { marginBottom: 16, borderBottomWidth: 0.8, borderBottomColor: 'rgba(255, 255, 255, 0.25)', paddingBottom: 10 },
  fieldLabel: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '400', letterSpacing: 0.5 },
  fieldValue: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 25, fontWeight: '400', marginTop: 4, letterSpacing: 0.2 },
  
  detailQrSection: { alignItems: 'center', marginTop: 25, paddingVertical: 15, width: '100%' },
  realQrFrame: { backgroundColor: '#FFF', padding: 12, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  detailQrSubtext: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 12, fontWeight: '500', textAlign: 'center' },

  footerDocs: { marginTop: 25, marginBottom: 20, alignItems: 'center' },
  docCodeText: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 8 },
  travelWarningText: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.35)', fontSize: 11, textAlign: 'center', lineHeight: 16 }
});