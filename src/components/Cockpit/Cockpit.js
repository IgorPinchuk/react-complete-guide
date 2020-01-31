import React, {useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context'

const cockpit = (props) => {

    const toggleButtonRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log('[Cockpit.js] authContext.authenticated '+authContext.authenticated);

    useEffect(
        () => {
            /* console.log('[Cockpit.js] useEffect');
            setTimeout(()=>{
                console.log('Your http request goes here')
            }, 1000); */
            toggleButtonRef.current.click();
            return ()=>{
                console.log('[Cockpit.js] cleanup work in useEffect');
            };
        },
        []
    );

    useEffect(
        () => {
            console.log('[Cockpit.js] 2nd useEffect');
            return ()=>{
                console.log('[Cockpit.js] cleanup work in 2nd useEffect')
            };
        }
    );

    const assignedClasses =[];
    let btnClass = '';

    if(props.showPersons){
        btnClass = classes.Red;
    }

    if(props.personsLength <=2 ) {
      assignedClasses.push(classes.red);
    }

    if(props.personsLength <=1 ) {
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className = {assignedClasses.join(' ')}>This is really working!</p>
            <button
                ref={toggleButtonRef}
                className={btnClass}
                onClick={props.clicked}>Toggle persons</button>
                <button onClick={authContext.login}>Log in</button>
        </div>
    );
};

export default React.memo(cockpit);