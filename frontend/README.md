# Ezyone Frontend

Frontend application for the IATA ONE Record hackathon demo, built with Vue 3 + TypeScript + Vite.

## Tech Stack

- Vue 3 (`<script setup>` + Composition API)
- TypeScript
- Vite
- Vue Router
- Pinia
- Axios
- Vue Datepicker
- ECharts (`echarts` + `vue-echarts`) for Weather Forecast graph

## Prerequisites

- Node.js 18+
- Yarn 1.x

## Getting Started

```bash
yarn install
yarn dev
```

App runs at:

- `http://localhost:3002`

## Available Scripts

```bash
yarn dev
yarn build
yarn preview
yarn type-check
```

- `dev`: Starts Vite dev server on port `3002`
- `build`: Production build
- `preview`: Preview the production build
- `type-check`: Runs `vue-tsc`

## Main Routes

- `/shipment-list` — Shipment list page
- `/dashboard` — Shipment Performance (Cargo iQ)
- `/dashboard/detail` — Air Waybill Detail
- `/track-shipment` — Track Shipment (Shipment Details / Weather Forecast / ULD Sensors)

## Key Implemented UI Features

- **Cargo iQ Dashboard**
	- AWB and 1R LO search and filtering
	- Off-canvas detail panel with route map + event list
	- Route map resets to left-most position each time a row is opened

- **Track Shipment**
	- Tabbed content (`Shipment Details`, `Weather Forecast`, `ULD Sensors`)
	- Weather impact line chart and alert panel
	- ULD sensor timeline and thermo cover request card

- **App Header / Notifications**
	- News dropdown with “Temperature Alert”
	- `View Details` navigation into Track Shipment

## Project Structure (important parts)

```text
src/
	router/
		index.ts
		routes.ts
	views/
		Dashboard.vue
		DashboardDetail.vue
		ShipmentList.vue
		TrackShipment.vue
	libs/component/common/
		AppHeader.vue
		AppNavBar.vue
		RecordOffcanvas.vue
	assets/
		1R Logo.png
		Critical Temperature Alert.png
		Thermo Cover ULD.png
		ULD.png
```

## Notes

- Browser tab title is configured as `Ezyone` and route-aware via router metadata.
- If you change route names/paths, update `src/router/routes.ts` to keep title mapping and navigation consistent.
