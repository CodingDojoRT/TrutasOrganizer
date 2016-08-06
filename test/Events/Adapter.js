import expect from 'expect.js'
import EventsAdapter from '../../app/Events/Adapter'
import config from '../../config'

describe('The Events adapter', function(){

	describe('read method', function () {

		it('should call http get method passing config.databaseUrl', function () {
            let expectedResult = config.databaseUrl + '/events.json'

            let getCalled = false
            let deps = {
                http: {
                    get: (result) => {
                        getCalled = true
                        expect(result).to.eql(expectedResult)
                        return new Promise(function(resolve, reject) {
                            resolve({data:{}})
                        })
                    }
                }
            }

            let adapter = new EventsAdapter(deps)
            return adapter.read()
                .then(() => {
                    expect(getCalled).to.be.ok()
                })
        })

		it('should return an array with objects of each db item', function () {
            let expectedResult = [
                {
                    id: 100,
                    game: 'CS:GO',
                    participants: [1,2,3],
                    time: 1234567
                },
                {
                    id: 200,
                    game: 'Dota',
                    participants: [10,20,30],
                    time: 7654321
                }
            ]

            let dbResult = {
                data: {
                    100: {
                        game: 'CS:GO',
                        participants: [1,2,3],
                        time: 1234567
                    },
                    200: {
                        game: 'Dota',
                        participants: [10,20,30],
                        time: 7654321
                    }
                }
            }

            let getCalled = false
            let deps = {
                http: {
                    get: (result) => {
                        getCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve(dbResult)
                        })
                    }
                }
            }

            let adapter = new EventsAdapter(deps)
            return adapter.read()
                .then((result) => {
                    expect(result).to.eql(expectedResult)
                    expect(getCalled).to.be.ok()
                })
        })

    })

	describe('update method', function () {

		it('should call http put method passing config.databaseUrl/body.id and a {body} as parameters', function () {
			let expectedId = 100
			let expectedResult = config.databaseUrl + '/events/' + expectedId + '.json'

			let expectedBody = {
				game: 'test_game',
				participants: [100],
				time: 123456
			}

			let body = {
				id: expectedId,
				game: 'test_game',
				participants: [100],
				time: 123456
			}
			let getCalled = false
			let deps = {
				http: {
					put: (result, opt) => {
						getCalled = true
						expect(result).to.eql(expectedResult)
						expect(opt.body).to.eql(expectedBody)
						return new Promise(function(resolve, reject) {
							resolve({data:{}})
						})
					}
				}
			}

			let adapter = new EventsAdapter(deps)
			return adapter.update(body)
				.then(() => {
					expect(getCalled).to.be.ok()
				})
		})

	})

	describe('save method', function () {

		it('should call http post method passing config.databaseUrl and a {body} as parameters', function () {
			let expectedResult = config.databaseUrl + '/events.json'

			let expectedBody = {
				game: 'test_game',
				participants: [100],
				time: 123456
			}

			let body = {
				game: 'test_game',
				participants: [100],
				time: 123456
			}
			let getCalled = false
			let deps = {
				http: {
					post: (result, opt) => {
						getCalled = true
						expect(result).to.eql(expectedResult)
						expect(opt.body).to.eql(expectedBody)
						return new Promise(function(resolve, reject) {
							resolve({data:{}})
						})
					}
				}
			}

			let adapter = new EventsAdapter(deps)
			return adapter.save(body)
				.then(() => {
					expect(getCalled).to.be.ok()
				})
		})

	})


})
