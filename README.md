# Neighborhood Map Project

## Table of Contents

* [Introduction](#introduction)
* [Functionality](#functionality)
* [Run](#run)
* [Structure](#structure)
* [APIs](#apis)
* [Contributing](#contributing)


## Introduction

This is an app that lets you view some of the most famous museums of 4 different cities, and get information about each museum. It was created from scratch in React.js and uses the Google Maps API and the FourSquare API.


## Functionality

Basic functionality is built, including the following:

- Basic HTML structure
- Basic styling for the app
- Successfully optimized for all types of devices and browser widths
- Feature to view museums for 4 different cities : London, Seoul, New York, Paris
- Feature filter museums based on rating
- Feature to view details for each museum
- Service worker registered


## Run

1. Open the terminal.
2. Clone the repository: `git clone https://github.com/hermy0211/museum-map-react.git`
3. Open the directory to which you have cloned the repository.
4. Install all project dependencies with `npm install`
5. Run `npm start` to start the development server
6. Open the following webpage : `http://localhost:3000`


## Structure
```bash
├── README.md - This file.
├── package.json # Npm package manager file
├── package-lock.json # Npm package manager file
├── public
│   ├── favicon.ico # React icon favicon file
│   └── index.html # Basic HTML template
│   └── manifest.json # JSON file to store basic data
└── src
    ├── components
    │   ├── ListComponent.js # Component for rendering each museum list item
    │   ├── Locations.js # Component for rendering the museum list
    │   └── Sidebar.js # Component for rendering the sidebar
    ├── img # Icons for the app
    │   ├── off.png # Default marker icon image for map
    │   └── on.png # Marker icon image for when marker is clicked
    ├── App.css # Styles for the app
    ├── Responsive.css # Styles for responsiveness
    ├── index.css # Global styles
    ├── App.js # File with main functionality for the app
    ├── registerServiceWorker.js # File to register service worker
    └── index.js # File used for DOM rendering
```


## APIs

Powered by FourSquare and Google Maps API

![Google Logo](./googlemaps.png)
![FourSquare Logo](./foursquare.png)

This project uses the Google Maps APIs and the FourSquare APIs.
For details on each, visit the following pages:

- [Google Maps APIs](https://developers.google.com/maps/documentation/)
- [FourSquare APIs](https://developer.foursquare.com/)


## Contributing

If you have any suggestions to improve this project, feel free to add a pull request and I will see if it seems fit!

1. Fork the project to your own directory.
2. Create a feature branch: `git checkout -b new-feature`
3. Commit your changes: `git commit -m "Explain Feature"`
4. Push to the branch: `git push origin new-feature`
5. Submit a pull request.
