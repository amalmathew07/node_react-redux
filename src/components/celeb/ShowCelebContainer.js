import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as CelebAction from '../../action/CelebAction';
import ShowCelebForm  from './ShowCelebForm';


export class ShowCelebContainer extends React.Component {


    constructor() {
        super();
        this.handleCancel = this.handleCancel.bind(this);
    }



    componentDidMount() {
        this.props.action.getCelebAction(this.props.match.params.id)
            .catch(error => {

        });
    }



    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/celebs');
    }



    render() {
        const { initialValues } = this.props;
        const heading = 'Edit';
        return (
            <div className="container">
                <ShowCelebForm
                    heading={heading}
                    initialValues={this.props.initialValues}
                />
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    const celebId = ownProps.match.params.id; //from the path '/celeb/:id'

    if (celebId && state.selectedCelebReducer.celeb && celebId === state.selectedCelebReducer.celeb.id) {
        return {initialValues: state.selectedCelebReducer.celeb};
    }
};



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators({ ...CelebAction }, dispatch)
});



ShowCelebContainer.propTypes = {
    action: PropTypes.object.isRequired,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    match: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(ShowCelebContainer);
