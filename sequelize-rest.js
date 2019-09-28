const Sequelize = require('sequelize');

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:password@localhost:5432/postgres';

const db = new Sequelize(connectionString);

const Movie = db.define(
  'movie',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    yearOfRelease: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    synopsis: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

db.sync({ force: false })
  .then(() => console.log('Tables updated successfully'))
  .then(() =>
    Movie.bulkCreate([
      {
        title: 'Apocalypse Now',
        yearOfRelease: 1979,
        synopsis:
          'A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god.',
      },
      {
        title: 'Blade Runner',
        yearOfRelease: 1982,
        synopsis:
          'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
      },
      {
        title: 'Metropolis',
        yearOfRelease: 1927,
        synopsis:
          "In a futuristic city sharply divided between the working class and the city planners, the son of the city's mastermind falls in love with a working class prophet who predicts the coming of a savior to mediate their differences",
      },
    ])
  )
  .then(result => console.log(result))
  .catch(err => {
    console.error('Unable to create tables', err);
    // exit with failure code if not created
    process.exit(1);
  });
