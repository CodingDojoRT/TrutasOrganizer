export default class Events {
	constructor(deps = {}) {
		this.adapter = deps.adapter || require('./EventsAdapter')
	}

	create(params){
		let adapter = new this.adapter
		return adapter.save(params)
	}

	read(ids) {
		let adapter = new this.adapter
		return adapter.read(ids)
	}

	update(params) {
		let adapter = new this.adapter
		return adapter.save(params)
	}

	delete(ids) {
		let adapter = new this.adapter
		return adapter.delete(ids)
	}
}
