/* eslint-disable */ 
import React, { useState } from 'react';
import './styles.scss';

import { auth, handleUserProfile } from './../../firebase/utils';

// Components
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import AuthWrapper from './../AuthWrapper'

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
};

const SignUp = props => {
    
    const [ displayName, setDisplayName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    
      handleFormSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
    
        if (password !== confirmPassword) {
          const err = ['Password Don\'t match. Love'];
          this.setState({
            errors: err
          });
          return;
        }
    
        try {
    
          const { user } = await auth.createUserWithEmailAndPassword(email, password);
    
          await handleUserProfile(user, { displayName });
    
          this.setState({
            ...initialState
          });
    
    
        } catch(err) {
          // console.log(err);
        }
    
      }
  

        const configAuthWrapper = {
          headline: 'Sign Up'
        }

        return (
          <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    <form onSubmit={this.handleFormSubmit}>
                        
                        <FormInput
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeHolder="User Name"
                            onChange={this.handleChange}
                        />
                        
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeHolder="Email"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeHolder="Password"
                            onChange={this.handleChange}
                        />
                        
                        <FormInput
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeHolder="Confirm Password"
                            onChange={this.handleChange}
                        />

                        <Button type="submit">
                            Join The Party
                        </Button>

                    </form>
                    </div>
                <div className="formFooter">
                        <h4>Wola! {displayName}</h4>
                        <p>Welcome to the party! :)</p>
                    <div className="errors">
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                    <li key={index}> 
                                        {err}
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    </div>
                </div>
            </AuthWrapper>
        );
    }

export default SignUp;