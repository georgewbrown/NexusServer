'use strict';

const chance = require('chance')()
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let bizArr = []

    for (let i = 0; i < 100; i++) { 
      let rating = chance.integer({ min: 1, max: 5 })
      let business = {
        username:`Donovan${i}`,
        name: `Donovan's Dumpster Collection(DDC) Co.${i}`,
        password: bcrypt.hashSync('pass', 10),
        email: `careers@Donovans-Dumpster-Collection${i}.com`,
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        profilePicture: "https://imgur.com/gallery/B5FcIac",
        phoneNumber: "(555)555-5555",
        location: "Ankara,Turkey",
        website: "Donovan's-Dumpster-Collection(DDC).com",
        linkdin: "www.linkedin.com/in/Donovan's-Dumpster-Collection(DDC).com",
        faceBook: "www.facebook.com/Donovans-Dumpster-Collection",
        instagram: "https://www.instagram.com/Donovans-Dumpster-Collection/",
        twitter: "https://twitter.com/Donovans-Dumpster-Collection",
        rating: rating,
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
