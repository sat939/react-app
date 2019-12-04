import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import { connect } from 'react-redux';
import  getExecutivesAction  from './actions/getAction';

function App(props) {
  return (
    <div>
      <header className="App-header">
       <p className="header-text">Acme Quarterly Report</p>
      </header>
      <MainComponent {...props}/>
    </div>
  );
}

const mapStateToProps = state => ({
  executives: state.executiveReducer['executives']
})

const mapDispatchToProps = dispatch => ({
  getAction: () => dispatch(getExecutivesAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
