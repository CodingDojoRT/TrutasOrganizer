export default class EventsInteractor {
	constructor(deps = {}) {
		this.entity = deps.entity || require('./Entity').default
	}

	create(params){
		let entity = new this.entity
		return entity.createValidation(params)
			.then(() => entity.create(params))
	}

	update(params) {
		let entity = new this.entity
		return entity.updateValidation(params)
			.then(() => entity.update(params))
	}

	read(ids) {
		let entity = new this.entity
		return entity.read(ids)
	}

	delete(ids) {
		let entity = new this.entity
		return entity.delete(ids)
	}
}
