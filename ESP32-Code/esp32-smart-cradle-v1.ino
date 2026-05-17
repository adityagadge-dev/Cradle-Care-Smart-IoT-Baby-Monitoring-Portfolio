#include <WiFi.h>
#include <HTTPClient.h>
#include <ESP32Servo.h>

// ================== 🔥 EDIT THESE ==================
const char* WIFI_SSID = "YOUR_WIFI NAME";        // ✅ CHANGE
const char* WIFI_PASS = "YOUR_WIFI PASSWORD";    // ✅ CHANGE

// ✅ YOUR FIREBASE REALTIME DB URL (NO trailing /)
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

// 🔥 PREVENT MULTIPLE TRIGGERS
bool isCryingSent = false;
bool isWetSent = false;

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

    isCryingSent = true;
    delay(3000);

    sendToFirebase("{\"isCrying\":false}");
    isCryingSent = false;
  }

  // 💧 WET DETECT
  if (soilValue < WET_THRESHOLD && !isWetSent) {

    Serial.println("💧 Wet detected");

    sendToFirebase("{\"isWet\":true}");

    isWetSent = true;
    delay(3000);

    sendToFirebase("{\"isWet\":false}");
    isWetSent = false;
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

void sendToFirebase(String jsonData) {
  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;

    // ✅ PATCH baby node
    String url = FIREBASE_URL + "/baby.json";

    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    int response = http.PATCH(jsonData);

    Serial.print("Firebase Response: ");
    Serial.println(response);

    http.end();
  } else {
    Serial.println("❌ WiFi Disconnected");
  }
}