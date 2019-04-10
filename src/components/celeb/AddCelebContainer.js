import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as CelebAction from '../../action/CelebAction';
import CelebForm from './CelebForm'; 


export class AddCelebContainer extends React.Component {


    constructor() {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }



    componentDidMount() {
        this.props.action.getCelebAction(this.props.match.params.id)
            .catch(error => {
                toastr.error(error);
            });
    }



    handleSave(values) {
        const celeb = {
            id: values.id,
            celebName: values.celebName,
            stage: values.stage
        };

        this.props.action.saveCelebAction(celeb)
            .then(() => {
                toastr.success('Celebrity detail saved');
                this.props.history.push('/celebs');
            }).catch(error => {
                toastr.error('Unauthorized Login!');
                localStorage.removeItem("token");
                this.props.history.push('/login');
            });
    }



    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/celebs');
    }



    render() {
        const { initialValues } = this.props;
        const heading = initialValues && initialValues.id ? 'Edit' : 'Add';

        return (
            <div className="container">
                <CelebForm
                    heading={heading}
                    handleSave={this.handleSave}
                    handleCancel={this.handleCancel}
                    initialValues={this.props.initialValues}
                />
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    const celebId = ownProps.match.params.id; //from the path '/celeb/:id'

    if (celebId && state.selectedCelebReducer.celeb && celebId === state.selectedCelebReducer.celeb.id) {
        return {
            initialValues: state.selectedCelebReducer.celeb
        };
    }
};



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators({ ...CelebAction }, dispatch)
});



AddCelebContainer.propTypes = {
    action: PropTypes.object.isRequired,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    match: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(AddCelebContainer);
