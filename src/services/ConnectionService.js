
import axios from 'axios';

const Connection_API_BASE_URL = "http://localhost:8080/api/v1/connections";

class ConnectionService {

    getConnections(startDate, endDate, pageNo){
        
        let res = axios.get(Connection_API_BASE_URL,{
            params : {
                page: pageNo,
                startDate: startDate,
                endDate:endDate
            }});
        console.log(res);
        return res;
    }

    createConnection(Connection){
        return axios.post(Connection_API_BASE_URL, Connection);
    }

    getConnectionById(ConnectionId){
        return axios.get(Connection_API_BASE_URL + '/' + ConnectionId);
    }

    updateConnection(Connection, ConnectionId){
        return axios.put(Connection_API_BASE_URL + '/' + ConnectionId, Connection);
    }

    deleteConnection(ConnectionId){
        return axios.delete(Connection_API_BASE_URL + '/' + ConnectionId);
    }

    getByDateRange(startDate, endDate) {
        return axios.get(Connection_API_BASE_URL + '/dateOfApplication', {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        })
    }
}

export default new ConnectionService()