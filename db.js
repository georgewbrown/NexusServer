require('dotenv').config();
const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'  
});
sequelize.authenticate().then(
    function(){
        console.log('Connected to nexusdb');
    },
    function(err){
        console.log("Error")
        console.log(err);
    }
    
    );
    module.exports = sequelize;
