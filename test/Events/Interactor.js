import expect from 'expect.js'
import Interactor from '../../app/Events/Interactor'

describe('The Events interactor', function(){

	describe('create method', function(){

		it('should call the entity createValidation and create methods with received parameter', function(){
			let expectedParameters = {
				name: "JO:GO DAS 22",
				organizer: 8413791638712,
				participants: [8413791638712]
			}

			let validationCalled = false
			let createCalled = false
			let deps = {
				entity: class {
					createValidation (parameters) {
						expect(parameters).to.eql(expectedParameters)
						validationCalled = true
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
					create (parameters) {
						expect(parameters).to.eql(expectedParameters)
						createCalled = true
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
				}
			}
			let instance = new Interactor(deps)
			return instance.create(expectedParameters)
				.then(() => {
					expect(createCalled).to.be.ok()
					expect(validationCalled).to.be.ok()
				})
		})

		it ('should return the result of the create event event',function (){
			let expectedResult = {
				name: "Loreko-san"
			}
			let expectedParameters = {
				name: "JO:GO DAS 22",
				organizer: 8413791638712,
				participants: [8413791638712]
			}

			let validationCalled = false
			let createCalled = false
			let deps = {
				entity: class {
					createValidation (parameters) {
						expect(parameters).to.eql(expectedParameters)
						validationCalled = true
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
					create (parameters) {
						expect(parameters).to.eql(expectedParameters)
						createCalled = true
						return new Promise(function(resolve, reject) {
							resolve(expectedResult)
						})
					}
				}
			}
			let instance = new Interactor(deps)
			return instance.create(expectedParameters)
				.then((result) => {
					expect(createCalled).to.be.ok()
					expect(result).to.eql(expectedResult)
					expect(validationCalled).to.be.ok()
				})
		})
	})

	describe('update method', function(){

		it('should call entity validation, read and update methods with the received parameters', function(){
			let expectedParameters = {
				id: 0,
				name: "JO:GO DAS 22",
				organizer: 8413791638712,
				participants: [8413791638712]
			}

			let readResult = {
				id: 0,
				name: "JO:GO DAS 22",
				organizer: 8413791638712,
				participants: [8413791638712]
			}

			let validationCalled = false
			let readCalled = false
			let updateCalled = false
			let deps = {
				entity: class {
					updateValidation(parameters) {
						validationCalled = true
						expect(parameters).to.eql(expectedParameters)
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
					read(params){
						readCalled = true
						expect(params).to.eql([expectedParameters.id])
						return new Promise(function(resolve, reject) {
							resolve(readResult)
						})
					}
					update(parameters) {
						updateCalled = true
						expect(parameters).to.eql(expectedParameters)
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
				}
			}
			let instance = new Interactor(deps)
			return instance.update(expectedParameters)
				.then(() => {
					expect(validationCalled).to.be.ok()
					expect(readCalled).to.be.ok()
					expect(updateCalled).to.be.ok()
				})
		})

		it('should update the data received from read', function(){
			let expectedResult = {
				id: 0,
				name: "TEST_NAME",
				organizer: 1,
				participants: [1,2]
			}

			let body = {
				id: 0,
				name: "TEST_NAME",
				participants: [1,2]
			}

			let readResult = {
				id: 0,
				name: "JO:GO DAS 22",
				organizer: 1,
				participants: [1]
			}

			let validationCalled = false
			let readCalled = false
			let updateCalled = false
			let deps = {
				entity: class {
					updateValidation(parameters) {
						validationCalled = true
						expect(parameters).to.eql(body)
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
					read(params){
						readCalled = true
						expect(params).to.eql([body.id])
						return new Promise(function(resolve, reject) {
							resolve(readResult)
						})
					}
					update(parameters) {
						updateCalled = true
						expect(parameters).to.eql(expectedResult)
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
				}
			}
			let instance = new Interactor(deps)
			return instance.update(body)
				.then(() => {
					expect(validationCalled).to.be.ok()
					expect(readCalled).to.be.ok()
					expect(updateCalled).to.be.ok()
				})
		})
	})

	describe('read method', function(){

		it('should read the requested event', function(done){
			let expectedId = 24242469
			let instance = new Interactor({
				entity: class {
					read (id) {
						expect(id).to.eql(expectedId)
						done()
					}
				}
			})
			instance.read(expectedId)
		})

		it('should return the event information', function(){
			let expectedEvent = {
				id: 987432,
				name: "loco",
				participants: [2756348, 84758743]
			}
			let instance = new Interactor({
				entity: class {
					read () {
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

	describe('delete method', function(){

		it('should try to delete an event', function(done){
			let expectedIds = 93219321
			let instance = new Interactor({
				entity: class {
					delete(ids) {
						expect(ids)
						.to.eql(expectedIds)
						done()
					}
				}
			})
			instance.delete(expectedIds)
		})

		it ('should return the result of the delete event event',function (){
			let expectedResult = {
				name: "Loreko-san"
			}
			let instance = new Interactor ({
				entity: class {
					delete(parameters) {
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
