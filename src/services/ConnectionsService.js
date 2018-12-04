import axios from 'axios'
import {PROXY_URL} from "../proxy";

class ConnectionsService {
    find(from, to) {
        return axios
            .get(PROXY_URL + '/search', {
                params: {from, to}
            })
            .then(result => result.data)
    }
}

export default new ConnectionsService()