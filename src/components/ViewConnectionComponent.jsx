import React, { Component } from 'react';
import ConnectionService from '../services/ConnectionService';

const editableFields = ["applicantName", "gender", "district", "state", "pincode", "ownerShip", "category", "loadApplied", "dateOfApproval", "status", "modifiedDate", "reviewerComments"];

class ViewConnectionComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            connection: {},
            formData: {},
            successMessage: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    editConnection(id){
        this.props.history.push(`/edit-connection/${id}`);
    }

    componentDidMount() {
        ConnectionService.getConnectionById(this.state.id).then(res => {
            this.setState({ connection: res.data, formData: res.data });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    }

    handleUpdate(event) {
        event.preventDefault();
    
        const { formData } = this.state;
        const loadApplied = parseInt(formData.loadApplied);
    
        if (loadApplied > 200) {
            // Display error message
            this.setState({ errorMessage: "Load Applied should be less than or equal to 200." });
            return;
        }
    
        ConnectionService.updateConnection(formData, this.state.id)
            .then(res => {
                console.log("Connection updated successfully:", res.data);
                this.setState({ successMessage: "Connection updated successfully!", success: true, errorMessage: '' });
                console.log("Success message updated:", this.state.successMessage);
            })
            .catch(error => {
                console.log("Error updating connection:", error);
                // Handle error, show error message, etc.
            });
    }
    

    render() {
        const { connection, successMessage } = this.state;

        return (
            <div>
                <br />
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">Edit Connection Details</h3>
                    <div className="card-body">
                        <form onSubmit={this.handleUpdate}>
                            <div className="row">
                                {Object.keys(connection).map(key => (
                                    <div className="col-md-6" key={key}>
                                        <label>{key}</label>
                                        {editableFields.includes(key) ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                name={key}
                                                value={this.state.formData[key] || ''}
                                                onChange={this.handleInputChange}
                                            />
                                        ) : (
                                            <div>{connection[key]}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="row mt-3">
                                <button type="submit" className="btn btn-primary mx-auto">Update</button>
                            </div>
                            {this.state.success && (
                                <div className="row mt-3">
                                    <div className="alert alert-success" role="alert">
                                        {successMessage}
                                    </div>
                                </div>
                            )}
                            {this.state.errorMessage && (
                                    <div className="row mt-3">
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.errorMessage}
                                        </div>
                                    </div>
                                )}

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewConnectionComponent;
