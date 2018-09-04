import React, { Component } from 'react';
import '../App.css';
import '../Responsive.css';
import Locations from './Locations'

class Sidebar extends Component {
  // Render the sidebar, composed of the filters and the museum list
  render = () => {
    return (
      <div className="sidebar">
        <div className="filters">
          <div className="location">
            <h1>Museums in</h1>
            <select
              className="choose-location"
              name="location"
              value={this.props.location.title}
              onChange={(event) => this.props.changeLocation(event.target.value)}
              >
              <option value="london">London</option>
              <option value="seoul">Seoul</option>
              <option value="newyork">New York</option>
              <option value="paris">Paris</option>
            </select>
          </div>
          <div className="ratings">
            <select
              className="choose-ratings"
              name="ratings"
              value={this.props.ratingsFilter}
              onChange={(event) => this.props.filterList(event.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="overfour">Above 4.0</option>
              <option value="overthree">Above 3.0</option>
              <option value="overtwo">Above 2.0</option>
              <option value="overone">Above 1.0</option>
            </select>
          </div>
        </div>
        <Locations
          museums = {this.props.museums}
          showMarker = {this.props.showMarker}
        />
      </div>
    )
  }
}

export default Sidebar
