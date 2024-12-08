const { sequelize } = require('./connection');
const { Author, Book } = require('./models');

//Conexión con la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection success');
    sequelize.sync();
  })
  .then(() => {
    console.log('Sync models');
    create_author()
     .then((new_author) => {
        console.log(new_author.id);
        create_book(new_author.id);
     })
  })
  .catch((error) => {
    console.error('Connection fail', error);
  });

const create_author = async () => {
  try {
    const name = 'itziar';
    const age = '39';
    const result =  await Author.create({ name, age });
    console.log('Se ha añadido el autor:' + result.id);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const create_book = async (authorId) => {
  const isbn = '1234';
  const title = 'Don Quijote';
  const cantPages = 500;
  try {
    const result = await Book.create({
      isbn:isbn,
      name: title,
      cantPages: cantPages,
      authorId: authorId,
    });
    console.log('Se ha añadido el libro:' + result.id);
  } catch (error) {
    console.log(error);
  }
};
