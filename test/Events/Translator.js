import expect from 'expect.js'
import EventsTranslator from '../../app/Events/Translator'

describe('The Events translator', function(){

    describe('_statusCode method', function () {

        it('should return 500 if do not find error', function () {
            let expectedResult = 500

            let error = {
                random: 'error'
            }

            let translator = new EventsTranslator
            let result = translator._statusCode(error)

            expect(result).to.eql(expectedResult)
        })

        it('should return error on httpCods', function () {
            let expectedResult = 700

            let error = {
                name: 'TEST_ERROR',
                random: 'error'
            }

            let deps = {
                httpCodes: {
                    TEST_ERROR: expectedResult
                }
            }

            let translator = new EventsTranslator(deps)
            let result = translator._statusCode(error)

            expect(result).to.eql(expectedResult)
        })

    })

	describe('get method', function () {

		it('should call interactor read method', function () {
            let readCalled = false
            let deps = {
                Interactor: class {
                    read(){
                        readCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve()
                        })
                    }
                }
            }

            let translator = new EventsTranslator(deps)

            translator.get()

            expect(readCalled).to.be.ok()
        })

		it('should call interactor read method with body.ids', function () {
            let expectedResult = [10,20,30]

            let reqMock = {
                body: {
                    ids: [...expectedResult]
                }
            }

            let readCalled = false
            let deps = {
                Interactor: class {
                    read(ids){
                        expect(ids).to.eql(expectedResult)
                        readCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve()
                        })
                    }
                }
            }

            let translator = new EventsTranslator(deps)

            translator.get(reqMock)

            expect(readCalled).to.be.ok()
        })

		it('should call res.json with 200 and read resolve', function (done) {
            let expectedResult = [
                {database: 'result'},
                {database: 'result'}
            ]
            let result = [...expectedResult]

            let readCalled = false
            let deps = {
                Interactor: class {
                    read(){
                        readCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve(result)
                        })
                    }
                }
            }

            let resMock = {
                json: (status, body) => {
                    expect(status).to.eql(200)
                    expect(body).to.eql(expectedResult)
                    done()
                }
            }

            let translator = new EventsTranslator(deps)

            translator.get(null, resMock)

            expect(readCalled).to.be.ok()
        })

		it('should call res.json with 500 and read reject if random error', function (done) {
            let expectedError = {
                random: 'error'
            }
            let error = {...expectedError}

            let readCalled = false
            let deps = {
                Interactor: class {
                    read(){
                        readCalled = true
                        return new Promise(function(resolve, reject) {
                            reject(error)
                        })
                    }
                }
            }

            let resMock = {
                json: (status, error) => {
                    expect(status).to.eql(500)
                    expect(error).to.eql(expectedError)
                    done()
                }
            }

            let translator = new EventsTranslator(deps)

            translator.get(null, resMock)

            expect(readCalled).to.be.ok()
        })

		it('should call res.json with httpCodes code and read reject if random error', function (done) {
            const expectedErrorCode = 700
            let expectedError = {
                random: 'error',
                name: 'TEST_ERROR'
            }
            let error = {...expectedError}

            let readCalled = false
            let deps = {
                httpCodes: {
                    TEST_ERROR: expectedErrorCode
                },
                Interactor: class {
                    read(){
                        readCalled = true
                        return new Promise(function(resolve, reject) {
                            reject(error)
                        })
                    }
                }
            }

            let resMock = {
                json: (status, error) => {
                    expect(status).to.eql(expectedErrorCode)
                    expect(error).to.eql(expectedError)
                    done()
                }
            }

            let translator = new EventsTranslator(deps)

            translator.get(null, resMock)

            expect(readCalled).to.be.ok()
        })

    })

    describe('post method', function () {

        it('should call interactor create method', function () {
            let createCalled = false
            let deps = {
                Interactor: class {
                    create(){
                        createCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve()
                        })
                    }
                }
            }

            let translator = new EventsTranslator(deps)
            translator.post()

            expect(createCalled).to.be.ok()
        })

        it('should call interactor create method passing body req', function () {
            let expectedResult = {
                random: 'data'
            }

            let reqMock = {
                body: {...expectedResult}
            }

            let createCalled = false
            let deps = {
                Interactor: class {
                    create(result){
                        createCalled = true
                        expect(result).to.eql(expectedResult)
                        return new Promise(function(resolve, reject) {
                            resolve()
                        })
                    }
                }
            }

            let translator = new EventsTranslator(deps)
            translator.post(reqMock)

            expect(createCalled).to.be.ok()
        })

        it('should res.json with 201 and create response', function (done) {
            let expectedResult = {
                random: 'data'
            }

            let createCalled = false
            let deps = {
                Interactor: class {
                    create(){
                        createCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve(expectedResult)
                        })
                    }
                }
            }

            let resMock = {
                json: (status, body) => {
                    expect(status).to.eql(201)
                    expect(body).to.eql(expectedResult)
                    done()
                }
            }

            let translator = new EventsTranslator(deps)
            translator.post(null, resMock)

            expect(createCalled).to.be.ok()
        })

        it('should call _statusCode and use its return to res.json', function (done) {
            let expectedErrorCode = 560
            let expectedError = {
                random: 'data'
            }

            let createCalled = false
            let deps = {
                Interactor: class {
                    create(){
                        createCalled = true
                        return new Promise(function(resolve, reject) {
                            reject(expectedError)
                        })
                    }
                }
            }

            let resMock = {
                json: (status, body) => {
                    expect(status).to.eql(expectedErrorCode)
                    expect(body).to.eql(expectedError)
                    done()
                }
            }

            let translator = new EventsTranslator(deps)
            translator._statusCode = () => expectedErrorCode
            translator.post(null, resMock)

            expect(createCalled).to.be.ok()
        })

    })

    describe('put method', function () {

        it('should call interactor update method', function () {
            let updateCalled = false
            let deps = {
                Interactor: class {
                    update(){
                        updateCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve()
                        })
                    }
                }
            }

            let translator = new EventsTranslator(deps)
            translator.put()

            expect(updateCalled).to.be.ok()
        })

        it('should call interactor update method passing body req', function () {
            let expectedResult = {
                random: 'data'
            }

            let reqMock = {
                body: {...expectedResult}
            }

            let updateCalled = false
            let deps = {
                Interactor: class {
                    update(result){
                        updateCalled = true
                        expect(result).to.eql(expectedResult)
                        return new Promise(function(resolve, reject) {
                            resolve()
                        })
                    }
                }
            }

            let translator = new EventsTranslator(deps)
            translator.put(reqMock)

            expect(updateCalled).to.be.ok()
        })

        it('should res.json with 200 and update response', function (done) {
            let expectedResult = {
                random: 'data'
            }

            let updateCalled = false
            let deps = {
                Interactor: class {
                    update(){
                        updateCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve(expectedResult)
                        })
                    }
                }
            }

            let resMock = {
                json: (status, body) => {
                    expect(status).to.eql(200)
                    expect(body).to.eql(expectedResult)
                    done()
                }
            }

            let translator = new EventsTranslator(deps)
            translator.put(null, resMock)

            expect(updateCalled).to.be.ok()
        })

        it('should call _statusCode and use its return to res.json', function (done) {
            let expectedErrorCode = 560
            let expectedError = {
                random: 'data'
            }

            let updateCalled = false
            let deps = {
                Interactor: class {
                    update(){
                        updateCalled = true
                        return new Promise(function(resolve, reject) {
                            reject(expectedError)
                        })
                    }
                }
            }

            let resMock = {
                json: (status, body) => {
                    expect(status).to.eql(expectedErrorCode)
                    expect(body).to.eql(expectedError)
                    done()
                }
            }

            let translator = new EventsTranslator(deps)
            translator._statusCode = () => expectedErrorCode
            translator.put(null, resMock)

            expect(updateCalled).to.be.ok()
        })

    })

    describe('delete method', function () {

		it('should call interactor delete method', function () {
            let deleteCalled = false
            let deps = {
                Interactor: class {
                    delete(){
                        deleteCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve()
                        })
                    }
                }
            }

            let translator = new EventsTranslator(deps)

            translator.delete()

            expect(deleteCalled).to.be.ok()
        })

		it('should call interactor delete method with body.ids', function () {
            let expectedResult = [10,20,30]

            let reqMock = {
                body: {
                    ids: [...expectedResult]
                }
            }

            let deleteCalled = false
            let deps = {
                Interactor: class {
                    delete(ids){
                        expect(ids).to.eql(expectedResult)
                        deleteCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve()
                        })
                    }
                }
            }

            let translator = new EventsTranslator(deps)

            translator.delete(reqMock)

            expect(deleteCalled).to.be.ok()
        })

		it('should call res.json with 200 and delete resolve', function (done) {
            let expectedResult = [
                {database: 'result'},
                {database: 'result'}
            ]
            let result = [...expectedResult]

            let deleteCalled = false
            let deps = {
                Interactor: class {
                    delete(){
                        deleteCalled = true
                        return new Promise(function(resolve, reject) {
                            resolve(result)
                        })
                    }
                }
            }

            let resMock = {
                json: (status, body) => {
                    expect(status).to.eql(200)
                    expect(body).to.eql(expectedResult)
                    done()
                }
            }

            let translator = new EventsTranslator(deps)

            translator.delete(null, resMock)

            expect(deleteCalled).to.be.ok()
        })

        it('should call _statusCode and use its return to res.json', function (done) {
            let expectedErrorCode = 560
            let expectedError = {
                random: 'data'
            }

            let deleteCalled = false
            let deps = {
                Interactor: class {
                    delete(){
                        deleteCalled = true
                        return new Promise(function(resolve, reject) {
                            reject(expectedError)
                        })
                    }
                }
            }

            let resMock = {
                json: (status, body) => {
                    expect(status).to.eql(expectedErrorCode)
                    expect(body).to.eql(expectedError)
                    done()
                }
            }

            let translator = new EventsTranslator(deps)
            translator._statusCode = () => expectedErrorCode
            translator.delete(null, resMock)

            expect(deleteCalled).to.be.ok()
        })

    })

})
