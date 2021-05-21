const sqlite3 = require('sqlite3').verbose()

class SQLiteConnector {
	dbFile;
	database;
	tables;

	constructor(dbFile, tableConfig) {
		this.dbFile = dbFile
		this.tables = tableConfig
		this.database = new sqlite3.Database(dbFile)
	}

	run() {
		const queries = this.buildTablesQueries()
		queries.forEach(query => {
			this.database.run(query)
		});
	}

	buildTablesQueries() {
		return this.tables.map(table => {
			const columns = [{ name: 'id', type: 'integer', isPrimaryKey: true, isAutoIncrement: true }, ...table.fields]
			const fields = columns.map(field => {
				const str = [field.name,field.type]

				if (field.isPrimaryKey) {
					str.push('PRIMARY KEY')
				}

				if (field.isUnique) {
					str.push('UNIQUE')
				}

				if (field.isAutoIncrement) {
					str.push('AUTOINCREMENT')
				}

				return str.join(' ')
			})
			.join(',')

			return `CREATE TABLE IF NOT EXISTS ${table.name} (${fields})`
		});
	}
}

module.exports = SQLiteConnector;