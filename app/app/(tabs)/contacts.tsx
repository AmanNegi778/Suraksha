import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([
    { id: 1, name: '', phone: '' },
    { id: 2, name: '', phone: '' },
    { id: 3, name: '', phone: '' },
  ]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const saved = await AsyncStorage.getItem('emergency_contacts');
      if (saved) setContacts(JSON.parse(saved));
    } catch (error) {
      console.log('Error loading contacts:', error);
    }
  };

  const updateContact = (id: number, field: string, value: string) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const saveContacts = async () => {
    console.log('Save pressed');
    try {
      const filled = contacts.filter(c => c.name && c.phone);
      console.log('Filled:', filled);
      if (filled.length === 0) {
        Alert.alert('Error', 'Please add at least one contact with name and number!');
        return;
      }
      await AsyncStorage.setItem('emergency_contacts', JSON.stringify(contacts));
      Alert.alert('Saved!', 'Emergency contacts saved successfully.');
    } catch (error) {
      console.log('Save error:', error);
      Alert.alert('Error', 'Could not save contacts.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Emergency Contacts</Text>
      <Text style={styles.sub}>These people will be alerted when you trigger SOS</Text>

      {contacts.map((contact, index) => (
        <View key={contact.id} style={styles.card}>
          <Text style={styles.cardTitle}>Contact {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={contact.name}
            onChangeText={(val) => updateContact(contact.id, 'name', val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number (10 digits)"
            keyboardType="phone-pad"
            value={contact.phone}
            maxLength={10}
            onChangeText={(val) => updateContact(contact.id, 'phone', val)}
          />
        </View>
      ))}

      <TouchableOpacity 
        style={styles.saveBtn} 
        onPress={saveContacts}
        activeOpacity={0.7}
      >
        <Text style={styles.saveBtnText}>Save Contacts</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  sub: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E24B4A',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  saveBtn: {
    backgroundColor: '#E24B4A',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    elevation: 4,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});