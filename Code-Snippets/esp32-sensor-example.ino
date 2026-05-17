int wetSensor = 34;

void setup() {
  Serial.begin(115200);
  pinMode(wetSensor, INPUT);
}

void loop() {
  int sensorValue = analogRead(wetSensor);

  if (sensorValue > 2000) {
    Serial.println("Wet detected");
  }

  delay(1000);
}

//The entire code can be found under the ESP32-Code Section.