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

})
