# Shipment History UI Application

This repository contains a responsive web application for displaying shipment history with an interactive timeline interface, built according to the provided design specifications.

## Features

- Interactive timeline showing shipment events
- Responsive design for both desktop and mobile views
- Support for delayed shipment and exception highlighting
- Expandable comment sections
- Clear status indicators with icons
- Date grouping for multiple events
- Montserrat font integration
- Clarity Design Icons usage

## Getting Started

### Prerequisites

Before running this application, ensure you have:
- Node.js (v16 or higher)
- npm (v7 or higher) or yarn
- A modern web browser

### Installation Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/shipment-history-ui.git
   ```

2. Navigate to the project directory:
   ```bash
   cd shipment-history-ui
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit `http://localhost:3000`

## Usage

The application displays shipment history in a timeline format with the following features:

- Each date is shown only once for multiple events
- Delayed shipments are highlighted with a distinct color
- Shipment exceptions are marked with a unique color
- City and state information adapts to screen size
- Arrived shipments show a map marker icon
- Delivered shipments display a check icon
- Long comments can be expanded/collapsed

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- React Icons