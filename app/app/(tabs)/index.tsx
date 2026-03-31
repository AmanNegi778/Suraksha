import { StyleSheet, Text, View, TouchableOpacity, Vibration, Alert } from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [sosActive, setSosActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerSOS = async () => {
    setLoading(true);
    Vibration.vibrate([0, 500, 200, 500]);

    try {
      const saved = await AsyncStorage.getItem('emergency_contacts');
      const contacts = saved ? JSON.parse(saved) : [];
      const numbers = contacts
        .filter(c => c.phone)
        .map(c => '91' + c.phone);

      if (numbers.length === 0) {
        Alert.alert('No Contacts!', 'Please add emergency contacts first.');
        setLoading(false);
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      let location = { lat: 28.6139, lng: 77.2090 };

      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        location = { lat: loc.coords.latitude, lng: loc.coords.longitude };
      }

      const response = await fetch('http://192.168.1.151:3000/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Suraksha User',
          contacts: numbers,
          location: location
        })
      });

      const data = await response.json();
      setSosActive(true);
      Alert.alert('SOS Sent!', 'Your location has been sent to your emergency contacts.');

    } catch (error) {
      setSosActive(true);
      Alert.alert('SOS Activated', 'Contacting emergency contacts...');
    }

    setLoading(false);
  };

  const handleSafe = () => {
    setSosActive(false);
    Vibration.cancel();
    Alert.alert('Glad you are safe!', 'Alert has been cancelled.');
  };

  return (
    <View style={styles.container}>

      <View style={styles.statusBar}>
        <View style={[styles.statusDot, { backgroundColor: sosActive ? '#E24B4A' : '#639922' }]} />
        <Text style={styles.statusText}>{sosActive ? 'SOS ACTIVE' : 'You are safe'}</Text>
      </View>

      <TouchableOpacity
        style={[styles.sosButton, sosActive && styles.sosButtonActive]}
        onPress={triggerSOS}
        disabled={loading}
        activeOpacity={0.8}>
        <Text style={styles.sosText}>{loading ? '...' : 'SOS'}</Text>
        <Text style={styles.sosSubText}>
          {loading ? 'Sending alert...' : sosActive ? 'ALERT SENT' : 'Press for emergency'}
        </Text>
      </TouchableOpacity>

      {sosActive && (
        <TouchableOpacity style={styles.safeButton} onPress={handleSafe}>
          <Text style={styles.safeText}>I AM SAFE</Text>
        </TouchableOpacity>
      )}

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionEmoji}>👮</Text>
          <Text style={styles.actionLabel}>Police</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionEmoji}>🏥</Text>
          <Text style={styles.actionLabel}>Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionEmoji}>👥</Text>
          <Text style={styles.actionLabel}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionEmoji}>🗺️</Text>
          <Text style={styles.actionLabel}>Safe Route</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingTop: 40,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 40,
    elevation: 2,
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E24B4A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginBottom: 30,
  },
  sosButtonActive: {
    backgroundColor: '#a32d2d',
  },
  sosText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
  },
  sosSubText: {
    fontSize: 11,
    color: '#ffcccc',
    marginTop: 4,
  },
  safeButton: {
    backgroundColor: '#639922',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 30,
    elevation: 4,
  },
  safeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionBtn: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    width: 75,
  },
  actionEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionLabel: {
    fontSize: 11,
    color: '#555',
    fontWeight: '500',
  },
});