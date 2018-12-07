'use strict';
const chance = require('chance')()
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let bizArr = []

    for (let i = 0; i < 1000; i++) {
      let name = chance.name({ nationality: 'en' });
      let email = `${name.slice(0,1)}@gmail.com`.toLowerCase();
      let about = chance.paragraph({sentences: 5});
      let phoneNumber = chance.phone();
      let profilePicture = chance.avatar({protocol: 'https'});
      let location = `${chance.city()},${chance.country({ full: true })}`;
      let website = chance.url();
      let linkdin =`www.linkedin.com/in${name}/`;
      let faceBook =`www.facebook.com/${name}`;
      let instagram =`https://www.instagram.com/${name}`;
      let twitter = `https://twitter.com/${name}`;
      let rating = chance.integer({ min: 1, max: 5 })
      let business = {
        name,
        password: bcrypt.hashSync('pass', 10),
        email,
        about,
        profilePicture,
        phoneNumber,
        location,
        website,
        linkdin,
        faceBook,
        instagram,
        twitter,
        rating,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
      bizArr.push(business)
    }
    return queryInterface.bulkInsert('businesses', bizArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('businesses', null, {})
  }
};
