import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signInWithGoogle, signInWithFacebook, resetAllAuthForms } from "./../../redux/User/user.actions";

import './styles.scss';
import { Link,withRouter } from 'react-router-dom'


// import { signInWithGoogle, signInWithFacebook } from './../../firebase/utils';

// Components
import Button from './../forms/Button';
import FormInput from './../forms/FormInput';
import AuthWrapper from './../AuthWrapper';


// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faFacebook, faGoogle)

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
  signInError: user.signInError
});

const SignIn = props => {
      const { signInSuccess, signInError } = useSelector(mapState)
      const dispatch = useDispatch();
      const [ email, setEmail ] = useState('');
      const [ password, setPassword ] = useState('');
      const [ errors, setErrors ] = useState([]);

      useEffect(() => {
        if (signInSuccess) {
          resetForm();
          dispatch(resetAllAuthForms());
          props.history.push('/');
        }
      }, [signInSuccess])

      useEffect(() => {
        if (Array.isArray(signInError) && signInError.length > 0) {
            setErrors(signInError);
        }
    }, [signInError]);

      const resetForm = () => {
        setEmail('');
        setPassword('');
      }

      const handleSubmit = async e => {
        e.preventDefault();
        dispatch(signInUser({email, password}));
      }

      const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
      }

      const handleFacebookSignIn = () => {
        dispatch(signInWithFacebook());
      }

        const configAuthWrapper = {
          headline: 'Log In'
        }

        return (
       <AuthWrapper {...configAuthWrapper}>
                    <div className="fromWrap">
                        <form onSubmit={handleSubmit}>
                           
                            <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={e => setEmail(e.target.value)}
                            />
                            <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={e => setPassword(e.target.value)}
                            />

                            <Button type="submit">
                                Log In
                            </Button>

                            <div className="socialSignin">
                                <div className="row">
                                    <Button onClick={handleGoogleSignIn}>
                                    <FontAwesomeIcon className="icon" icon={['fab' , 'google']} size="m" /> Log In With Google 
                                    </Button>
                                </div>
                                <div className="row">
                                    <Button onClick={handleFacebookSignIn}>
                                    <FontAwesomeIcon className="icon" icon={['fab' , 'facebook']} size="m" /> Log In With Facebook 
                                    </Button>
                                </div>
                            </div>
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
                            <div className="links">
                              <Link to="/recovery">
                                Reset Password
                              </Link>
                            </div>
                        </form>
                    </div>
        </AuthWrapper>
        );
    }

export default withRouter(SignIn)