import React, { Component } from 'react';
import styled from 'styled-components';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import './App.css';

const apiKey = 'AIzaSyALNcAbAoUpA6VMCb1xhReW28Xg5jak6EY';

class App extends Component {
  state = {
    input: '',
  };
  handleChange = (input) => {
    this.setState({
      input,
    });
  };
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.input}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input {...getInputProps({ placeholder: 'Search a city...' })} />
            <div>
              {suggestions.map(suggestion => (
                <div {...getSuggestionItemProps(suggestion)}>
                  <span>{suggestion.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default App;

const StyledInput = styled.input`
  background: red;
`;
