import expect from 'expect.js'
import EventsEntity from '../../app/Events/Entity'

describe('The Events entity', function(){

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
    describe('read method', function(){

    })
    describe('update method', function(){

    })
    describe('delete method', function(){

    })


})
