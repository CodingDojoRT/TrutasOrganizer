var Events = function(dependencies){

	this.adapter = dependencies.adapter || require('./EventsAdapter')
}

Events.prototype.create = function(params){
	return this.adapter.save(params)
}

Events.prototype.read = function(ids) {
	return this.adapter.read(ids)
}

Events.prototype.update = function(params) {
	return this.adapter.save(params)
}

Events.prototype.delete = function(ids) {
	return this.adapter.delete(ids)
}

module.exports = Events