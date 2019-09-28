const Sequelize = require("sequelize");

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:password@localhost:5432/postgres";

const db = new Sequelize(connectionString);

const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  yearOfRelease: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  synopsis: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

db.sync()
  .then(() => console.log("Tables created successfully"))
  .catch(err => {
    console.error("Unable to create tables, shutting down...", err);
    process.exit(1);
  });
