import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreenShowcase() {

  // ✅ Showcase-only demo states
  const [autoSwing, setAutoSwing] = useState(true);
  const [manualSwing, setManualSwing] = useState(false);

  // ✅ Mock data for portfolio showcase
  const baby = {
    name: 'Baby',
    isCrying: false,
    isWet: false,
    photo: 'https://i.pravatar.cc/150?img=12',
  };

  const logs = [
    { type: 'cry', time: '10:42 AM' },
    { type: 'wet', time: '09:15 AM' },
    { type: 'cry', time: '08:30 AM' },
  ];

  const getStatus = () => {
    if (baby.isCrying) return '🍼 Crying!';
    if (baby.isWet) return '🩲 Wet! Change Diaper';

    return '😴 Sleeping';
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <Image
            source={{ uri: baby.photo }}
            style={styles.avatar}
          />

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.title}>
              {baby.name}'s
            </Text>

            <Text style={styles.subtitle}>
              Smart Cradle
            </Text>
          </View>

        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>

        {/* STATUS CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            🧠 Baby Status
          </Text>

          <Text style={styles.status}>
            {getStatus()}
          </Text>
        </View>

        {/* RECENT ACTIVITY */}
        <View style={styles.card}>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >

            <Text style={styles.cardTitle}>
              🕒 Recent Activity
            </Text>

            <Text style={styles.viewAll}>
              View All
            </Text>

          </View>

          {logs.map((log, index) => (
            <Text key={index} style={styles.logItem}>
              {log.time} — {log.type === 'cry'
                ? '🍼 Baby cried'
                : '🩲 Baby wet'}
            </Text>
          ))}

        </View>

        {/* CONTROLS */}
        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Controls
          </Text>

          {/* MANUAL SWING */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && {
                transform: [{ scale: 0.95 }],
                opacity: 0.8
              },
              manualSwing && {
                backgroundColor: '#2E7D32'
              }
            ]}
            onPress={() => setManualSwing(!manualSwing)}
          >
            <Text style={styles.buttonText}>
              🎮 Manual Swing: {manualSwing ? 'ON' : 'OFF'}
            </Text>
          </Pressable>

          {/* AUTO SWING */}
          <Pressable
            style={({ pressed }) => [
              styles.buttonSecondary,
              pressed && {
                transform: [{ scale: 0.95 }],
                opacity: 0.8
              }
            ]}
            onPress={() => setAutoSwing(!autoSwing)}
          >
            <Text style={styles.buttonText}>
              🔄 Auto Swing: {autoSwing ? 'ON' : 'OFF'}
            </Text>
          </Pressable>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C63FF'
  },

  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 25,
    backgroundColor: '#6C63FF',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#efefef',
  },

  content: {
    flex: 1,
    backgroundColor: '#F4F6FB',
    paddingTop: 10
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff'
  },

  subtitle: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 2
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10
  },

  status: {
    fontSize: 22,
    fontWeight: '600'
  },

  logItem: {
    fontSize: 14,
    marginTop: 6,
    color: '#444'
  },

  viewAll: {
    color: '#2196F3',
    fontWeight: 'bold'
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  },

  buttonSecondary: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});