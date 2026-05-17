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

// 🔥 CONTROL FLAGS FROM FIREBASE
bool autoSwing = false;
bool forceSwing = false;

void setup() {
  Serial.begin(115200);

  // --- WiFi CONNECT ---
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n✅ WiFi Connected");

  // --- SERVO SETUP ---
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

  // 🔥 GET CONTROL VALUES
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

    // ✅ AUTO SWING
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

    // ✅ AUTO SWING
    if (autoSwing) swingCradle();

    isWetSent = true;
    delay(3000);

    sendToFirebase("{\"isWet\":false}");
    isWetSent = false;
  }

  // 🔥 FORCE SWING FROM APP
  if (forceSwing) {
    Serial.println("🎯 Force Swing Triggered");
    swingCradle();

    // reset flag in DB
    sendControlToFirebase("{\"forceSwing\":false}");
    forceSwing = false;
  }

  delay(200);
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

// 🔥 SWING FUNCTION (NO CHANGE TO YOUR CORE LOGIC)
void swingCradle() {
  for (int i = 0; i < 3; i++) {
    cradleServo.write(60);
    delay(400);
    cradleServo.write(120);
    delay(400);
  }
  cradleServo.write(90);
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

// 🔥 SEND CONTROL DATA (forceSwing reset)
void sendControlToFirebase(String jsonData) {
  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;
    String url = FIREBASE_URL + "/controls.json";

    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    http.PATCH(jsonData);
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

      // simple parsing (fast & works)
      autoSwing = payload.indexOf("\"autoSwing\":true") != -1;
      forceSwing = payload.indexOf("\"forceSwing\":true") != -1;
    }

    http.end();
  }
}