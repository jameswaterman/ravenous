import React from 'react';
import './searchbar.css';

// searchbar component 

class SearchBar extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		term: '',
    		location: '',
    		sortBy: 'best_match'
    	};
    	
        this.sortByOptions = {
	    'Best Match': 'best_match',
        'Highest Rated': 'rating',
        'Most Reviewed': 'review_count'
        };
        
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
        	return 'active';
        } else {
        	return '';
        }
    }

    handleSortByChange(sortByOption) {
        this.setState({sortBy: sortByOption});
        setTimeout(() => {
          this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)}, 5
        );
    }

    handleTermChange(event) {
        this.setState({term: event.target.value});
    }

    handleLocationChange(event) {
        this.setState({location: event.target.value});
    }

    handleKeyPress(event) {
        if (event.key === "Enter") {
            console.log('Enter key pressed');

            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            event.preventDefault();
        }
    }

    handleSearch(event) {
        console.log('i work');
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

	renderSortByOptions() {
		return Object.keys(this.sortByOptions).map(sortByOption => {
			let sortByOptionValue = this.sortByOptions[sortByOption];
			return (<li key={sortByOptionValue} 
                        className={this.getSortByClass(sortByOptionValue)} 
                        onClick={this.handleSortByChange.bind(this, sortByOptionValue)} >
                      {sortByOption}
                    </li>);

		});
    }

    render() {
    	return (
    	<div className="SearchBar">
          <div className="SearchBar-sort-options">
            <ul>
              {this.renderSortByOptions()}
            </ul>
          </div>
          <div className="SearchBar-fields">
            <input onKeyUp={this.handleKeyPress} placeholder="Search Businesses" onChange={this.handleTermChange} />
            <input onKeyUp={this.handleKeyPress} placeholder="Where?" onChange={this.handleLocationChange} />
          </div>
          <div className="SearchBar-submit">
            <button onClick={this.handleSearch}>Let's Go</button>
          </div>
        </div>)
    }
};

export default SearchBar;