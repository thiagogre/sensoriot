#include <WiFi.h>
#include <HTTPClient.h>

#define ANALOG_SENSOR_PIN 34

int analogState = 0;

const char* ssid = "";
const char* password = "";
const char* serverUrl = "https://sensoriot-seven.vercel.app/api/sensordata";

void setup() {
  Serial.begin(115200);

  pinMode(ANALOG_SENSOR_PIN, INPUT);
  delay(1000);
  
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");


}

void loop() {
  // Make HTTP POST request
  makePostRequest();
  
  delay(5000);
}

void makePostRequest() {
  HTTPClient http;
  
  // Your target server and endpoint
  http.begin(serverUrl);
  
  // Set the content type to JSON or any other as needed
  http.addHeader("Content-Type", "application/json");

  analogState = analogRead(ANALOG_SENSOR_PIN);

  Serial.println(analogState);
  
  // Your JSON payload for the POST request
  String jsonPayload =  "{\"value\": " + String(analogState) + "}";
  
  // Send the POST request
  int httpResponseCode = http.POST(jsonPayload);
  
  // Check for errors
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    Serial.println(response);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  
  // Close connection
  http.end();
}
