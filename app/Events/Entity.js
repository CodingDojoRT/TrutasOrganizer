export default class EventsEntity {

	constructor(deps = {}) {
		this.Adapter = deps.Adapter || require('./Adapter')
	}

    create(body){
        let adapter = new this.Adapter
        return adapter.save(body)
    }

}
