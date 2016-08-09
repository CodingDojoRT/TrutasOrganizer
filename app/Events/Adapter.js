import config from '../../config'

const TABLE = 'events'

export default class EventsAdapter {

	constructor(deps = {}) {
        this.http = deps.http || require('axios')
	}

	readOne(id){
	    let url = config.databaseUrl + '/' + TABLE + '/' + id + '.json'
	    return this.http.get(url)
	        .then((result) => {
				if(!result || !result.data){
					throw {
						name: 'NotFound',
						message: 'Event with id ' + id + ' not found'
					}
				}
	            let resultDB = {
					...result.data,
					id
				}
	            return resultDB
	        })
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

    update(body){
		let upd = {...body}

        let url = config.databaseUrl + '/' + TABLE + '/' + upd.id + '.json'
		delete upd.id
        return this.http.put(url, upd)
			.then((res) => res.data)
    }

    save(body){
        let url = config.databaseUrl + '/' + TABLE + '.json'
        return this.http.post(url, body)
			.then((res) => res.data)
    }

}
