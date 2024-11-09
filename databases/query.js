const db = require('./models/index');

// Find all users
const query = async () => {
  //get all projects

  // const projects = await db.User.findAll({
  //     attributes:['firstName', 'id']
  // });
  // console.log("All projects:", JSON.stringify(projects, null, 2));

  //get all users

  //const user = await db.User.findOne();
  // console.log("All users:", JSON.stringify(user, null, 2));

  //create user
  // const user = await db.User.create({
  //     id: 7,
  //     firstName: "Alex",
  //     lastName: "Vee",
  //     departmentId: 2,
  //     projectId: 4,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  // })
  // console.log("All users:", JSON.stringify(user, null, 2));

  //update user
  // const user = await db.User.update({ firstName: 'Jay'},
  // {
  //     where: {
  //         id:7
  //     }
  // }
  // );
  // const user =await db.User.findOne({where:{id:7}})
  // console.log(user);

  //create department
  // const department = await db.Department.create({
  //     id: 5,
  //     departmentName: "QA",
  //     phone: "813-456-5230",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  // })

  //create user

  // const user = await db.User.create({
  //     name: "Alex",
  //     surname: "Zee",
  // })
  // console.log("New User Added:", JSON.stringify(user, null, 2));


  //create status_task
  const status_task = await db.StatusTask.create({
    name: 'ready',
    description: 'listo para hacer',
  });
  console.log(status_task);
  
  
  //create task
  const task = await db.Task.create({
    title: 'task1',
    description: 'prueba',
    status_id: status_task.id,
  })
  console.log("Task's auto-generated ID:", task.id);

  

};

query();
