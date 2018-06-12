import React, { Component } from 'react';
import styled from 'styled-components';
import PlacesAutocomplete from 'react-places-autocomplete';

import theme from './theme';

class CityAutoComplete extends Component {
  state = {
    input: '',
  };
  handleChange = (input) => {
    this.setState({
      input,
    });
  };
  handleSelect = async (description, placeId) => {
    this.setState({
      input: description,
    });
    this.props.handleSelect(placeId);
  };
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.input}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={{ types: ['(cities)'] }}
        highlightFirstSuggestion
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <Container>
            <SearchInput {...getInputProps({ placeholder: 'Search a city...' })} />
            <SuggestionListContainer>
              <SuggestionList>
                {suggestions.map(suggestion => (
                  <Suggestion active={suggestion.active} {...getSuggestionItemProps(suggestion)}>
                    <span>{suggestion.description}</span>
                  </Suggestion>
                ))}
              </SuggestionList>
            </SuggestionListContainer>
          </Container>
        )}
      </PlacesAutocomplete>
    );
  }
}
const Container = styled.div`
  display: flex;
  width: 15rem;
  margin: auto;
  flex-direction: column;
  align-items: center;
`;
const SearchInput = styled.input`
  font-size: 1rem;
  width: 100%
  background: ${theme.offWhite};
  border: 1px solid ${theme.strongPink};
  color: ${theme.gray27};
`;
// to position SuggestionList correctly
const SuggestionListContainer = styled.div`
  width: 100%;
  height: 0;
  position: relative;
`;
const SuggestionList = styled.div`
  width: 100%;
  position: absolute;
  opacity: 0.8;
`;
const Suggestion = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${props => (props.active ? theme.pink : theme.offWhite)};
  color: ${theme.gray27};
`;

export default CityAutoComplete;
