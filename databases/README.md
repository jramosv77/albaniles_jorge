npm install pg pg-hstore sequelize --save
npm install --save-dev sequelize-cli

cd databases/
npx sequelize-cli init
npx sequelize-cli db:migrate
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all  (sequelize db:seed:all)

cd ..
npm run bd:user  //query user