import expect from 'expect.js'
import EventsEntity from '../../app/Events/Entity'

describe('The Events entity', function(){

	describe('createValidation method', function () {

		it('should accept game, participants and time', function () {
			let params = {
				game: 'Game_test',
				participants: [10, 20, 30],
				time: 1234567890
			}

            let entity = new EventsEntity
			return entity.createValidation(params)
                .then((result) => {
                    expect(result).to.eql(params)
                })
		})

		it('should reject if random parameter is passed', function () {
			let params = {
				game: 'Game_test',
				participants: [10, 20, 30],
				time: 1234567890,
				random: 'parameter'
			}

			let failMessage = 'Resolving with random parameter'
            let entity = new EventsEntity
			return entity.createValidation(params)
                .then(() => {
                    expect().fail(failMessage)
                })
				.catch((err) => {
					if(err && err.message == failMessage)
						expect().fail(failMessage)
					expect(err.name).to.eql('ValidationError')
				})
		})

		it('should reject if game is not defined', function () {
			let params = {
				participants: [10,20,30],
				time: 1234567890
			}

			let failMessage = 'Resolving without game'
            let entity = new EventsEntity
			return entity.createValidation(params)
                .then(() => {
                    expect().fail(failMessage)
                })
				.catch((err) => {
					if(err && err.message == failMessage)
						expect().fail(failMessage)
					expect(err.name).to.eql('ValidationError')
				})
		})

		it('should reject if time is not defined', function () {
			let params = {
				game: 'Game_test',
				participants: [10,20,30],
			}

			let failMessage = 'Resolving without time'
            let entity = new EventsEntity
			return entity.createValidation(params)
                .then(() => {
                    expect().fail(failMessage)
                })
				.catch((err) => {
					if(err && err.message == failMessage)
						expect().fail(failMessage)
					expect(err.name).to.eql('ValidationError')
				})
		})

		it('should reject if participants is not defined', function () {
			let params = {
				game: 'Game_test',
				time: 1234567890
			}

			let failMessage = 'Resolving without participants'
            let entity = new EventsEntity
			return entity.createValidation(params)
                .then(() => {
                    expect().fail(failMessage)
                })
				.catch((err) => {
					if(err && err.message == failMessage)
						expect().fail(failMessage)
					expect(err.name).to.eql('ValidationError')
				})
		})

		it('should reject if participants array is empty', function () {
			let params = {
				game: 'Game_test',
				participants: [],
				time: 1234567890
			}

			let failMessage = 'Resolving with participants empty'
            let entity = new EventsEntity
			return entity.createValidation(params)
                .then(() => {
                    expect().fail(failMessage)
                })
				.catch((err) => {
					if(err && err.message == failMessage)
						expect().fail(failMessage)
					expect(err.name).to.eql('ValidationError')
				})
		})

	})

	describe('create method', function(){

		it('should call adapter save method', function(){
			let saveCalled = false
            let deps = {
                Adapter: class {
                    save(){
                        saveCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve()
                        })
                    }
                }
            }
            let entity = new EventsEntity(deps)
			return entity.create()
                .then(() => {
                    expect(saveCalled).to.be.ok()
                })
		})

		it('should call adapter save method passing received parameters', function(){
            let expectedResult = {
                some: 'data'
            }
            let result = {...expectedResult}

            let saveCalled = false
            let deps = {
                Adapter: class {
                    save(data){
                        saveCalled = true
                        expect(data).to.eql(expectedResult)
                        return new Promise(function(resolve, reject) {
                            resolve()
                        })
                    }
                }
            }
            let entity = new EventsEntity(deps)
			return entity.create(result)
                .then(() => {
                    expect(saveCalled).to.be.ok()
                })
		})

    })

	describe('updateValidation method', function () {

		it('should accept id, game, time and participants', function () {
			let params = {
				id: 100,
				game: 'Game_test',
				participants: [10,20,30],
				time: 1234567
			}

			let entity = new EventsEntity
			return entity.updateValidation(params)
				.then((result) => {
					expect(result).to.eql(params)
				})

		})

		it('should reject without id', function () {
			let params = {
				game: 'Game_test',
				participants: [10,20,30],
				time: 1234567
			}

			let failMessage = 'Resolving without id'
            let entity = new EventsEntity
			return entity.updateValidation(params)
                .then(() => {
                    expect().fail(failMessage)
                })
				.catch((err) => {
					if(err && err.message == failMessage)
						expect().fail(failMessage)
					expect(err.name).to.eql('ValidationError')
				})

		})

		it('should accept without game', function () {
			let params = {
				id: 100,
				participants: [10,20,30],
				time: 1234567
			}

			let entity = new EventsEntity
			return entity.updateValidation(params)
				.then((result) => {
					expect(result).to.eql(params)
				})

		})

		it('should accept without time', function () {
			let params = {
				id: 100,
				game: 'Game_test',
				participants: [10,20,30]
			}

			let entity = new EventsEntity
			return entity.updateValidation(params)
				.then((result) => {
					expect(result).to.eql(params)
				})

		})

		it('should accept without participants', function () {
			let params = {
				id: 100,
				game: 'Game_test',
				time: 1234567
			}

			let entity = new EventsEntity
			return entity.updateValidation(params)
				.then((result) => {
					expect(result).to.eql(params)
				})

		})

		it('should reject with empty participants', function () {
			let params = {
				id: 100,
				game: 'Game_test',
				participants: [],
				time: 1234567
			}

			let failMessage = 'Resolving with empty participants'
            let entity = new EventsEntity
			return entity.updateValidation(params)
                .then(() => {
                    expect().fail(failMessage)
                })
				.catch((err) => {
					if(err && err.message == failMessage)
						expect().fail(failMessage)
					expect(err.name).to.eql('ValidationError')
				})

		})

		it('should reject with random parameter', function () {
			let params = {
				id: 100,
				game: 'Game_test',
				participants: [10,20,30],
				time: 1234567,
				random: 'parameter'
			}

			let failMessage = 'Resolving with empty participants'
            let entity = new EventsEntity
			return entity.updateValidation(params)
                .then(() => {
                    expect().fail(failMessage)
                })
				.catch((err) => {
					if(err && err.message == failMessage)
						expect().fail(failMessage)
					expect(err.name).to.eql('ValidationError')
				})

		})

	})

	describe('update method', function(){

		it('should call adapter update method', function () {
			let updatedCalled = false
			let deps = {
				Adapter: class {
					update() {
						updatedCalled = true
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
				}
			}

			let entity = new EventsEntity(deps)
			return entity.update()
				.then(() => {
					expect(updatedCalled).to.be.ok()
				})
		})

		it('should call adapter update method with received parameter', function () {
			let expectedResult = {
				random: 'data'
			}
			let params = {...expectedResult}

			let updatedCalled = false
			let deps = {
				Adapter: class {
					update(result) {
						updatedCalled = true
						expect(result).to.eql(expectedResult)
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
				}
			}

			let entity = new EventsEntity(deps)
			return entity.update(params)
				.then(() => {
					expect(updatedCalled).to.be.ok()
				})
		})

	})

	describe('read method', function(){

		it('should call adapter read method', function () {
			let readCalled = false
			let deps = {
				Adapter: class {
					read() {
						readCalled = true
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
				}
			}

			let entity = new EventsEntity(deps)
			return entity.read()
				.then(() => {
					expect(readCalled).to.be.ok()
				})
		})

		it('should call adapter read method passing received parameters', function () {
			let expectedResult = [10,20,30]
			let params = {...expectedResult}

			let readCalled = false
			let deps = {
				Adapter: class {
					read(ids) {
						readCalled = true
						expect(ids).to.eql(expectedResult)
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
				}
			}

			let entity = new EventsEntity(deps)
			return entity.read(params)
				.then(() => {
					expect(readCalled).to.be.ok()
				})
		})

    })

    describe('delete method', function(){

		it('should call adapter delete method', function () {
			let deleteCalled = false
			let deps = {
				Adapter: class {
					delete() {
						deleteCalled = true
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
				}
			}

			let entity = new EventsEntity(deps)
			return entity.delete()
				.then(() => {
					expect(deleteCalled).to.be.ok()
				})
		})

		it('should call adapter delete method passing received parameters', function () {
			let expectedResult = [10,20,30]
			let params = {...expectedResult}

			let deleteCalled = false
			let deps = {
				Adapter: class {
					delete(ids) {
						deleteCalled = true
						expect(ids).to.eql(expectedResult)
						return new Promise(function(resolve, reject) {
							resolve()
						})
					}
				}
			}

			let entity = new EventsEntity(deps)
			return entity.delete(params)
				.then(() => {
					expect(deleteCalled).to.be.ok()
				})
		})
    })


})
