import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';

export const ShowCelebForm = ({heading, initialValues}) => {
    if (initialValues && initialValues.id) {
    return (
        <form>
            <h1>Show Celebrity Details</h1>

            <Field
                type="text"
                name="id"
                label="Celeb Id"
                value={initialValues.id}
                component={FieldInput}
            />

            <Field
                type="text"
                name="celebName"
                label="Celebrity Name"
                value={initialValues.name}
                component={FieldInput}
            />

            <Field
                type="text"
                name="celebStage"
                label="Stage"
                value={initialValues.stage}
                component={FieldInput}
            />
        </form>
    );
} else {
    return (
        <form>
            <h1>{heading}</h1>

            <Field
                type="text"
                name="id"
                label="Celeb Id"
                component={FieldInput}
            />

            <Field
                type="text"
                name="celebStage"
                label="Stage"
                component={FieldInput}
            />

            <Field
                 type="text"
                 name="celebName"
                 label="Celebrity Name"
                component={FieldInput}
            />
        </form>
    );
}
};



ShowCelebForm.propTypes = {
    heading: PropTypes.string.isRequired
};



export default reduxForm({
    form: 'ShowCelebForm'
})(ShowCelebForm);
