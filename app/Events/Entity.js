import Joi from 'joi'

export default class EventsEntity {

	constructor(deps = {}) {
		this.Adapter = deps.Adapter || require('./Adapter').default
	}

	createValidation(input){
        return new Promise((resolve, reject) => {
            let schema = Joi.object().keys({
                game: Joi.string().required(),
				time: Joi.number().required(),
                participants: Joi.array().min(1).items(
					Joi.number()
				).required()
            })
            let result = Joi.validate(input, schema)
            if(!result.error){
                resolve(result.value)
            } else {
                let outputMessage = {
                    name: 'ValidationError',
                    messages: result.error.details.map(e => e.message)
                }
                reject(outputMessage)
            }
        })
	}

    create(body){
        let adapter = new this.Adapter
        return adapter.save(body)
    }

	updateValidation(input){
        return new Promise((resolve, reject) => {
            let schema = Joi.object().keys({
				id: Joi.string().required(),
                game: Joi.string().optional(),
				time: Joi.number().optional(),
                participants: Joi.array().min(1).items(
					Joi.number()
				).optional()
            })
            let result = Joi.validate(input, schema)
            if(!result.error){
                resolve(result.value)
            } else {
                let outputMessage = {
                    name: 'ValidationError',
                    messages: result.error.details.map(e => e.message)
                }
                reject(outputMessage)
            }
        })
	}

	update(body){
        let adapter = new this.Adapter
        return adapter.update(body)
	}

	read(ids){
		let adapter = new this.Adapter
		if(!ids || ids.length === 0){
			return adapter.read()
		}
		switch(ids.length){
			case 1:
				return adapter.readOne(ids[0])
		}
	}

	delete(ids){
		let adapter = new this.Adapter
		return adapter.delete(ids)
	}

}
