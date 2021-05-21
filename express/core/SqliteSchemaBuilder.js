const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')

/**
 * Returns a GraphQLSchema
 * @param {SQLiteConnect} database
 * @param {SQLiteEntity} model
 */
function buildSchema(database, model) {
	const queryType = new GraphQLObjectType({
		name: model.name + 'Query',
		fields: {
			GetAll: {
				type: GraphQLList(model.type),
				resolve: () => {
					return new Promise((resolve, reject) => {
						database.all(`SELECT * FROM ${model.name};`, (err, rows) => {
							err ? reject([]) : resolve(rows)
						})
					})
				}
			},
			GetOne: {
				type: model.type,
				args: {
					id: {
						type: new GraphQLNonNull(GraphQLID)
					}
				},
				resolve: (_, { id }) => {
					return new Promise((resolve, reject) => {
						database.all(`SELECT * FROM ${model.name} WHERE id = (?) LIMIT 1;`, [id], (err, rows) => {
							err ? reject(null) : resolve(rows[0])
						})
					})
				}
			}
		}
	})

	const { id, ...creationArgs } = model.createOrUpdateArgs;
	const mutationType = new GraphQLObjectType({
		name: model.name + 'Mutation',
		fields: {
			create: {
				type: model.type,
				args: creationArgs,
				resolve: (_, fieldsObj) => {
					const fields = Object.keys(fieldsObj)
					const fieldsStr = fields.join(',')
					const values = Object.values(fieldsObj)
					const valuesStr = Array(values.length).fill('?').join(',')
					const query = `INSERT INTO ${model.name} (${fieldsStr}) VALUES (${valuesStr});`
					return new Promise((resolve, reject) => {
						database.run(query,	values,	(err) => {
							if (err) {
								reject(err)
							} else {
								database.get('SELECT last_insert_rowid() as id', (_, row) => {
									resolve({ ...fieldsObj, id: row["id"] })
								})
							}
							}
						)}
					)
				}
			},

			update: {
				type: model.type,
				args: model.createOrUpdateArgs,
				resolve: (_, fieldsObj) => {
					const {id, ...toUpdate } = fieldsObj

					const fields = Object.keys(toUpdate)
					const fieldsStr = fields.map(elt => `${elt} = (?)` ).join(',')
					const values = Object.values(toUpdate)

					return new Promise((resolve, reject) => {
						database.run(
							`UPDATE ${model.name} SET ${fieldsStr} WHERE id = (?);`,
							values.push(id),
							(err) => {
								err ? reject(err) : resolve(`${model.name} #${id} updated`)
							}
						)
					})
				}
			},

			delete: {
				type: GraphQLString,
				args: {
					id: {
						type: new GraphQLNonNull(GraphQLID)
					}
				},
				resolve: (_, { id }) => {
					return new Promise((resolve, reject) => {
						database.run(`DELETE FROM ${model.name} WHERE id =(?);`, [id], (err) => {
							err ? reject(err) : resolve(`${model.name} #${id} deleted`)
						})
					})
				}
			}
		}
	})

	return new GraphQLSchema({
		query: queryType,
		mutation: mutationType
	})
}

module.exports = {
	buildSchema
}