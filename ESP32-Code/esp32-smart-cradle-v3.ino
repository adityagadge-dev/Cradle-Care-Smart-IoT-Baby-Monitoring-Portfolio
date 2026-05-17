#include <WiFi.h>
#include <HTTPClient.h>
#include <ESP32Servo.h>

// ================== 🔥 EDIT THESE ==================
const char* WIFI_SSID = "YOUR_WIFI NAME";
const char* WIFI_PASS = "YOUR_WIFI PASSWORD";

const String FIREBASE_URL = "PROJECT FIREBASE URL";
// ==================================================

// --- PIN DEFINITIONS ---
const int MIC_PIN   = 34;
const int SOIL_PIN  = 32;
const int SERVO_PIN = 13;

// --- THRESHOLDS ---
const int CRY_THRESHOLD = 3000;
const int WET_THRESHOLD = 2500;

Servo cradleServo;

// 🔥 FLAGS
bool isCryingSent = false;
bool isWetSent = false;

// 🔥 CONTROL FLAGS
bool autoSwing = false;
bool manualSwing = false;

// 🔥 CONTINUOUS SWING STATE
unsigned long lastSwingTime = 0;
bool swingDirection = false;

void setup() {
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n✅ WiFi Connected");

  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);

  cradleServo.setPeriodHertz(50);
  cradleServo.attach(SERVO_PIN, 500, 2400);

  cradleServo.write(90);

  Serial.println("🚀 System Ready");
}

void loop() {

  readControlsFromFirebase();

  int soilValue = analogRead(SOIL_PIN);
  int volume = readMicMax();

  Serial.print("Mic: ");
  Serial.print(volume);
  Serial.print(" | Soil: ");
  Serial.println(soilValue);

  // 🔴 CRY DETECT
  if (volume > CRY_THRESHOLD && !isCryingSent) {

    Serial.println("🚨 Cry detected");

    sendToFirebase("{\"isCrying\":true}");

    if (autoSwing) swingCradle();

    isCryingSent = true;
    delay(3000);

    sendToFirebase("{\"isCrying\":false}");
    isCryingSent = false;
  }

  // 💧 WET DETECT
  if (soilValue < WET_THRESHOLD && !isWetSent) {

    Serial.println("💧 Wet detected");

    sendToFirebase("{\"isWet\":true}");

    if (autoSwing) swingCradle();

    isWetSent = true;
    delay(3000);

    sendToFirebase("{\"isWet\":false}");
    isWetSent = false;
  }

  // 🔥 CONTINUOUS MANUAL SWING (SMOOTH)
  if (manualSwing) {
    continuousSwing();
  } else {
    cradleServo.write(90); // stop at center
  }

  delay(50);
}

// ================== FUNCTIONS ==================

int readMicMax() {
  int signalMax = 0;
  unsigned long start = millis();

  while (millis() - start < 50) {
    int sample = analogRead(MIC_PIN);
    if (sample > signalMax) signalMax = sample;
  }

  return signalMax;
}

// 🔥 AUTO SWING (ONE-TIME)
void swingCradle() {
  for (int i = 0; i < 3; i++) {
    cradleServo.write(60);
    delay(400);
    cradleServo.write(120);
    delay(400);
  }
  cradleServo.write(90);
}

// 🔥 CONTINUOUS SWING (SMOOTH LOOP)
void continuousSwing() {
  unsigned long currentTime = millis();

  if (currentTime - lastSwingTime > 800) {
    lastSwingTime = currentTime;

    if (swingDirection) {
      cradleServo.write(60);
    } else {
      cradleServo.write(120);
    }

    swingDirection = !swingDirection;
  }
}

// 🔥 SEND BABY DATA
void sendToFirebase(String jsonData) {
  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;
    String url = FIREBASE_URL + "/baby.json";

    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    int response = http.PATCH(jsonData);

    Serial.print("Firebase Response: ");
    Serial.println(response);

    http.end();
  }
}

// 🔥 READ CONTROLS FROM FIREBASE
void readControlsFromFirebase() {
  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;
    String url = FIREBASE_URL + "/controls.json";

    http.begin(url);
    int httpCode = http.GET();

    if (httpCode == 200) {
      String payload = http.getString();

      autoSwing = payload.indexOf("\"autoSwing\":true") != -1;
      manualSwing = payload.indexOf("\"manualSwing\":true") != -1;
    }

    http.end();
  }
}