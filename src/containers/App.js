import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass'
import Aux from '../hoc/Auxiliary'
import AuthContext from '../context/auth-context'

class App extends Component {

  constructor(props){
    super(props);
    console.log('[App.js] constructor')
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }

  /* componentWillMount() {
    console.log('[App.js] componentWillMount');
  } */

  state = {
    persons: [
      { id: 'qwer', name: 'Max', age: 28 },
      { id: 'asdf', name: 'Manu', age: 29 },
      { id: 'zxcv', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons, 
        changeCounter: prevState.changeCounter + 1
      }
    })
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons});
  }

  togglePersonsHandler = () => {
    const toggle = this.state.showPersons
    this.setState({showPersons: !toggle})
  }

  loginHandler = () => {
    this.setState({authenticated: true})
  }

  render () {
    console.log('[App.js] render');

    let persons = null;

    if( this.state.showPersons ) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}
        isAuthenticated={this.state.authenticated}/>

    }

    return (
      <Aux>
        <button
          onClick={()=>{
            this.setState({showCockpit: !this.state.showCockpit});
          }}
        >
          Toggle Cockpit
        </button>
        <AuthContext.Provider 
          value={
            {
              authenticated: this.state.authenticated,
              login: this.loginHandler
            }
          } 
        >
          {this.state.showCockpit ? 
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            /> : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
