const db = require("../models" );

module.exports = {
  getAll() {
    return db.students.findAll({});
  },
  insert(data) {
    return db.students.create(data);
  },
};
