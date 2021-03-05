import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart, googleSignInStart, facebookSignInStart} from "./../../redux/User/user.actions";

import './styles.scss';
import { Link,useHistory } from 'react-router-dom'




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
  currentUser: user.currentUser
});

const SignIn = props => {
      const dispatch = useDispatch();
      const history = useHistory();
      const { currentUser } = useSelector(mapState)
      const [ email, setEmail ] = useState('');
      const [ password, setPassword ] = useState('');
      const [ errors, setErrors ] = useState([]);

      useEffect(() => {
        if (currentUser) {
          resetForm();
          history.push('/');
        }
      }, [currentUser])


      const resetForm = () => {
        setEmail('');
        setPassword('');
      }

      const handleSubmit = async e => {
        e.preventDefault();
        dispatch(emailSignInStart({email, password}));
      }

      const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
      }

      const handleFacebookSignIn = () => {
        dispatch(facebookSignInStart());
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
                        </form>
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
                            <div className="links">
                              <Link to="/recovery">
                                Reset Password
                              </Link>
                            </div>
                    </div>
        </AuthWrapper>
        );
    }

export default SignIn