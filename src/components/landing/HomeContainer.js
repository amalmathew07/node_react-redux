import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as CelebAction from '../../action/CelebAction';
import LoginForm  from './LoginForm';


export class HomeContainer extends React.Component {


    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }



    componentDidMount() {
        
    }



    handleLogin(values) {
        const loginData = {
            userName: values.userName,
            password: values.password
        };

        this.props.action.loginUserAction(loginData)
            .then((resp) => {
                toastr.success('Login Success');
                this.props.history.push('/celebs');
            }).catch(error => {
                toastr.error('Login Failed!')
                this.props.history.push('/login');
            });
    }



    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/login');
    }



    render() {
        const { initialValues } = this.props;
        const heading = 'Login';

        return (
            <div className="container">
                <LoginForm
                    heading={heading}
                    handleLogin={this.handleLogin}
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



HomeContainer.propTypes = {
    action: PropTypes.object.isRequired,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    match: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
