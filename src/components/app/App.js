import React from 'react';
import './App.css';
import BusinessList from '../business-list/businesslist.js';
import SearchBar from '../SearchBar/searchbar.js';
import Yelp from '../../util/yelp.js';


// app class bringing components together

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { businesses: [] };
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    if(!term || !location || !sortBy) {
      return [];
    };

    Yelp.search(term, location, sortBy)
    .then((businesses) => {
      this.setState({ businesses: businesses });
    });
  }

  render() {
      return (
        <div className="App">
          <h1>ravenous</h1>
          <SearchBar searchYelp={this.searchYelp} />
          <BusinessList businesses={this.state.businesses} />
        </div>
    );
  }
}

export default App;
