// importing Bluebird promises so we can Promise.map
const Promise = require('bluebird');
// bring in the db and all the Models to seed
const db = require('./db');
const Business = require('./models/business');
const Employee = require('./models/employee');
const Post = require('./models/post');

// each of the following array will be Iterated and Created
const businessData = [
    {
    name: "Donovan's Dumpster Collection(DDC) Co.",
    password: "OscarThaGod",
    email: "careers@Donovans-Dumpster-Collection.com",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    profilePicture: "https://imgur.com/gallery/B5FcIac",
    phoneNumber: "(555)555-5555",
    location: "Ankara,Turkey",
    website: "Donovan's-Dumpster-Collection(DDC).com",
    linkdin: "www.linkedin.com/in/Donovan's-Dumpster-Collection(DDC).com",
    faceBook: "www.facebook.com/Donovans-Dumpster-Collection",
    instagram: "https://www.instagram.com/Donovans-Dumpster-Collection/",
    twitter: "https://twitter.com/Donovans-Dumpster-Collection",
    rating: 5,
},
{
    name: "Nic's Necktie Shop",
    password: "bowboy2",
    email: "careers@NicsNecktieShop.net",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    profilePicture: "https://imgur.com/gallery/YMOQ2",
    phoneNumber: "(777)777-7777",
    location: "Carmel,Indiana",
    website: "www.NicsNecktieShop.net",
    linkdin: "www.linkedin.com/in/NicsNecktieShop.com",
    faceBook: "www.facebook.com/NicsNecktieShop",
    instagram: "https://www.instagram.com/NicsNecktieShop/",
    twitter: "https://twitter.com/NicsNecktieShop",
    rating: 4,
},
{
    name: "George's Gas and Oil Service",
    password: "gasemup402",
    email: "careers@GGOS.biz",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    profilePicture: "https://imgur.com/gallery/BBmP3e5",
    phoneNumber: "(999)999-9999",
    location: "Dallas,Texas",
    website: "www.GeorgesGasandOilService.biz",
    linkdin: "www.linkedin.com/in/GeorgesGasandOilService.com",
    faceBook: "www.facebook.com/GeorgesGasandOilService",
    instagram: "https://www.instagram.com/GeorgesGasandOilService/",
    twitter: "https://twitter.com/GeorgesGasandOilService",
    rating: 4,
},
];

const employeeData =[
    {
        name: "Donovan Triplett",
        password: "c0dg0d",
        email: "dtriplett@yahoo.com",
        profilePicture: "https://imgur.com/gallery/U3O2Qf7",
        phoneNumber: "(123)456-7890",
        location: "Indanapolis,Indiana",
        linkdin: "www.linkedin.com/in/donovan-triplett.com",
        faceBook: "www.facebook/dtriplett.com",
        instagram: "https://www.instagram.com/donovantriplett/",
        twitter: "https://twitter.com/donovantriplett",
        skills: null,
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        rating: 5,
    },
    {
        name: "Donovan Triplett35",
        password: "c0dg0d",
        email: "dtriplett35@yahoo.com",
        profilePicture: "https://imgur.com/gallery/U3O2Qf7",
        phoneNumber: "(123)456-7890",
        location: "Indanapolis,Indiana",
        linkdin: "www.linkedin.com/in/donovan-triplett.com",
        faceBook: "www.facebook/dtriplett.com",
        instagram: "https://www.instagram.com/donovantriplett/",
        twitter: "https://twitter.com/donovantriplett",
        skills: null,
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        rating: 5,
    },    {
        name: "Donovan Triplett36",
        password: "c0dg0d",
        email: "dtriplett36@yahoo.com",
        profilePicture: "https://imgur.com/gallery/U3O2Qf7",
        phoneNumber: "(123)456-7890",
        location: "Indanapolis,Indiana",
        linkdin: "www.linkedin.com/in/donovan-triplett.com",
        faceBook: "www.facebook/dtriplett.com",
        instagram: "https://www.instagram.com/donovantriplett/",
        twitter: "https://twitter.com/donovantriplett",
        skills: null,
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        rating: 5,
    },    {
        name: "Donovan Triplett37",
        password: "c0dg0d",
        email: "dtriplett37@yahoo.com",
        profilePicture: "https://imgur.com/gallery/U3O2Qf7",
        phoneNumber: "(123)456-7890",
        location: "Indanapolis,Indiana",
        linkdin: "www.linkedin.com/in/donovan-triplett.com",
        faceBook: "www.facebook/dtriplett.com",
        instagram: "https://www.instagram.com/donovantriplett/",
        twitter: "https://twitter.com/donovantriplett",
        skills: null,
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        rating: 5,
    },


    ];

const postData = [
    {
        jobTitle: "Test Title1",
        location: "Indy",
        payRange: "$1,500",
        jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
        jobTitle: "Test Title2",
        location: "Indy",
        payRange: "$1,500",
        jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
        jobTitle: "Test Title3",
        location: "Indy",
        payRange: "$1,500",
        jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
        jobTitle: "Test Title4",
        location: "Indy",
        payRange: "$1,500",
        jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare turpis id porttitor imperdiet. Morbi at gravida leo. Duis ultricies, arcu id tempus pharetra, dolor quam ultrices nisl, ornare bibendum augue arcu molestie erat. Sed vel nulla et turpis commodo dapibus. Aliquam rhoncus nulla eros, at consequat magna volutpat in. Suspendisse potenti. Integer sed lobortis erat, in dapibus orci. Maecenas varius sit amet mauris quis condimentum. Nunc pretium felis id malesuada porta. Pellentesque sed tempus urna, ut finibus leo. Sed eget finibus ante, id vulputate mi. Morbi a est pellentesque, fringilla dolor et, pellentesque lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },

];

      // We will go through the Models one by one and create an instance
// for each element in the array. Look below for a commented out version of how to do this in one slick nested Promise.

// Sync and restart db before seeding
db.sync() //{ force: true }
.then(() => {
})
// here, we go through all the models one by one, create each
// element from the seed arrays above, and log how many are created
.then(() => {
  return Promise.map(businessData, function (business) {
    return Business.create(business);
  })
})
.then(createdBusinesses => {
  console.log(`${createdBusinesses.length} Businesses created`);
})
.then(() => {
  return Promise.map(employeeData, employee => Employee.create(employee))
})
.then(createdEmployees => {
  console.log(`${createdEmployees.length} Employees created`);
})
.then(() => {
  return Promise.map(postData, post => Post.create(post))
})
.then(createdPost => {
  console.log(`${createdPost.length} post's created`);
})
.then(() => {
  console.log('Seeded successfully');
})
.catch(err => {
  console.error('Error!', err, err.stack);
})
.finally(() => {
  db.close();
  console.log('Finished!');
  return null;
});
