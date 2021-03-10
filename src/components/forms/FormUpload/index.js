import React from 'react';
import './styles.scss';

const FormInput = ({ handleImgChange, label, ...otherProps }) => {
    return (
        <div className="formRow">
            {label && (
                <label>
                    {label}
                </label>
            )}

            <input className="formUpload" onChange={handleImgChange} {...otherProps} />
        </div>
    );
}

export default FormInput;