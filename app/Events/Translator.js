export default class EventsEntity {

	constructor(deps = {}) {
		this.Interactor = deps.Interactor || require('./Interactor').default
        this.httpCodes = deps.httpCodes || require('../constants/httpCodes').default
	}

	_statusCode(error){
		return error.name ? this.httpCodes[error.name] : 500
	}

	get(req, res, next){
        let ids = req && req.body && req.body.ids

        let interactor = new this.Interactor
        interactor.read(ids)
            .then((result) => {
                res.json(200, result)
            })
            .catch((error) => {
                let status = this._statusCode(error)
                res.json(status, error)
            })
    }

	post(req, res, next){
		let body = req && req.body

		let interactor = new this.Interactor
		interactor.create(body)
			.then((result) => {
				res.json(201, result)
			})
			.catch((error) => {
				let status = this._statusCode(error)
				res.json(status, error)
			})
	}

	put(req, res, next){
		let body = req && req.body

		let interactor = new this.Interactor
		interactor.update(body)
			.then((result) => {
				res.json(200, result)
			})
			.catch((error) => {
				let status = this._statusCode(error)
				res.json(status, error)
			})
	}

	delete(req, res, next){
        let ids = req && req.body && req.body.ids

        let interactor = new this.Interactor
        interactor.delete(ids)
            .then((result) => {
                res.json(200, result)
            })
            .catch((error) => {
                let status = this._statusCode(error)
                res.json(status, error)
            })
    }

}
