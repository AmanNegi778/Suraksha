import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, TextInput } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [selectedGesture, setSelectedGesture] = useState('power');
  const [duressEnabled, setDuressEnabled] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [fakeCallEnabled, setFakeCallEnabled] = useState(false);
  const [duressPin, setDuressPin] = useState('');
  const [timerMinutes, setTimerMinutes] = useState('20');
  const [locationInterval, setLocationInterval] = useState('5');

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.sectionTitle}>SOS Gesture</Text>
      <View style={styles.card}>
        <Text style={styles.cardSub}>Choose how to trigger SOS</Text>
        <TouchableOpacity
          style={[styles.optionBtn, selectedGesture === 'power' && styles.optionSelected]}
          onPress={() => setSelectedGesture('power')}>
          <Text style={[styles.optionText, selectedGesture === 'power' && styles.optionTextSelected]}>
            Power Button x3
          </Text>
          {selectedGesture === 'power' && <Text style={styles.tick}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionBtn, selectedGesture === 'volume' && styles.optionSelected]}
          onPress={() => setSelectedGesture('volume')}>
          <Text style={[styles.optionText, selectedGesture === 'volume' && styles.optionTextSelected]}>
            Volume Up + Down Hold
          </Text>
          {selectedGesture === 'volume' && <Text style={styles.tick}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionBtn, selectedGesture === 'shake' && styles.optionSelected]}
          onPress={() => setSelectedGesture('shake')}>
          <Text style={[styles.optionText, selectedGesture === 'shake' && styles.optionTextSelected]}>
            Shake Phone 3 Times
          </Text>
          {selectedGesture === 'shake' && <Text style={styles.tick}>✓</Text>}
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Location Update Interval</Text>
      <View style={styles.card}>
        <Text style={styles.cardSub}>How often to send updated location during SOS</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.intervalBtn, locationInterval === '5' && styles.intervalSelected]}
            onPress={() => setLocationInterval('5')}>
            <Text style={[styles.intervalText, locationInterval === '5' && styles.intervalTextSelected]}>Every 5 min</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.intervalBtn, locationInterval === '10' && styles.intervalSelected]}
            onPress={() => setLocationInterval('10')}>
            <Text style={[styles.intervalText, locationInterval === '10' && styles.intervalTextSelected]}>Every 10 min</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Extra Safety Features</Text>
      <View style={styles.card}>

        <View style={styles.toggleRow}>
          <View style={styles.toggleLeft}>
            <Text style={styles.toggleTitle}>Fake Call Screen</Text>
            <Text style={styles.toggleSub}>Press decline on fake call to trigger SOS silently</Text>
          </View>
          <Switch
            value={fakeCallEnabled}
            onValueChange={setFakeCallEnabled}
            trackColor={{ false: '#ddd', true: '#E24B4A' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.toggleRow}>
          <View style={styles.toggleLeft}>
            <Text style={styles.toggleTitle}>Safe Walk Timer</Text>
            <Text style={styles.toggleSub}>Auto SOS if you don't check in on time</Text>
          </View>
          <Switch
            value={timerEnabled}
            onValueChange={setTimerEnabled}
            trackColor={{ false: '#ddd', true: '#E24B4A' }}
            thumbColor="#fff"
          />
        </View>

        {timerEnabled && (
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Minutes to reach destination</Text>
            <TextInput
              style={styles.smallInput}
              value={timerMinutes}
              onChangeText={setTimerMinutes}
              keyboardType="number-pad"
              maxLength={3}
            />
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.toggleRow}>
          <View style={styles.toggleLeft}>
            <Text style={styles.toggleTitle}>Duress PIN</Text>
            <Text style={styles.toggleSub}>A secret PIN that looks normal but triggers SOS silently</Text>
          </View>
          <Switch
            value={duressEnabled}
            onValueChange={setDuressEnabled}
            trackColor={{ false: '#ddd', true: '#E24B4A' }}
            thumbColor="#fff"
          />
        </View>

        {duressEnabled && (
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Set your duress PIN</Text>
            <TextInput
              style={styles.smallInput}
              value={duressPin}
              onChangeText={setDuressPin}
              keyboardType="number-pad"
              maxLength={6}
              secureTextEntry
              placeholder="PIN"
            />
          </View>
        )}

      </View>

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save Settings</Text>
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
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 20,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  cardSub: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#eee',
    marginBottom: 8,
    backgroundColor: '#fafafa',
  },
  optionSelected: {
    backgroundColor: '#fff0f0',
    borderColor: '#E24B4A',
  },
  optionText: {
    fontSize: 14,
    color: '#444',
  },
  optionTextSelected: {
    color: '#E24B4A',
    fontWeight: '600',
  },
  tick: {
    color: '#E24B4A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  intervalBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  intervalSelected: {
    backgroundColor: '#fff0f0',
    borderColor: '#E24B4A',
  },
  intervalText: {
    fontSize: 13,
    color: '#444',
  },
  intervalTextSelected: {
    color: '#E24B4A',
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  toggleLeft: {
    flex: 1,
    paddingRight: 12,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
    marginBottom: 2,
  },
  toggleSub: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  inputLabel: {
    fontSize: 13,
    color: '#555',
    flex: 1,
  },
  smallInput: {
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    width: 70,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  saveBtn: {
    backgroundColor: '#E24B4A',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
    elevation: 4,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});