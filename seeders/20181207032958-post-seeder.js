'use strict';
const chance = require('chance')()

let businessIdArr = [1]
function getRandbusinessId(){
  const rand = Math.floor(Math.random() * businessIdArr.length)
  return businessIdArr[rand];
} 

module.exports = {
  up: (queryInterface, Sequelize) => {
    let postArr = [];
    
    for (let i = 1; i < 1000; i++) {
      const posts = {
        id: i,
        jobTitle: chance.name({ nationality: 'en' }),
        location: `${chance.city()},${chance.country({ full: true })}`,
        payRange: chance.dollar({ min:1, max: 100000}),
        skills: "",
        jobDescription: chance.paragraph({sentences: 3}),
        businessId: 1,
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