import React, { Component } from 'react';
import '../App.css';
import '../Responsive.css';

class ListComponent extends Component {
  showPlace = (place) => {
    this.props.showPlace(place)
  }

  // Render each museum list component
  render = () => {
    let places = this.props.museums

    return (
      <div>
      {Array.isArray(places) && (places.map((place, index) =>
        <div
          key={index}
          tabIndex="0"
          role="button"
          className="component"
          onKeyPress={this.showPlace.bind(this, place)}
          onClick={this.showPlace.bind(this, place)}
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
