import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

export default function MapScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const areas = [
    { id: 1, name: 'Connaught Place', zone: 'green', reviews: 45, time: 'Safe till 11pm', tags: ['Well lit', 'Busy area'] },
    { id: 2, name: 'Lajpat Nagar', zone: 'amber', reviews: 23, time: 'Caution after 9pm', tags: ['Moderate crowd', 'Some reports'] },
    { id: 3, name: 'Rohini Sector 9', zone: 'red', reviews: 12, time: 'Avoid after 8pm', tags: ['Poorly lit', 'Isolated'] },
    { id: 4, name: 'Karol Bagh', zone: 'green', reviews: 38, time: 'Safe till 10pm', tags: ['Busy market', 'Well lit'] },
    { id: 5, name: 'Dwarka Sector 7', zone: 'amber', reviews: 19, time: 'Caution after 10pm', tags: ['Late night risk', 'Few people'] },
    { id: 6, name: 'Chandni Chowk', zone: 'amber', reviews: 31, time: 'Caution after 9pm', tags: ['Crowded lanes', 'Watch belongings'] },
    { id: 7, name: 'Saket', zone: 'green', reviews: 52, time: 'Safe till midnight', tags: ['Mall area', 'Security present'] },
    { id: 8, name: 'Uttam Nagar', zone: 'red', reviews: 8, time: 'Avoid after 7pm', tags: ['Dark streets', 'Multiple reports'] },
  ];

  const filtered = selectedFilter === 'all' ? areas : areas.filter(a => a.zone === selectedFilter);

  const zoneColor = (zone) => {
    if (zone === 'green') return '#639922';
    if (zone === 'amber') return '#BA7517';
    return '#E24B4A';
  };

  const zoneBg = (zone) => {
    if (zone === 'green') return '#EAF3DE';
    if (zone === 'amber') return '#FAEEDA';
    return '#FCEBEB';
  };

  const zoneLabel = (zone) => {
    if (zone === 'green') return 'Safe';
    if (zone === 'amber') return 'Caution';
    return 'Avoid';
  };

  return (
    <View style={styles.container}>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#639922' }]} />
          <Text style={styles.legendText}>Safe</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#BA7517' }]} />
          <Text style={styles.legendText}>Caution</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#E24B4A' }]} />
          <Text style={styles.legendText}>Avoid</Text>
        </View>
        <TouchableOpacity style={styles.reportBtn}>
          <Text style={styles.reportBtnText}>+ Report</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        {['all', 'green', 'amber', 'red'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, selectedFilter === f && styles.filterSelected]}
            onPress={() => setSelectedFilter(f)}>
            <Text style={[styles.filterText, selectedFilter === f && styles.filterTextSelected]}>
              {f === 'all' ? 'All Areas' : f === 'green' ? 'Safe' : f === 'amber' ? 'Caution' : 'Avoid'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.map(area => (
          <TouchableOpacity key={area.id} style={styles.areaCard}>
            <View style={styles.areaTop}>
              <View style={styles.areaLeft}>
                <Text style={styles.areaName}>{area.name}</Text>
                <Text style={styles.areaTime}>{area.time}</Text>
              </View>
              <View style={[styles.zoneBadge, { backgroundColor: zoneBg(area.zone) }]}>
                <Text style={[styles.zoneText, { color: zoneColor(area.zone) }]}>
                  {zoneLabel(area.zone)}
                </Text>
              </View>
            </View>
            <View style={styles.tagsRow}>
              {area.tags.map((tag, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
              <Text style={styles.reviewCount}>{area.reviews} reviews</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
    elevation: 2,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#555',
  },
  reportBtn: {
    marginLeft: 'auto',
    backgroundColor: '#E24B4A',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  reportBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  filterSelected: {
    backgroundColor: '#E24B4A',
    borderColor: '#E24B4A',
  },
  filterText: {
    fontSize: 12,
    color: '#555',
  },
  filterTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  areaCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
  },
  areaTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  areaLeft: {
    flex: 1,
  },
  areaName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  areaTime: {
    fontSize: 12,
    color: '#888',
  },
  zoneBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  zoneText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 11,
    color: '#555',
  },
  reviewCount: {
    fontSize: 11,
    color: '#aaa',
    marginLeft: 'auto',
  },
});