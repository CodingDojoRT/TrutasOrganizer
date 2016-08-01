export default class EventsInteractor {
	constructor(deps = {}) {
		this.entity = deps.entity || require('./Entity').default
	}

	create(params){
		let entity = new this.entity
		return entity.create(params)
	}

	read(ids) {
		let entity = new this.entity
		return entity.read(ids)
	}

	update(params) {
		let entity = new this.entity
		return entity.update(params)
	}

	delete(ids) {
		let entity = new this.entity
		return entity.delete(ids)
	}
}
