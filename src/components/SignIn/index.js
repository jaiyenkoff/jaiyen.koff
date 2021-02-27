import React, { useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom'


import { auth, signInWithGoogle, signInWithFacebook } from './../../firebase/utils';

// Components
import Button from './../forms/Button';
import FormInput from './../forms/FormInput';
import AuthWrapper from './../AuthWrapper';


// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faFacebook, faGoogle)

const SignIn = props => {
      const [ email, setEmail ] = useState('');
      const [ password, setPassword ] = useState('');

      const resetForm = () => {
        setEmail('');
        setPassword('');
      }

      const handleSubmit = async e => {
        e.preventDefault();
    
        try {
    
          await auth.signInWithEmailAndPassword(email, password);
          resetForm();
    
        } catch(err) {
            console.log(err);
        }
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
                                    <Button onClick={signInWithGoogle}>
                                    <FontAwesomeIcon className="icon" icon={['fab' , 'google']} size="m" /> Log In With Google 
                                    </Button>
                                </div>
                                <div className="row">
                                    <Button onClick={signInWithFacebook}>
                                    <FontAwesomeIcon className="icon" icon={['fab' , 'facebook']} size="m" /> Log In With Facebook 
                                    </Button>
                                </div>
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

export default SignIn