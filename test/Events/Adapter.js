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

	describe('readOne method', function () {

		it('should call http get method passing config.databaseUrl/id', function () {
			let expectedId = 100
			let expectedUrl = config.databaseUrl + '/events/' + expectedId + '.json'

            let getCalled = false
            let deps = {
                http: {
                    get: (url) => {
                        getCalled = true
                        expect(url).to.eql(expectedUrl)
                        return new Promise(function(resolve, reject) {
                            resolve({data:{}})
                        })
                    }
                }
            }

            let adapter = new EventsAdapter(deps)
            return adapter.readOne(expectedId)
                .then(() => {
                    expect(getCalled).to.be.ok()
                })
        })

		it('should return an array with objects of each db item', function () {
			let expectedId = 100
            let expectedResult = {
				id: expectedId,
				game: 'Dota',
				participants: [10,20,30],
				time: 7654321
			}

            let dbResult = {
                data: {
					game: 'Dota',
					participants: [10,20,30],
					time: 7654321
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
            return adapter.readOne(expectedId)
                .then((result) => {
                    expect(result).to.eql(expectedResult)
                    expect(getCalled).to.be.ok()
                })
        })

		it('should throw if db doest not return anything', function () {
			let expectedId = 100
			let expectedUrl = config.databaseUrl + '/events/' + expectedId + '.json'

            let getCalled = false
            let deps = {
                http: {
                    get: (url) => {
                        getCalled = true
                        expect(url).to.eql(expectedUrl)
                        return new Promise(function(resolve, reject) {
                            resolve({})
                        })
                    }
                }
            }

            let adapter = new EventsAdapter(deps)
            return adapter.readOne(expectedId)
				.then(() => expect().fail())
                .catch((error) => {
                    expect(error.name).to.eql('NotFound')
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
						expect(opt).to.eql(expectedBody)
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

		it('should resolve with dbResponse.data', function () {
			let expectedId = 100
			let expectedUrl = config.databaseUrl + '/events/' + expectedId + '.json'
			let expectedResult = {
				name: '-HJASDKLJSDAKLJ'
			}

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

			let dbResponse = {
				data: {...expectedResult}
			}

			let getCalled = false
			let deps = {
				http: {
					put: (url, opt) => {
						getCalled = true
						expect(url).to.eql(expectedUrl)
						expect(opt).to.eql(expectedBody)
						return new Promise(function(resolve, reject) {
							resolve(dbResponse)
						})
					}
				}
			}

			let adapter = new EventsAdapter(deps)
			return adapter.update(body)
				.then((result) => {
					expect(result).to.eql(expectedResult)
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
						expect(opt).to.eql(expectedBody)
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

		it('should resolve with dbResponse.data', function () {
			let expectedUrl = config.databaseUrl + '/events.json'
			let expectedResult = {
				name: '-LKJDSALKJDASLJK'
			}

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

			let dbResponse = {
				data: {...expectedResult}
			}

			let getCalled = false
			let deps = {
				http: {
					post: (url, opt) => {
						getCalled = true
						expect(url).to.eql(expectedUrl)
						expect(opt).to.eql(expectedBody)
						return new Promise(function(resolve, reject) {
							resolve(dbResponse)
						})
					}
				}
			}

			let adapter = new EventsAdapter(deps)
			return adapter.save(body)
				.then((result) => {
					expect()
					expect(getCalled).to.be.ok()
				})
		})

	})


})
