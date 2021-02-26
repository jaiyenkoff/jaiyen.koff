import React, { Component } from 'react';
import { auth } from './../../firebase/utils';
import { withRouter } from 'react-router-dom'
import './styles.scss';

// Components
import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button'

const initialState = {
    email: '',
    errors: []
}

class RecoverPassword extends Component {

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
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const { email } = this.state;

            const config = {
                url: 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    this.props.history.push('/login')
                })
                .catch(() => {
                    const err = ['Email Not Found. Please Try Again']
                    this.setState({
                        errors: err
                    })
                });
        } catch (err) {
            console.log(err);
        }

    }

    render() {

        const { email, errors } = this.state;

        const configAuthWrapper = {
            headline: 'Recovery Your Password'
        }

        return (
            <AuthWrapper {...configAuthWrapper}>

                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />

                        <Button type="submit">
                            Recover Your Password
                        </Button>
                    </form>
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
            </AuthWrapper>
        );
    }
}

export default withRouter(RecoverPassword)