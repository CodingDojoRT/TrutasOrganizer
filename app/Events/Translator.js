export default class EventsEntity {

	constructor(deps = {}) {
		this.Interactor = deps.Interactor || require('./Interactor').default
        this.httpCodes = deps.httpCodes || require('../constants/httpCodes').default
	}

	get(req, res, next){
        let ids = req && req.body && req.body.ids

        let interactor = new this.Interactor
        interactor.read(ids)
            .then((result) => {
                res.json(200, result)
            })
            .catch((error) => {
                let status = error.name ? this.httpCodes[error.name] : 500
                res.json(status, error)
            })
    }

}
