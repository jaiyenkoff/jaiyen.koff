import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser, resetAllAuthForms } from './../../redux/User/user.actions'
import './styles.scss';

// Components
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import AuthWrapper from './../AuthWrapper'


const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
  });
  

const SignUp = props => {
    const { signUpSuccess, signUpError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [ displayName, setDisplayName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ errors, setErrors ] = useState([]);
    
    useEffect(() => {
        if (signUpSuccess) {
            reset();
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    }, [signUpSuccess])

    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0) {
            setErrors(signUpError);
        }
    }, [signUpError])


    const reset = () => {
      setDisplayName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors([]);
    }

      const handleFormSubmit = e => {
        e.preventDefault();
        dispatch(signUpUser({
            displayName,
            email,
            password,  
            confirmPassword
        }));
    
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

export default withRouter(SignUp);