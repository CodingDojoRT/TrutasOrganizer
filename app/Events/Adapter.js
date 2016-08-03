import config from '../../config'

const TABLE = 'events'

export default class EventsAdapter {

	constructor(deps = {}) {
        this.http = deps.http || require('axios')
	}

    read(){
        let url = config.databaseUrl + '/' + TABLE + '.json'
        return this.http.get(url)
            .then((result) => {
                let resultDB = []
                if(result.data){
                    resultDB = Object.keys(result.data).map((key) => {
                        let dt = {
                            ...result.data[key],
                            id: key
                        }
                        return dt
                    })
                }
                return resultDB
            })
    }

}