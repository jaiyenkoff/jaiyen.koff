import React, { useState } from 'react';
import { auth } from './../../firebase/utils';
import { withRouter } from 'react-router-dom'
import './styles.scss';

// Components
import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button'



const RecoverPassword = props => {

    const [ email, setEmail ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {

            const config = {
                url: 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    props.history.push('/login')
                })
                .catch(() => {
                    const err = ['Email Not Found. Please Try Again']
                    setErrors(err);
                });
        } catch (err) {
            console.log(err);
        }

    }


        const configAuthWrapper = {
            headline: 'Recovery Your Password'
        }

        return (
            <AuthWrapper {...configAuthWrapper}>

                <div className="formWrap">
                    <form onSubmit={handleSubmit}>
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={e => setEmail(e.target.value)}
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

export default withRouter(RecoverPassword)