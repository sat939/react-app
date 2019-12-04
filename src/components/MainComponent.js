import React from 'react';
import './../styles/MainComponent.css';
import ExecutiveTable from './ExecutiveTable';

class MainComponent extends React.Component {

    state = {
        executives: [],
        searchValue: '',
        executivesCopy: []
    }

    constructor(props) {
        super(props);
        this.searchForName = this.searchForName.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getAction(); // Trigger the action to fetch Executive API
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.executives !== this.props.executives) {
            // set the local state in order to search and sort the information
            this.setState({ executives: nextProps.executives });
            this.setState({ executivesCopy: nextProps.executives });
        }
    }

    //function to search for given string
    searchForName() {
        let searchResult = [];
        let regex = new RegExp(this.state.searchValue, 'g');
        for (let i of this.state.executivesCopy) {
            let result = i['name'].match(regex);
            if (result !== null) {
                searchResult.push(i);
            }
        }
        if (searchResult.length) {
            this.setState({ executives: searchResult })
        } else {
            this.setState({ executives: this.state.executivesCopy }); // can use store state directly
        }

    }

    // Event handler for every key stroke in input search box
    handleChange(event) {
        event.preventDefault();
        this.setState({ searchValue: event.target.value })
        if (!event.target.value.length) {
            this.setState({ executives: this.state.executivesCopy });
        }
    }
    
    render() {

        return (
            <div>
                {/* Header */}
                <div className="overview-container">
                    <p className="overview-text">Overview</p>
                    <input type="text" placeholder="search by Name" className="search-box" value={this.state.searchValue} onChange={this.handleChange}></input>
                    <button className="search-button" onClick={this.searchForName}>search</button>
                </div>
                <ExecutiveTable data={this.state['executives']} {...this.props} />
            </div>
        )
    }
}

export default MainComponent;