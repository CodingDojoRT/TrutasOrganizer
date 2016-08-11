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
			.then(() => entity.read([params.id]))
			.then((dbData) => {
				let dt = {
					...dbData,
					...params
				}
				return entity.update(dt)
			})
	}

	read(ids) {
		let entity = new this.entity
		return entity.read(ids)
	}

	delete(id) {
		let entity = new this.entity
		return entity.delete(id)
	}
}
