const Pool = require('pg').Pool

const getConnection = async () => {

	try {
		console.log(process.env.DB_USER)
		const pool = new Pool({
			user: process.env.DB_USER,
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			password: process.env.DB_PASS,
			port: process.env.DB_PORT,
		});

		const migrate = await pool.query(`CREATE TABLE IF NOT EXISTS requests(
			id serial,
			phonenumber bigint,
			isprovider boolean,
			need text,
			location text,
			radius int,
			PRIMARY KEY( id )
		);`)

		return pool;

	} catch (error) {
		console.log(error)
	}
}

module.exports = getConnection