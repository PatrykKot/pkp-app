import axios from 'axios'
import {PROXY_URL} from "../proxy";

class StopsService {
    getStops(query) {
        return axios
            .get(PROXY_URL + '/stops', {
                params: {
                    query
                }
            })
            .then(result => result.data)
    }
}

export default new StopsService()