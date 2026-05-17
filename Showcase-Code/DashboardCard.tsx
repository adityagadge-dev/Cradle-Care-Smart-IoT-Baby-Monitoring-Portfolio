import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function DashboardShowcase() {

  // ✅ Showcase-only mock data
  const [baby] = useState({
    name: 'Baby',
    isCrying: false,
    isWet: false,
    cryCount: 12,
    wetCount: 7,
    photo: 'https://i.pravatar.cc/300?img=12',
  });

  const getStatus = () => {
    if (baby.isCrying) return '🍼 Crying!';
    if (baby.isWet) return '🩲 Wet! Change Diaper';

    return '🐣 Active';
  };

  // GRAPH SCALE
  const MAX_BAR_HEIGHT = 120;

  const maxValue = Math.max(
    baby.cryCount,
    baby.wetCount,
    1
  );

  const getBarHeight = (value: number) => {

    if (value === 0) return 0;

    return Math.min(
      (value / maxValue) * MAX_BAR_HEIGHT,
      MAX_BAR_HEIGHT
    );
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        {/* TOP ROW */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >

          {/* LEFT SIDE */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >

            <Image
              source={{ uri: baby.photo }}
              style={styles.avatar}
            />

            <View style={{ marginLeft: 10 }}>

              <Text style={styles.name}>
                {baby.name}'s
              </Text>

              <Text style={styles.subtitle}>
                Smart Cradle Dashboard
              </Text>

            </View>

          </View>

          {/* EDIT BUTTON */}
          <Pressable
            style={({ pressed }) => [
              styles.editBtn,
              pressed && {
                opacity: 0.7,
                transform: [{ scale: 0.95 }]
              }
            ]}
          >

            <Text style={styles.editText}>
              Edit
            </Text>

          </Pressable>

        </View>

      </View>

      {/* CONTENT */}
      <ScrollView style={styles.content}>

        {/* STATUS */}
        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            🧠 Baby Status
          </Text>

          <Text style={styles.cardValue}>
            {getStatus()}
          </Text>

        </View>

        {/* COUNTS */}
        <View style={styles.row}>

          <View
            style={[
              styles.smallCard,
              { backgroundColor: '#FFE5E5' }
            ]}
          >

            <Text style={styles.smallTitle}>
              😢 Cry Count
            </Text>

            <Text style={styles.bigText}>
              {baby.cryCount}
            </Text>

          </View>

          <View
            style={[
              styles.smallCard,
              { backgroundColor: '#E6F0FF' }
            ]}
          >

            <Text style={styles.smallTitle}>
              💧 Wet Count
            </Text>

            <Text style={styles.bigText}>
              {baby.wetCount}
            </Text>

          </View>

        </View>

        {/* SUMMARY */}
        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            📊 Summary
          </Text>

          <Text style={styles.cardValue}>
            Total Alerts:
            {' '}
            {baby.cryCount + baby.wetCount}
          </Text>

        </View>

        {/* GRAPH */}
        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            📈 Activity Graph
          </Text>

          <View style={styles.graphContainer}>

            {/* CRY GRAPH */}
            <View style={styles.graphItem}>

              <View
                style={[
                  styles.bar,
                  {
                    height: getBarHeight(
                      baby.cryCount
                    ),
                    backgroundColor: '#FF6B6B'
                  }
                ]}
              />

              <Text>😢</Text>

              <Text>
                {baby.cryCount}
              </Text>

            </View>

            {/* WET GRAPH */}
            <View style={styles.graphItem}>

              <View
                style={[
                  styles.bar,
                  {
                    height: getBarHeight(
                      baby.wetCount
                    ),
                    backgroundColor: '#4D96FF'
                  }
                ]}
              />

              <Text>💧</Text>

              <Text>
                {baby.wetCount}
              </Text>

            </View>

          </View>

        </View>

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

  editBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  editText: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    backgroundColor: '#F4F6FB',
    paddingTop: 10,
  },

  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 2,
  },

  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    color: '#777',
  },

  cardValue: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },

  smallCard: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
  },

  smallTitle: {
    fontSize: 14,
    color: '#555',
  },

  bigText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },

  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 150,
    marginTop: 20,
  },

  graphItem: {
    alignItems: 'center',
  },

  bar: {
    width: 40,
    borderRadius: 10,
    marginBottom: 5,
  },

});