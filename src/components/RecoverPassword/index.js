import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './styles.scss';

import { resetAllAuthForms, resetPassword } from './../../redux/User/user.actions';

// Components
import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button'

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})


const RecoverPassword = props => {
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState)
    const dispatch = useDispatch();
    const [ email, setEmail ] = useState('');
    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetAllAuthForms())
            props.history.push('/login')
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setErrors(resetPasswordError);
        }
    }, [resetPasswordError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ email }));
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