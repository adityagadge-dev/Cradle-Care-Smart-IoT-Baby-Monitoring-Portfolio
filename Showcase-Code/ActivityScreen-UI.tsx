import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ActivityScreenShowcase() {

  const [filter, setFilter] = useState<
    'all' | 'today' | 'yesterday'
  >('all');

  // ✅ Showcase-only mock activity data
  const logs = [
    {
      type: 'cry',
      time: '21 Apr 2026 • 10:42 AM'
    },
    {
      type: 'wet',
      time: '21 Apr 2026 • 09:15 AM'
    },
    {
      type: 'cry',
      time: '20 Apr 2026 • 08:30 PM'
    },
    {
      type: 'wet',
      time: '20 Apr 2026 • 06:10 PM'
    },
  ];

  // ✅ Simple filter showcase logic
  const filteredLogs = logs.filter((log) => {

    if (filter === 'today') {
      return log.time.includes('21 Apr 2026');
    }

    if (filter === 'yesterday') {
      return log.time.includes('20 Apr 2026');
    }

    return true;
  });

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        {/* BACK BUTTON */}
        <Pressable>
          <Text style={styles.back}>←</Text>
        </Pressable>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.title}>
            Activity Logs
          </Text>

          <Text style={styles.subtitle}>
            Full history
          </Text>
        </View>

      </View>

      {/* FILTERS */}
      <View style={styles.filterContainer}>

        {['today', 'yesterday', 'all'].map((item) => (

          <Pressable
            key={item}
            onPress={() => setFilter(item as any)}
            style={({ pressed }) => [
              styles.filterBtn,
              filter === item && styles.activeFilter,
              pressed && { opacity: 0.7 }
            ]}
          >

            <Text
              style={[
                styles.filterText,
                filter === item && {
                  color: '#fff'
                }
              ]}
            >
              {item.toUpperCase()}
            </Text>

          </Pressable>

        ))}

      </View>

      {/* CONTENT */}
      <ScrollView style={styles.content}>

        {filteredLogs.length === 0 ? (

          <Text
            style={{
              textAlign: 'center',
              marginTop: 20
            }}
          >
            No activity found
          </Text>

        ) : (

          filteredLogs.map((log, index) => (

            <View key={index} style={styles.card}>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >

                <Text style={styles.icon}>
                  {log.type === 'cry'
                    ? '🍼'
                    : '🩲'}
                </Text>

                <View style={{ marginLeft: 10 }}>

                  <Text style={styles.type}>
                    {log.type === 'cry'
                      ? 'Baby Crying'
                      : 'Baby Wet'}
                  </Text>

                  <Text style={styles.time}>
                    {log.time}
                  </Text>

                </View>

              </View>

            </View>

          ))
        )}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },

  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#6C63FF',
  },

  back: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 3,
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#F4F6FB',
  },

  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },

  activeFilter: {
    backgroundColor: '#6C63FF',
  },

  filterText: {
    fontSize: 12,
    fontWeight: '600',
  },

  content: {
    flex: 1,
    backgroundColor: '#F4F6FB',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 18,
    borderRadius: 15,
    elevation: 4,
  },

  icon: {
    fontSize: 24,
  },

  type: {
    fontSize: 16,
    fontWeight: '600',
  },

  time: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

});