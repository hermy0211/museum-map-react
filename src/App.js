import React, { Component } from 'react'
import './App.css'
import './Responsive.css'
import onImage from './img/on.png'
import offImage from './img/off.png'
import Sidebar from './components/Sidebar'

class App extends Component {
  state = {
    map: {},
    location: {title: "london", latlng: {lat: 51.507351, lng: -0.127758}},
    museums: [],
    filteredMuseums: [],
    markers: [],
    infoWindow: {},
    ratingsFilter: "all"
  }

  // Load google map
  componentDidMount = (prop) => {
    window.initMap = this.initMap
    loadMapJS(
      "https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDNLkQ8R5Xotv79Qk7gXr7K_IcbpvkVzB8&callback=initMap"
    )
  }

  // Initialize app
  initMap = () => {
    // Add blue and white theme to map
    const styles = [
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{"saturation": 36},{"color": "#333333"},{"lightness": 40}]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{"visibility": "on"},{"color": "#ffffff"},{"lightness": 16}]
      },
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#fefefe"},{"lightness": 20}]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#fefefe"},{"lightness": 17},{"weight": 1.2}]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{"color": "#f5f5f5"},{"lightness": 20}]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{"color": "#f5f5f5"},{"lightness": 21}]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{"color": "#dedede"},{"lightness": 21}]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#ffffff"},{"lightness": 17}]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#ffffff"},{"lightness": 29},{"weight": 0.2}]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{"color": "#ffffff"},{"lightness": 18}]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{"color": "#ffffff"},{"lightness": 16}]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{"color": "#f2f2f2"},{"lightness": 19}]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#1371EB"},{"lightness": 70}]
      }
    ]

    // Declare local variables
    let infoWindow = new window.google.maps.InfoWindow()
    let currentLocation = this.state.location.latlng

    // Create map on page
    let map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: currentLocation,
      mapTypeControl: false,
      styles: styles
    })

    this.setState({map: map, infoWindow: infoWindow})

    // Get all of the museums within a certain radius of the city
    let request = {
      location: currentLocation,
      radius: '1500',
      type: ['museum']
    }

    let service = new window.google.maps.places.PlacesService(map)
    service.nearbySearch(request, this.getMuseums)
  }

  // Get the intial museums to load by default
  getMuseums = (results, status) => {
    // Declare local variables
    let infoWindow = this.state.infoWindow
    let tempMuseums = []

    // If the museums have successfully loaded, set them into the state
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i]
        tempMuseums.push(place)
      }
    }
    this.setState({museums: Object.values(tempMuseums), filteredMuseums: Object.values(tempMuseums)})


    // More local variables
    let allMuseums = this.state.museums
    let map = this.state.map
    let markers = this.state.markers

    // Create markers for each museum
    allMuseums.forEach((museum) => {
      let marker = new window.google.maps.Marker({
        position: museum.geometry.location,
        animation: window.google.maps.Animation.DROP,
        map: map,
        icon: offImage
      })
      markers.push(marker)

      // Add click event listeners to each marker to open info window
      window.google.maps.event.addListener(marker, 'click', () => {
        for (let marker of this.state.markers) {
          marker.setIcon(offImage)
        }
        marker.setIcon(onImage)
        this.createInfoWindow(marker, infoWindow)
      })
    })
  }

  // When a city is selected on the location filter, change the map to that city
  changeLocation = (value) => {
    const locations = [
      {title: "london", latlng: {lat: 51.507351, lng: -0.127758}},
      {title: "seoul", latlng: {lat: 37.566536, lng: 126.977966}},
      {title: "newyork", latlng: {lat: 40.712776, lng: -74.005974}},
      {title: "paris", latlng: {lat: 48.856613, lng: 2.352222}}
    ]

    for (let index of locations) {
      if (index.title === value) {
        this.setState({location: index, museums: [], filteredMuseums: [], ratingsFilter: "all"}, this.initMap)
      }
    }
  }

  // When a rating is selected on the ratings filter, dynamically update the list view
  filterList = (value) => {
    // Define local variables
    let allMuseums = this.state.museums
    let filteredMuseums
    let allMarkers = this.state.markers
    let filteredMarkers = []
    let map = this.state.map
    let infoWindow = this.state.infoWindow

    // Filter the list of museums and markers for each case
    if (value === "overfour") {
      filteredMuseums = allMuseums.filter(museum => museum.rating >= 4)
      this.setState({
        filteredMuseums: filteredMuseums,
        ratingsFilter: "overfour"
      })
    } else if (value === "overthree") {
      filteredMuseums = allMuseums.filter(museum => museum.rating >= 3)
      this.setState({
        filteredMuseums: filteredMuseums,
        ratingsFilter: "overthree"
      })
    } else if (value === "overtwo") {
      filteredMuseums = allMuseums.filter(museum => museum.rating >= 2)
      this.setState({
        filteredMuseums: filteredMuseums,
        ratingsFilter: "overtwo"
      })
    } else if (value === "overone") {
      filteredMuseums = allMuseums.filter(museum => museum.rating >= 1)
      this.setState({
        filteredMuseums: filteredMuseums,
        ratingsFilter: "overone"
      })
    } else {
      filteredMuseums = allMuseums
      this.setState({
        filteredMuseums: filteredMuseums,
        ratingsFilter: "all"
      })
    }

    allMarkers.forEach((marker) => marker.setMap(null))

    // Create markers for each filtered museum
    filteredMuseums.forEach((museum) => {
      let marker = new window.google.maps.Marker({
        position: museum.geometry.location,
        map: map,
        icon: offImage
      })
      filteredMarkers.push(marker)

      // Add click event listeners to each marker to open info window
      window.google.maps.event.addListener(marker, 'click', () => {
        for (let marker of this.state.markers) {
          marker.setIcon(offImage)
        }
        marker.setIcon(onImage)
        this.createInfoWindow(marker, infoWindow)
      })
    })

    this.setState({markers: filteredMarkers})
  }

  // Create an info window for each marker
  createInfoWindow = (marker, infoWindow) => {
    // Define local variables
    let map = this.state.map
    let allMuseums = this.state.museums
    let selectedMuseum

    // Find the museum that corresponds to the marker
    for (let museum of allMuseums) {
      if (marker.getPosition() === museum.geometry.location) {
        selectedMuseum = museum
      }
    }

    // Set the info window's marker to the selected marker
    infoWindow.marker = marker


    // Use the FourSquare API to render data on the info window
    // Define access keys
    const clientId = "YZIS0SV0IAU3H0JZTEZUL00QTSGJS2PHDM0L42DBKO2K4MVF"
    const clientSecret = "T1ZOR2XGCNTD13MPH2LKYW001YCPJWSEIC0XUYYO3ONGFKBR"

    // Define fetch url
    let url =
      "https://api.foursquare.com/v2/venues/search?client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&v=20130815&ll=" +
      marker.getPosition().lat() +
      "," +
      marker.getPosition().lng() +
      "&limit=1"

    // Fetch the data for each location and render the info window accordingly
    fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        infoWindow.setContent(`
          <div>
            <p><b>${selectedMuseum.name}</b></p>
            <div>No data available</div>
          </div>
        `)
        return
      }

      response.json()
      .then((data) => {
        let location_data = data.response.venues[0]
        let street = `<p>${location_data.location.formattedAddress[0]}</p>`

        let contact
        (location_data.contact.phone) ? contact = `<p><small>${location_data.contact.phone}</small></p>` : contact = `<p>Contact unavailable</p>`

        let checkinsCount =
          `<p>Number of CheckIns: ` +
          location_data.stats.checkinsCount +
          `</p>`

        let readMore =
          `<a href="https://foursquare.com/v/` +
          location_data.id +
          `" target="_blank">Learn More</a>`

        infoWindow.setContent(
          `<div>
            <p><b>${selectedMuseum.name}</b></p>`
            + street + contact + checkinsCount + readMore +
          `</div>`)
      })
    })

    .catch((e) => {
      infoWindow.setContent(`
        <div>
          <p><b>${selectedMuseum.name}</b></p>
          <div>No data available</div>
        </div>
      `)
    })

    // Open the info window for the selected marker
    infoWindow.open(map, marker)

    // When clicking on the close button, close the window
    window.google.maps.event.addListener(infoWindow, 'closeclick', () => {
      infoWindow.marker = null
      marker.setIcon(offImage)
    })
  }

  // When a list item is selected, bounce the corresponding marker
  showMarker = (place) => {
    let museumLatLng = place.geometry.location
    let markers = this.state.markers

    for (let marker of markers) {
      if (marker.getPosition() === museumLatLng) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        window.setTimeout(() => {
          marker.setAnimation(null)
        }, 1400)
      }
    }
  }

  // Render the view
  render = () => {
    return (
      <div className="app">
        <div id="map-container">
          <div id="map" role="application">
          </div>
        </div>
        <Sidebar
          location = {this.state.location}
          changeLocation = {this.changeLocation}
          museums = {this.state.filteredMuseums}
          filterList = {this.filterList}
          ratingsFilter = {this.state.ratingsFilter}
          showMarker = {this.showMarker}
        />
      </div>
    );
  }
}

// Function to load the map asynchronously
function loadMapJS(src) {
  const ref = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")
  script.src = src
  script.async = true
  ref.parentNode.insertBefore(script, ref)
}

export default App
