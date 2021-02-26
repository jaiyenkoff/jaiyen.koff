import React, { Component } from 'react';
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

const initialState = {
    email: '',
    password: ''
}

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
          ...initialState
        };
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
      }
    
      handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
    
        try {
    
          await auth.signInWithEmailAndPassword(email, password);
          this.setState({
            ...initialState
          });
    
        } catch(err) {
            console.log(err);
        }
      }
    
      render() {
        const { email, password } = this.state;

        const configAuthWrapper = {
          headline: 'Log In'
        }

        return (
       <AuthWrapper {...configAuthWrapper}>
                    <div className="fromWrap">
                        <form onSubmit={this.handleSubmit}>
                           
                            <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                            />
                            <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
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
};

export default SignIn