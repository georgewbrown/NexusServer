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
    const Business = sequelize.import('./models/business');
    const Post = sequelize.import('./models/post');
    
    Business.hasMany(Post)
    
    Post.belongsTo(Business)
    

    module.exports = sequelize;
