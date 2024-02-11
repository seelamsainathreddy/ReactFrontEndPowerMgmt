import React, { Component } from 'react';
import ConnectionService from '../services/ConnectionService';

let labels = [
    "id", "applicantName", "gender", "district",
    "state",
    "pincode",
    "ownerShip",
    "govtIdType",
    "idNumber",
    "category",
    "loadApplied",
    "dateOfApplication",
    "dateOfApproval",
    "modifiedDate",
    "status",
    "reviewerId",
    "reviewerName",
    "reviewerComments"
];

let label_headers = ["ID", "Applicant_Name", "Gender", "District", "State", "Pincode", "Ownership", "GovtID_Type", "ID_Number", "Category", "Load_Applied (in KV)", "Date_of_Application", "Date_of_Approval", "Modified_Date", "Status", "Reviewer_ID", "Reviewer_Name", "Reviewer_Comments"];

class ListConnectionComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connections: [],
            headers: [],
            keys: [],
            currentPage: 1,
            totalPages: 1,
            startDate: '',
            endDate: '',
            applicantId:''
        };

        this.editConnection = this.editConnection.bind(this);
        this.viewConnection = this.viewConnection.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.fetchConnections = this.fetchConnections.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleApplicantIdChange=this.handleApplicantIdChange.bind(this);
    }

    componentDidMount() {
        this.fetchConnections();
    }

    fetchConnections() {

        const formattedStartDate = this.state.startDate ? new Date(this.state.startDate).toLocaleDateString('en-GB') : '';
        const formattedEndDate = this.state.endDate ? new Date(this.state.endDate).toLocaleDateString('en-GB') : '';

        ConnectionService.getConnections(formattedStartDate, formattedEndDate, this.state.currentPage).then((res) => {
            this.setState({ 
                connections: res.data.content, 
                headers: label_headers, 
                keys: labels, 
                totalPages: res.data.totalPages 
            });
        });
    }

    deleteConnection(id) {
        ConnectionService.deleteConnection(id).then(res => {
            this.setState({ connections: this.state.connections.filter(connection => connection.id !== id) });
        });
    }

    viewConnection(id) {
        this.props.history.push(`/view-connection/${id}`);
    }

    editConnection(id) {
        this.props.history.push(`/edit-connection/${id}`);
    }

    previousPage() {
        if (this.state.currentPage > 0) {
            this.setState({ currentPage: this.state.currentPage - 1 }, () => {
                this.fetchConnections();
            });
        }
    }

    nextPage() {
        if (this.state.currentPage < this.state.totalPages-1) {
            this.setState({ currentPage: this.state.currentPage + 1 }, () => {
                this.fetchConnections();
            });
        }
    }

    handleStartDateChange(event) {
        this.setState({ startDate: event.target.value });
    }

    handleEndDateChange(event) {
        this.setState({ endDate: event.target.value });
    }

    handleFilter() {
        if (this.state.startDate!=null && this.state.endDate!=null)
            this.state.currentPage = 0;
        this.fetchConnections();
        
    }

    handleApplicantIdChange(event) {
        this.setState({ applicantId: event.target.value });
    }


    render() {
        return (
            <div className="container">
                <h2 className="text-center mb-3">Connections List</h2>


                
                <div className="form-group row">
                    <label htmlFor="startDate" className="col-sm-2 col-form-label">Start Date</label>
                    <div className="col-sm-4">
                        <input type="date" className="form-control" id="startDate" value={this.state.startDate} onChange={this.handleStartDateChange} />
                    </div>
                    <label htmlFor="endDate" className="col-sm-2 col-form-label">End Date</label>
                    <div className="col-sm-3">
                        <input type="date" className="form-control" id="endDate" value={this.state.endDate} onChange={this.handleEndDateChange} />
                    </div>
                    <div className="col-sm-1">
                        <button className="btn btn-primary" onClick={this.handleFilter}>Filter</button>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="applicantId" className="col-sm-2 col-form-label">Applicant ID</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id="applicantId" value={this.state.applicantId} placeholder="Enter Id to update" onChange={this.handleApplicantIdChange} />
                    </div>
                    <div className="col-sm-1">
                        <button className="btn btn-primary" onClick={()=>this.editConnection(this.state.applicantId)}>Update</button>
                    </div>
                </div>

                <div className="table-responsive" style={{ height: '450px', overflowY: 'auto', overflowX: 'scroll' }}>
                    <table className="table table-sm table-striped table-bordered">
                        <thead className="">
                            <tr>
                                {this.state.headers.map(header => (
                                    <th key={header} className="text-center">{header}</th>
                                ))}
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.connections.map(connection => (
                                <tr key={connection.id}>
                                    {this.state.keys.map(key => (
                                        <td key={key} className="text-center" style={{ width: `${100 / this.state.keys.length}%` }}>{connection[key]}</td>
                                    ))}
                                    <td className="text-center">
                                        <button onClick={() => this.editConnection(connection.id)} className="btn btn-sm btn-info">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Buttons */}
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-secondary mr-2" onClick={this.previousPage}>Previous</button>
                    <button className="btn btn-secondary" onClick={this.nextPage}>Next</button>
                </div>
            </div>
        )
    }
}

export default ListConnectionComponent;
