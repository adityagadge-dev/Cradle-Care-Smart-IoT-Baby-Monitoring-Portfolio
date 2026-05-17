import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function BabySetupShowcase() {

  // ✅ Showcase-only demo states
  const [name, setName] = useState('Baby');
  const [age, setAge] = useState('8');
  const [weight, setWeight] = useState('7');

  const [photo] = useState(
    'https://i.pravatar.cc/300?img=12'
  );

  const handleSave = () => {
    alert('Profile Saved Successfully');
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.headerTitle}>
          My Baby ❤️
        </Text>

        <Text style={styles.headerSub}>
          Update your baby's details
        </Text>

      </View>

      {/* CONTENT */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.card}>

          {/* PROFILE PHOTO */}
          <View style={styles.imageWrapper}>

            <TouchableOpacity style={styles.imageBox}>

              <Image
                source={{ uri: photo }}
                style={styles.image}
              />

            </TouchableOpacity>

            {/* EDIT ICON */}
            <TouchableOpacity style={styles.editIcon}>

              <Text
                style={{
                  color: '#fff',
                  fontSize: 12
                }}
              >
                ✏️
              </Text>

            </TouchableOpacity>

          </View>

          {/* NAME INPUT */}
          <TextInput
            placeholder="Baby Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          {/* AGE INPUT */}
          <View style={styles.inputRow}>

            <TextInput
              placeholder="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              style={styles.inputFlex}
            />

            <Text style={styles.suffix}>
              Month
            </Text>

          </View>

          {/* WEIGHT INPUT */}
          <View style={styles.inputRow}>

            <TextInput
              placeholder="Weight"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              style={styles.inputFlex}
            />

            <Text style={styles.suffix}>
              KG
            </Text>

          </View>

          {/* SAVE BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
          >

            <Text style={styles.buttonText}>
              Save & Continue
            </Text>

          </TouchableOpacity>

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

  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },

  headerSub: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 5,
  },

  content: {
    flex: 1,
    backgroundColor: '#F4F6FB',
    paddingTop: 10,
  },

  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },

  /* PHOTO */
  imageWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
  },

  imageBox: {
    height: 120,
    width: 120,
    backgroundColor: '#eee',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#efefef',
  },

  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },

  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    padding: 6,
  },

  /* INPUTS */
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: '#fafafa',
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: '#fafafa',
    paddingHorizontal: 10,
  },

  inputFlex: {
    flex: 1,
    padding: 14,
  },

  suffix: {
    color: '#777',
    fontWeight: '600',
    marginRight: 5,
  },

  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

});