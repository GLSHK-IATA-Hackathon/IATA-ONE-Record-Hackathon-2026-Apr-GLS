import time
import random
import paho.mqtt.client as mqtt

class VirtualULD:
    def __init__(self, uld_id, start_lat, start_lon, target_temp, is_refrigerated=False):
        self.uld_id = uld_id
        self.lat = start_lat
        self.lon = start_lon
        self.target_temp = target_temp
        self.current_temp = target_temp
        self.humidity = random.uniform(50.0, 65.0)
        self.battery = 100.0
        self.is_refrigerated = is_refrigerated
        self.alert_triggered = False

    def update_state(self, cycle_count):
        # 1. Movement Simulation
        self.lat += random.uniform(-0.00005, 0.00005)
        self.lon += random.uniform(-0.00005, 0.00005)

        # 2. Simulate Energy Use
        self.battery -= random.uniform(0.01, 0.1)
        if self.battery < 0: self.battery = 0

        # 3. Simulating temperature and humidity fluctuations and faults
        if not self.alert_triggered:
            self.current_temp = self.target_temp + random.uniform(-0.5, 0.5)
            self.humidity += random.uniform(-1.0, 1.0)
        else:
            self.current_temp += random.uniform(1.0, 3.0)

        self.humidity = max(0.0, min(100.0, self.humidity))

        # Simulated refrigerator malfunction during the 5th update
        if self.is_refrigerated and cycle_count == 5:
            self.alert_triggered = True
            print(f"\n [SYSTEM ALERT] {self.uld_id} Hardware detected an abnormal temperature spike!\n")

    def to_raw_payload(self):
        """
	Convert data into a minimal Raw Data string (simulating a low-bandwidth environment string packet).
	Format conventions: Latitude, Longitude, Temperature, Humidity, Battery Level, Alarm Status (0 Normal/1 Abnormal)
        """
        alert_bit = 1 if self.alert_triggered else 0
        raw_string = f"{self.lat:.6f},{self.lon:.6f},{self.current_temp:.2f},{self.humidity:.2f},{self.battery:.2f},{alert_bit}"
        return raw_string

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("MQTT Broker Connected!")
    else:
        print(f"Connection failed, return code {rc}")

def main():
    # --- MQTT Setting ---
    broker = "broker.emqx.io"  
    port = 1883
    base_topic = "hkia/cargo/uld/raw" 
    
    # initialize MQTT Client
    client = mqtt.Client(client_id="Simulator_Node_001")
    client.on_connect = on_connect
    
    print(f"Connecting MQTT Broker: {broker}...")
    client.connect(broker, port, 60)
    
    # Start background threads to handle network traffic and reconnection mechanisms
    client.loop_start()

    # --- Initialize the device ---
    hkg_base_lat = 22.3080
    hkg_base_lon = 113.9185

    ulds = [
        VirtualULD("RAP12345CX", hkg_base_lat + 0.001, hkg_base_lon, target_temp=5.0, is_refrigerated=True),
        VirtualULD("AKE98765CX", hkg_base_lat - 0.002, hkg_base_lon + 0.001, target_temp=25.0),
        VirtualULD("PMC45678CX", hkg_base_lat, hkg_base_lon - 0.002, target_temp=25.0)
    ]

    cycle = 1
    print("\nStarting simulated sending of Raw Data to MQTT...")
    print("Press Ctrl+C to stop.\n")
    
    try:
        while True:
            print(f"--- Transmission cycle {cycle} ---")
            
            for uld in ulds:
                uld.update_state(cycle)
                
                # Get Raw Data string
                raw_payload = uld.to_raw_payload()
                
                # Dynamically generate a unique topic for this device (e.g., hkia/cargo/uld/raw/RAP12345CX)
                topic = f"{base_topic}/{uld.uld_id}"
                
                # Publish via MQTT (QoS 0 means transmit at most once, suitable for high-frequency sensor data that can be lost)
                client.publish(topic, payload=raw_payload, qos=0)
                
                print(f"Published -> Topic: {topic} | Payload: {raw_payload}")

            cycle += 1
            time.sleep(3)
            
    except KeyboardInterrupt:
        print("\nEmulator has stopped")
    finally:
        client.loop_stop()
        client.disconnect()
        print("MQTT disconnected")

if __name__ == "__main__":
    main()