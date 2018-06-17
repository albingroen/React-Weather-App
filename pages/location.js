import React, { Component } from 'react'

class Location extends Component {
  constructor() {
    super()
    this.state = {
      lat: null,
      long: null,
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }

  showPosition(position) {
    console.log(
      'Latitude: ' +
        position.coords.latitude +
        'Longitude: ' +
        position.coords.longitude,
    )
  }

  render() {
    return (
      <div>
        <h1>Location</h1>
        <button onClick={() => this.getLocation()}>Get location</button>
      </div>
    )
  }
}

export default Location
