import paho.mqtt.client as mqtt
import urllib2
import json
import datetime

# --- Configuration ---
MQTT_BROKER = "broker.emqx.io"
MQTT_PORT = 1883
MQTT_TOPIC = "hkia/cargo/uld/raw/#" # The '#' wildcard subscribes to all ULDs under this path

API_ENDPOINT = "https://localhost:7183/api/ULDMonitor/ULDStatusReport"

def post_to_api(payload_dict):
    """Converts dictionary to JSON and sends a POST request to the API."""
    try:
        req = urllib2.Request(API_ENDPOINT)
        req.add_header('Content-Type', 'application/json')
        
        # Convert dictionary back to a JSON string
        json_data = json.dumps(payload_dict)
        
        # urllib2.urlopen automatically executes a POST request if 'data' is provided
        response = urllib2.urlopen(req, data=json_data)
        
        print "API POST Success | HTTP Code: {0}".format(response.getcode())
        
    except urllib2.HTTPError as e:
        print "API POST Failed | HTTP Error: {0} {1}".format(e.code, e.reason)
    except urllib2.URLError as e:
        print "API POST Failed | URL Error: {0} (Is your API running?)".format(e.reason)
    except Exception as e:
        print "API POST Failed | Unexpected Error: {0}".format(str(e))

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print "Connected to MQTT Broker successfully!"
        # Subscribe to the topic upon successful connection
        client.subscribe(MQTT_TOPIC)
        print "Subscribed to topic: {0}".format(MQTT_TOPIC)
    else:
        print "Connection failed with result code {0}".format(rc)

def on_message(client, userdata, msg):
    try:
        # 1. Parse Topic to extract the ULD ID
        # Topic format: hkia/cargo/uld/raw/RAP12345CX
        topic_parts = msg.topic.split('/')
        uld_id = topic_parts[-1]

        # 2. Decode Raw Payload
        # Payload format: lat,lon,temp,humidity,battery,alert_bit
        raw_data = msg.payload.decode('utf-8')
        data_parts = raw_data.split(',')

        if len(data_parts) != 6:
            print "Warning: Ignored invalid payload format: {0}".format(raw_data)
            return

        # 3. Type Casting
        lat = float(data_parts[0])
        lon = float(data_parts[1])
        temp = float(data_parts[2])
        humidity = float(data_parts[3])
        battery = float(data_parts[4])
        alert_bit = int(data_parts[5])

        # Generate UTC Timestamp (ISO 8601 format)
        timestamp = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

        # 4. Reconstruct the Readable API Format
        readable_payload = {
            "uldId": uld_id,
            "timestamp": timestamp,
            "geolocation": {
                "latitude": lat,
                "longitude": lon
            },
            "measurements": {
                "temperature_C": temp,
                "humidity_percent": humidity
            },
            "deviceStatus": {
                "batteryLevel": battery,
                "isAlert": bool(alert_bit)
            }
        }

        print "\n[Received] ULD: {0} | Raw Payload: {1}".format(uld_id, raw_data)
        print "[Parsed] Formatted to JSON. Routing to API..."
        
        # 5. Send to your Backend API
        post_to_api(readable_payload)

    except Exception as e:
        print "Error processing message: {0}".format(str(e))

def main():
    client = mqtt.Client(client_id="Backend_Handler_Node_001_PY2")
    client.on_connect = on_connect
    client.on_message = on_message
    
    print "Starting MQTT-to-API Handler..."
    print "Connecting to MQTT Broker: {0}...".format(MQTT_BROKER)
    
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    
    try:
        # loop_forever() blocks the execution and handles reconnections automatically
        client.loop_forever()
    except KeyboardInterrupt:
        print "\nHandler stopped by user."
    finally:
        client.disconnect()
        print "MQTT Disconnected."

if __name__ == "__main__":
    main()