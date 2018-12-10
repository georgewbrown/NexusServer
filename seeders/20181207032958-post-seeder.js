'use strict';
const chance = require('chance')()


module.exports = {
  up: (queryInterface, Sequelize) => {
    let postArr = [];
          
    for (let i = 1; i < 200; i++) {
      const posts = {
        jobTitle: chance.name({ nationality: 'en' }),
        location: `${chance.city()},${chance.country({ full: true })}`,
        payRange: chance.dollar({ max: 100000}),
        skills: "Auditing",
        jobDescription: chance.paragraph({sentences: 3}),
        businessId: chance.integer({ min: 1, max: 100 }),
        role:"notadmin",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      };
      postArr.push(posts);
    }
    return queryInterface.bulkInsert('posts', postArr, {});
  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});

  }
};