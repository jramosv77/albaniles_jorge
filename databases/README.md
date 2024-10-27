npm install pg pg-hstore sequelize --save
npm install --save-dev sequelize-cli

cd databases/
npx sequelize-cli init
sequelize model:create --name StatusTask --attributes name:string,description:string
sequelize model:create --name Task --attributes title:string,description:string,(status_id:integer,project_id:integer),start_date:date,end_date:date
sequelize model:create --name StatusProject --attributes name:string,description:string
sequelize model:create --name Module --attributes title:string,description:string
sequelize model:create --name Project --attributes title:string,description:string,publish:boolean,due_date:date,url:string,(status_id:integer,module_id:integer)
sequelize model:create --name Module --attributes title:string,description:string
sequelize model:create --name UserTask --attributes completed:boolean,(task_id:integer,user_id:integer)
sequelize migration:generate --name add-associations    
npx sequelize-cli db:migrate


npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all  (sequelize db:seed:all)

cd ..
npm run bd:user  //query user