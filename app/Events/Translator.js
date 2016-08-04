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

}
