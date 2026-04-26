# EzyOne

## Inspiration
The air cargo industry suffers from severe inefficiencies and data silos, particularly when handling special cargo like **Dangerous Goods (DG)** and **temperature-sensitive pharmaceuticals**.

## Key Problems:
1. **Fragmented data** prevents real-time validation and forces staff into manual data entry.
2. **Quality standards** like Cargo iQ are often hindered by asynchronous updates and manual actions, which creates data gaps and introduces errors.
3. **Current temperature monitoring** is often reactive, meaning handlers only discover an excursion after the damage is done.

## Solution and what it does
**EzyOne** is a centralized, digital air cargo platform built entirely on the **IATA ONE Record** standard. It replaces fragmented data with a **unified digital record** shared via API, integrating automation, visibility, and compliance into a seamless workflow.

### Automated DG Validation
Integrates directly with the **IATA DG AutoCheck API** to check DG documents against the IATA DGR rules.

### Cargo iQ Integration
Updates Cargo iQ milestones in real-time. Passing acceptance checklist instantly triggers the digital **SAC (Shipment Acceptance Check)** milestone, which follows by the **RCS (Ready for Carriage)** status.

### ULD Temperature Tracking
Features a **Cool Life Tracker** that connects to IoT sensors inside the ULD especially cool passive pallets and integrates with live global weather forecasts. The system issues alerts in advance and auto-triggers mitigation tasks.

## How We Built It
We built a dedicated API service using the **C# .NET framework**. This service acts as the intelligent middleware bridging our frontend and the NE:One Server and IATA DG Auto Check. It handles all complex data transformations and core business logic, ensuring data flows securely and efficiently.

The realtime frontend, built with **Vue.js**, communicates with the middleware via structured business models.

The architecture enables modular development and easier code maintenance.

## Challenges we ran into

### Challenge #1 DG AutoCheck Challenge (API / Data Model Transformation Challenges)
Engineer a **C# middleware layer** to handle bidirectional data transformation between **XSDG XML schemas** and **ONE Record Logistic Objects**.

### Challenge #2 Jettainer ULD Challenge
Integrate IoT sensor data and weather forecasts to predict temperature risks before they impact the ULD cool passive pallets "cool life."

### Challenge #3 CargoiQ Challenge
Automate the new **SAC milestone**, ensuring it triggers once checks are synchronized.

## What are you proud of
1. Successfully unified **IATA’s ONE Record (NE:One)**, **DG AutoCheck**, and **Cargo iQ** standards into a single, high-value ecosystem for special cargo handling.
2. Engineered a forward-thinking solution that prioritizes **risk mitigation** and **operational efficiency** through predictive alerts and automated validation.
3. Developed the **EzyOne platform** with an intuitive interface, ensuring complex logistics data is accessible and actionable for all stakeholders.
4. Leveraged high-performance teamwork to bridge the gap from conceptual ideation to a functional prototype within a rapid, agile development cycle.

## What is next step for EzyOne?
1. **IoT Ecosystem Expansion:** Expand our capabilities by integrating with sensor providers. This will allow EzyOne to consume environmental data (vibration, light, and pressure) beyond just temperature, providing a full view of cargo integrity.
2. **AI-Driven Predictive Analytics:** Predict potential "bottleneck" events by analyzing historical Cargo iQ milestone performance, the system will be able to suggest best action item.
3. **Airline/Handler Partnerships:** Partnering with a forward-thinking airline or ground handling agent to run a closed-loop trial on a specific high-volume DG or pharma cargo.

## Built With
**C#**, **vue.js**

## In Details:
In details of Frontend source code, please reference to .../frontend/README.md
In details of Backend source code, please reference to .../Backend/README.md
