//Imports

const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

// Sequelize and db models set-up

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
      //allowNull: false,
    },
    synopsis: {
      type: Sequelize.STRING,
      //allowNull: false,
    },
  },
  { timestamps: false }
);

db.sync({ force: false })
  .then(() => console.log('Tables updated successfully'))
  .then(() =>
    //     //     Promise.all([
    //     //       Movie.create({
    //     //         title: 'Apocalypse Now',
    //     //         yearOfRelease: 1979,
    //     //         synopsis:
    //     //           'A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god.',
    //     //       }),
    //     //       Movie.create({
    //     //         title: 'Blade Runner',
    //     //         yearOfRelease: 1982,
    //     //         synopsis:
    //     //           'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
    //     //       }),
    //     //       Movie.create({
    //     //         title: 'Metropolis',
    //     //         yearOfRelease: 1927,
    //     //         synopsis:
    //     //           "In a futuristic city sharply divided between the working class and the city planners, the son of the city's mastermind falls in love with a working class prophet who predicts the coming of a savior to mediate their differences",
    //     //       }),
    //     //     ])
    //     //   )
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

  //.then(result => console.log(result))
  .catch(err => {
    console.error('Unable to create tables', err);
    // exit with failure code if not created
    process.exit(1);
  });

// Express app, routing, RESTful actions set-up
// All in same file so I don't need express router I think

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

const port = process.env.PORT || 4000;

function onListen() {
  console.log(`Listening on :${port}`);
}

app.listen(port, onListen);

// Read all movies

app.get('/movies', (request, response, next) => {
  Movie.findAll()
    //.then(console.log(response.body))
    .then(movies => {
      //console.log(movies);
      if (movies.length === 0) {
        return response.status(404).send({ message: 'Movies not found' });
      } else {
        return response.send(movies);
      }
    })
    .catch(error => next(error));
});

// Create a new movie resource
app.post('/movies', (request, response) =>
  //console.log('request', request.body)
  Movie.create(request.body)
    .then(result => {
      //console.log('MOVIE CREATED', result.dataValues);
      return response.status(201).send(result);
    })
    .catch(error => {
      if (error.name === 'SequelizeValidationError') {
        return response
          .status(422)
          .send({ message: 'Movie title cannot be null' });
      } else {
        return response.status(400).send({ message: 'Bad request' });
      }
    })
);

// Read a single movie resource
app.get('/movies/:id', (request, response, next) => {
  Movie.findByPk(request.params.id)
    //.then(console.log('request.params.id', request.params.id))
    .then(movie => {
      //console.log(movie);
      if (!movie) {
        return response.status(404).send({ message: 'Movie not found' });
      } else {
        return response.send(movie);
      }
    })
    .catch(error => next(error));
});

// Delete a single movie resource
app.delete('/movies/:id', (request, response, next) => {
  const idMovieToDelete = parseInt(request.params.id);
  Movie.destroy({
    where: {
      id: idMovieToDelete,
    },
  })
    .then(deletedItems => {
      if (deletedItems === 0) {
        response.status(404).end();
      } else {
        response.send({ message: 'Movie successfully deleted' });
      }
    })
    //.then(response.send({ message: 'Movie successfully deleted' }))
    .catch(error => next(error));
});

// Update a single movie resource
app.put('/movies/:id', (request, response, next) => {
  Movie.findByPk(parseInt(request.params.id))
    .then(movie => {
      if (movie) {
        return movie.update(request.body).then(movie => {
          return response.json(movie);
        });
      } else {
        return response.status(404).send({ message: 'Movie not found' });
      }
    })
    .catch(error => next(error));
});
