const { GraphQLID, GraphQLInt, GraphQLFloat, GraphQLBoolean, GraphQLString, GraphQLObjectType, GraphQLNonNull } = require("graphql");

class Entity {
	name;
	type;
	createOrUpdateArgs;

	constructor(name, fields = []) {
		this.name = name
		this._makeFields(fields)
	}

	_makeFields(fields) {
		const object = {}
		const updateOrCreate = {}

		fields.forEach(element => {
			let type;
			switch(element.type) {
				case 'id':
					type = GraphQLID
					break
				case 'integer':
					type = GraphQLInt
					break
				case 'float':
					type = GraphQLFloat
					break
				case 'bool':
				case 'boolean':
					type = GraphQLBoolean
					break
				default:
					type = GraphQLString
			}
			object[element.name] = { type }
			updateOrCreate[element.name] = {
				type: new GraphQLNonNull(type)
			}
		});

		this.type = new GraphQLObjectType({
			name: this.name,
			fields: object
		})
		this.createOrUpdateArgs = updateOrCreate
	}

	static get(name, fields) {
		return new Entity(name, fields)
	}
}

module.exports = Entity