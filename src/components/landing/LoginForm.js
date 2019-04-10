import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';

export const LoginForm = ({heading, handleLogin, handleSubmit, pristine, reset, submitting, handleCancel}) => {
    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <h1>Login</h1>

            <Field
                type="text"
                name="userName"
                label="User Name"
                component={FieldInput}
            />

            <Field
                type="password"
                name="password"
                label="Password"
                component={FieldInput}
            />
            <div>
                <button type="submit" disabled={submitting} className="btn btn-primary"><i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit</button>
                {heading === 'Add' && <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default btn-space">Clear</button>}
                <button type="button" className="btn btn-default btn-space" onClick={reset}>Clear</button>
            </div>
        </form>
    );
};



LoginForm.propTypes = {
    heading: PropTypes.string.isRequired
};



export default reduxForm({
    form: 'LoginForm'
})(LoginForm);
