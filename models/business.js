module.exports = (sequelize, DataTypes) => {
    const Business = sequelize.define('business', {
    // THIS VALUE CANNOT BE NULL
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    // THIS VALUE CANNOT BE NULL
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [0, 255]
        }
    },
    // THIS VALUE CANNOT BE NULL
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // THIS VALUE CANNOT BE NULL
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
     // THIS VALUE CANNOT BE NULL
    about:{
        type: DataTypes.STRING(1000),
        alowNull: false,
    },
    profilePicture:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    location:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    website:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    linkdin:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    faceBook:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    instagram:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    twitter:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: true,
        validate: {
            min: 1,
            max: 5
            }
        }
    
    });
    Business.associate = models => {
        Business.hasMany(models, {foreignKey: ['post']})
     }
    return Business;
}
