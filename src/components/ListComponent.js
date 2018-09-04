import React, { Component } from 'react';
import '../App.css';
import '../Responsive.css';

class ListComponent extends Component {
  showMarker = (place) => {
    this.props.showMarker(place)
  }

  // Render each museum list component
  render = () => {
    let places = this.props.museums

    return (
      <div>
      {Array.isArray(places) && (places.map((place, index) =>
        <div
          key={index}
          tabindex="0"
          aria-role="button"
          className="component"
          onKeyPress={this.showMarker.bind(this, place)}
          onClick={this.showMarker.bind(this, place)}
        >
          <div className="title-container">
            <span className="name">{place.name}</span>
            <span className="rating">★ {place.rating}</span>
          </div>
          {(place.opening_hours) && (place.opening_hours.open_now) ?
            (<p className="open">OPEN NOW</p>) : ""
          }
          {(place.plus_code) && (place.plus_code.compound_code) ?
            (<p className="address">{place.plus_code.compound_code}</p>) : ""
          }
        </div>
      ))}
      </div>
    )
  }
}

export default ListComponent
