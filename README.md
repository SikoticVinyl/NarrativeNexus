# NarrativeNexus

## Description

This project serves as a learning exercise to transition from a RESTful API to GraphQL using Apollo Server. It aimed to explore GraphQL concepts, such as schema definition, queries, mutations, and subscriptions, while also implementing authentication functionalities. Through this project, I gained a deeper understanding of GraphQL and its integration with the Apollo Server, as well as to experiment with authentication mechanisms overall and really see how much they stand on their own and how they get used. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)

## Installation

To run this project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies for both the client and server:

   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

## Usage

To start the development server and run the project locally, use the following steps:

1. In one terminal, start the server:

   ```bash
   cd server
   npm run dev
   ```

2. In another terminal, start the client:

   ```bash
   cd client
   npm run dev
   ```

3. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Deployment

Deployment of the application is currently in progress through Render. However, there is an issue with the npm build process, where the frontend logic is not correctly built, resulting in only basic Vite files being deployed to the server instead of the complete frontend logic. This issue is currently being addressed and debugged
