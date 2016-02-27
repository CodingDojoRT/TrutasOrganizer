var expect = require('expect.js')
var Events = require('../../app/Events/EventsInteractor')

describe('The Events interactor', function(){
	describe('create method', function(){

		it('should try to create an event with the passed parameters', function(done){
			var expectedParameters = {
				name: "JO:GO DAS 22",
				organizer: 8413791638712,
				participants: [8413791638712]
			}
			var instance = new Events({
				adapter: {
					save: function(parameters) {
						expect(parameters)
						.to.eql(expectedParameters)
						done()
					}
				}
			})
			instance.create(expectedParameters)
		})

		it ('should return the result of the create event event',function (){
			var expectedResult = {
				name: "Loreko-san"
			}
			var instance = new Events ({
				adapter: {
					save: function(parameters) {
						return new Promise (function(resolve, reject) {
							resolve (expectedResult)
						})
					}
				}
			})
			instance.create().then(function(result) {
				expect(result).to.eql(expectedResult)
			})
		})
	})

	describe('read method', function(){

		it('should read the requested event', function(done){
			var expectedId = 24242469
			var instance = new Events({
				adapter: {
					read: function (id) {
						expect(id).to.eql(expectedId)
						done()
					}
				}
			})
			instance.read(expectedId)
		})

		it('should return the event information', function(){
			var expectedEvent = {
				id: 987432,
				name: "loco",
				participants: [2756348, 84758743]
			}
			var instance = new Events({
				adapter: {
					read: function () {
						return new Promise(
						function(resolve, reject) {
							resolve(expectedEvent)
						})
					}
				}
			})
			instance.read()
			.then(function(eventInfo){
				expect(eventInfo).to.eql(expectedEvent)
			})
		})
	})

	describe('update method', function(){

		it('should try to update an event with the passed parameters', function(done){
			var expectedParameters = {
				name: "JO:GO DAS 22",
				organizer: 8413791638712,
				participants: [8413791638712]
			}
			var instance = new Events({
				adapter: {
					save: function(parameters) {
						expect(parameters)
						.to.eql(expectedParameters)
						done()
					}
				}
			})
			instance.update(expectedParameters)
		})

		it ('should return the result of the update event event',function (){
			var expectedResult = {
				name: "Loreko-san"
			}
			var instance = new Events ({
				adapter: {
					save: function(parameters) {
						return new Promise (function(resolve, reject) {
							resolve (expectedResult)
						})
					}
				}
			})
			instance.update().then(function(result) {
				expect(result).to.eql(expectedResult)
			})
		})
	})

	describe('delete method', function(){

		it('should try to delete an event', function(done){
			var expectedIds = 93219321
			var instance = new Events({
				adapter: {
					delete: function(ids) {
						expect(ids)
						.to.eql(expectedIds)
						done()
					}
				}
			})
			instance.delete(expectedIds)
		})

		it ('should return the result of the delete event event',function (){
			var expectedResult = {
				name: "Loreko-san"
			}
			var instance = new Events ({
				adapter: {
					delete: function(parameters) {
						return new Promise (function(resolve, reject) {
							resolve (expectedResult)
						})
					}
				}
			})
			instance.delete().then(function(result) {
				expect(result).to.eql(expectedResult)
			})
		})
	})

})
