import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- ΟΡΙΣΜΟΣ ΔΕΔΟΜΕΝΩΝ ΓΙΑ ΚΑΘΕ ΧΡΗΣΤΗ ---
const PROFILES = {
  me: {
    fullName: 'ΓΕΩΡΓΙΟΣ ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ',
    lastName: 'ΣΑΚΕΛΛΑΡΟΠΟΥΛΟΣ',
    firstName: 'ΓΕΩΡΓΙΟΣ',
    givenNameEn: 'GEORGIOS',
    surnameEn: 'SAKELLAROPOULOS',
    idNumber: 'AO714079',
    issueDate: '08/05/2024',
    birthDate: '25/02/2007',
    fatherName: 'ΑΛΕΞΙΟΣ',
    fatherNameEn: 'ALEXIOS',
    motherName: 'ΑΡΕΤΗ',
    birthPlace: 'ΠΑΤΡΑ ΑΧΑΪΑΣ',
    issuanceOffice: 'Υ.Δ.Ε.Ε. ΠΑΤΡΩΝ',
    docCode: 'GR-7489201-BXC-9084',
    photo: require('../../assets/myphoto.jpeg.jpeg'), // Η δική σου έγχρωμη φωτογραφία
  },
  friend: {
    fullName: 'ΑΛΜΠΑΝ ΣΕΡΙΦΑΙ',
    lastName: 'ΣΕΡΙΦΑΙ',
    firstName: 'ΑΛΜΠΑΝ',
    givenNameEn: 'ALBAN',
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
    photo: require('../../assets/friendphoto.png'), // Η έγχρωμη φωτογραφία του φίλου σου
  }
};

