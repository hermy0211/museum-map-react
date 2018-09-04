import React, { Component } from 'react';
import '../App.css';
import '../Responsive.css';
import ListComponent from './ListComponent'

class Locations extends Component {
  // Render the list of museums
  render = () => {
    return (
      <div className="list">
        <ListComponent
          museums = {this.props.museums}
          showMarker = {this.props.showMarker}
        />
      </div>
    )
  }
}

export default Locations
