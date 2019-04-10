import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as CelebAction from '../../action/CelebAction';
import CelebList from './CelebList';



export class CelebListContainer extends React.Component {

    constructor() {
        super();

        this.state = {selectedCId: undefined, selectedCelebId: undefined};
        
        this.handleAddCeleb = this.handleAddCeleb.bind(this);
        this.handleViewCeleb = this.handleViewCeleb.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }


    componentDidMount() {
        this.props.action.getCelebsAction()
            .catch(error => {
                toastr.error('Unauthorized Login!');
                localStorage.removeItem("token");
                this.props.history.push('/login');
            });
    }



    handleAddCeleb() {
        this.props.history.push('/celeb');
    }

    handleLogout() {
        localStorage.removeItem("token");
        this.props.history.push('/login');
    }

    handleViewCeleb() {
        const selectedCelebId = this.state.selectedCelebId;

        if (selectedCelebId) {
            this.setState({selectedCelebId: undefined});                        
            this.props.action.getCelebAction(selectedCelebId)
                .catch(error => {
                    if (error === "Not found") {
                        toastr.error('No celebrity with the given id found!');
                        this.props.history.replace('/celebs');
                    } else {
                    toastr.error('Unauthorized Login!');
                    localStorage.removeItem("token");
                    this.props.history.push('/login');
                    }
                });
        }
        
        this.props.history.push(`/celeb/${selectedCelebId}`);
    }



    handleDelete() {
        const selectedCelebId = this.state.selectedCelebId;

        if (selectedCelebId) {
            this.setState({selectedCelebId: undefined});                        
            this.props.action.deleteCelebAction(selectedCelebId)
                .catch(error => {
                    if (error === "Not found") {
                        toastr.error('No celebrity with the given id found!');
                        this.props.history.replace('/celebs');
                    } else {
                    toastr.error('Unauthorized Login!');
                    localStorage.removeItem("token");
                    this.props.history.push('/login');
                    }
                });
        }
    }



    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({selectedCId: row.id});
        }
    }


    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        this.setState({
            selectedCelebId: value
        });
    }


    render() {
        const { celebs } = this.props;

        if (!celebs) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            
            <div className="container-fluid">
            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={this.handleLogout}
                                id = "logoutbtn"
                            >
            <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleLogout}/> Logout
            </button>
                <div className="row mt-3">
                    <div className="col">
                        <h1>Celebrity Hologram</h1>                        
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleAddCeleb}
                            >
                                <i className="fa fa-plus" aria-hidden="true"/> Add Celebrity
                            </button>

                            <input
                                type="text"
                                name="searchId"
                                id = "searchId"
                                onChange={this.handleInputChange}
                                placeholder="Enter ID to find/delete"
                            />
                            <button
                                type="button"
                                className="btn btn-warning ml-2"
                                onClick={this.handleViewCeleb}
                                disabled = {!this.state.selectedCelebId}                                
                            >
                                <i className="fa fa-pencil" aria-hidden="true"/> View Celebrity
                            </button>                                                       

                            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={this.handleDelete}
                                disabled = {!this.state.selectedCelebId}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDelete}/> Delete Celebrity
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <CelebList celebs={celebs} handleRowSelect={this.handleRowSelect}/>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    celebs: state.celebReducer.celebs
});



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(CelebAction, dispatch)

});



CelebListContainer.propTypes = {
    celebs: PropTypes.array,
    action: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(CelebListContainer);