export default function Index() {
  const [screen, setScreen] = useState<'pin' | 'id'>('pin');
  const [pin, setPin] = useState('');
  const [currentProfile, setCurrentProfile] = useState(PROFILES.me);

  const handlePinInput = (value: string) => {
    if (pin.length < 4) {
      const newPin = pin + value;
      setPin(newPin);
      
      if (newPin.length === 4) {
        if (newPin === '1234') {
          setCurrentProfile(PROFILES.me);
          setTimeout(() => setScreen('id'), 200);
        } else if (newPin === '5678') {
          setCurrentProfile(PROFILES.friend);
          setTimeout(() => setScreen('id'), 200);
        } else {
          Alert.alert('Σφάλμα', 'Λανθασμένος κωδικός PIN', [{ text: 'OK', onPress: () => setPin('') }]);
        }
      }
    }
  };

  const handleLogout = () => {
    setPin('');
    setScreen('pin');
  }

  // --- ΟΘΟΝΗ ΕΙΣΑΓΩΓΗΣ PIN ---
  if (screen === 'pin') {
    return (
      <View style={styles.pinContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        {/* Απόλυτα διαφανές Status Bar για να πιάνει όλη την οθόνη */}
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
        <Text style={styles.pinTitle}>Εισάγετε κωδικό PIN</Text>
        
        <View style={styles.dotsRow}>
          {[1, 2, 3, 4].map((_, i) => (
            <View key={i} style={[styles.dot, pin.length > i && styles.dotFilled]} />
          ))}
        </View>

        <View style={styles.numPad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '◀'].map((num, i) => (
            <TouchableOpacity key={i} style={styles.numButton} onPress={() => {
              if (num === 'C') setPin('');
              else if (num === '◀') setPin(pin.slice(0, -1));
              else handlePinInput(num);
            }}>
              <Text style={styles.numText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  // --- ΟΘΟΝΗ ΤΑΥΤΟΤΗΤΑΣ ---
  return (
    <View style={styles.detailContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Απόλυτα διαφανές Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* Κρατικό Watermark στο υπόβαθρο */}
      <View style={styles.watermarkContainer}>
        <Image
          source={require('../../assets/greek_government_logo.png')}
          style={styles.watermarkImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={handleLogout} style={styles.backButtonTouchable}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle}>Δελτίο Ταυτότητας</Text>
        <TouchableOpacity><Text style={styles.moreOptions}>⋮</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={{ flex: 1 }}>

        {/* Επάνω Ανοιχτό Γαλάζιο Πλαίσιο */}
        <View style={styles.photoContainerGradient}>
          <View style={styles.numberSideBox}>
            <Text style={styles.idNumberLabel}>Αριθμός ταυτότητας:</Text>
            <Text style={styles.idNumberValue}>{currentProfile.idNumber}</Text>
            <Text style={[styles.idNumberLabel, { marginTop: 12 }]}>Ημ. Έκδοσης:</Text>
            <Text style={[styles.idNumberValue, { fontSize: 20, fontWeight: '500', marginTop: 2 }]}>{currentProfile.issueDate}</Text>
          </View>
        </View>

        {/* Απόλυτα τοποθετημένη Φωτογραφία */}
        <View style={styles.photoWrapperAbsolute}>
          <Image source={currentProfile.photo} style={styles.idPhotoLive} />
        </View>

        {/* Κάτω Σκούρο Μπλε Πλαίσιο */}
        <View style={styles.mainDarkSection}>

          {/* Action Grid */}
          <View style={styles.actionGrid}>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="wallet-outline" size={20} color="#1A1A1A" style={{ marginRight: 8 }} />
                <Text style={styles.actionText}>Προσθήκη στο Wallet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="documents-outline" size={20} color="#1A1A1A" style={{ marginRight: 8 }} />
                <Text style={styles.actionText}>Αντίγραφο</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="qr-code-outline" size={20} color="#1A1A1A" style={{ marginRight: 8 }} />
                <Text style={styles.actionText}>Προβολή QR κωδικού</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="search-outline" size={20} color="#1A1A1A" style={{ marginRight: 8 }} />
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

            <View style={styles.footerDocs}>
              <Text style={styles.docCodeText}>Κωδικός εγγράφου: {currentProfile.docCode}</Text>
              <Text style={styles.travelWarningText}>Δεν αποτελεί διεθνές ταξιδιωτικό έγγραφο</Text>
              <Text style={styles.travelWarningText}>Not an international travel document</Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const GOV_FONT = Platform.OS === 'ios' ? 'System' : 'sans-serif';

const styles = StyleSheet.create({
  pinContainer: { flex: 1, backgroundColor: '#0052B4', alignItems: 'center', justifyContent: 'center' },
  pinTitle: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 20, fontWeight: '600', marginBottom: 30 },
  dotsRow: { flexDirection: 'row', marginBottom: 50 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#FFF', marginHorizontal: 12 },
  dotFilled: { backgroundColor: '#00D2FF', borderColor: '#00D2FF' },
  numPad: { flexDirection: 'row', flexWrap: 'wrap', width: 280, justifyContent: 'center' },
  numButton: { width: 75, height: 75, justifyContent: 'center', alignItems: 'center', margin: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 37.5 },
  numText: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 24, fontWeight: '600' },

  detailContainer: { flex: 1, backgroundColor: '#00D2FF' },
  
  watermarkContainer: {
    position: 'absolute',
    top: 150, 
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, 
    pointerEvents: 'none',
  },
  watermarkImage: {
    width: 580, 
    height: 580, 
    opacity: 0.05, 
    tintColor: '#FFFFFF',
  },
  
  // Το header πλέον "σπρώχνει" τα στοιχεία κάτω από το ρολόι
  detailHeader: { 
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 10 : 55,
    paddingBottom: 15,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    backgroundColor: '#00D2FF', 
    zIndex: 5 
  },
  backButtonTouchable: { padding: 5 }, 
  backArrow: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 28, fontWeight: '300', marginTop: -5 },
  detailHeaderTitle: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  moreOptions: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  
  photoContainerGradient: { backgroundColor: '#00D2FF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: 15, height: 140, width: '100%', zIndex: 3 },
  numberSideBox: { flex: 1, justifyContent: 'flex-start' },
  
  idNumberLabel: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '400' },
  idNumberValue: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 27, fontWeight: 'bold', marginTop: 2 },

  photoWrapperAbsolute: { position: 'absolute', right: 20, top: 85, zIndex: 99, elevation: 99 },
  idPhotoLive: { width: 115, height: 150, borderRadius: 12 },
  
  mainDarkSection: { backgroundColor: '#0b0197', paddingTop: 110, zIndex: 2 },

  actionGrid: { paddingHorizontal: 16, paddingBottom: 15, zIndex: 3 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  actionBtn: { backgroundColor: '#FFFFFF', borderRadius: 10, width: '48%', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#EAEAEA' },
  actionText: { fontFamily: GOV_FONT, color: '#1A1A1A', fontSize: 13, fontWeight: 'bold', flexShrink: 1 },

  idDetailsBlock: { paddingHorizontal: 20, paddingTop: 10, zIndex: 3 },
  detailField: { marginBottom: 16, borderBottomWidth: 0.8, borderBottomColor: 'rgba(255, 255, 255, 0.25)', paddingBottom: 10 },
  fieldLabel: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '400', letterSpacing: 0.5 },
  fieldValue: { fontFamily: GOV_FONT, color: '#FFF', fontSize: 25, fontWeight: '400', marginTop: 4, letterSpacing: 0.2 },
  
  footerDocs: { marginTop: 25, marginBottom: 20, alignItems: 'center' },
  docCodeText: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 8 },
  travelWarningText: { fontFamily: GOV_FONT, color: 'rgba(255,255,255,0.35)', fontSize: 11, textAlign: 'center', lineHeight: 16 }
});