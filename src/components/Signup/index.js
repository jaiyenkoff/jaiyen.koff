/* eslint-disable */ 
import React, { useState } from 'react';
import './styles.scss';

import { auth, handleUserProfile } from './../../firebase/utils';

// Components
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import AuthWrapper from './../AuthWrapper'


const SignUp = props => {
    const [ displayName, setDisplayName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ errors, setErrors ] = useState('');
    
    const reset = () => {
      setDisplayName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors([]);
    }

      const handleFormSubmit = async event => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
          const err = ['Password Don\'t match. Love'];
          setErrors(errors);
          return;
        }
    
        try {
    
          const { user } = await auth.createUserWithEmailAndPassword(email, password);
    
          await handleUserProfile(user, { displayName });
          reset();
    
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
                    <form onSubmit={handleFormSubmit}>
                        
                        <FormInput
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeHolder="User Name"
                            handleChange={e => setDisplayName(e.target.value)}
                        />
                        
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeHolder="Email"
                            handleChange={e => setEmail(e.target.value)}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeHolder="Password"
                            handleChange={e => setPassword(e.target.value)}
                        />
                        
                        <FormInput
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeHolder="Confirm Password"
                            handleChange={e => setConfirmPassword(e.target.value)}
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