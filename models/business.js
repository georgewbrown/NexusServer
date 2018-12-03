module.exports = (sequelize, DataTypes) => {
    const Business = sequelize.define('business', {
    name:{
        type: DataTypes.STRING,
        allowNull: true,
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
    about:{
        type: DataTypes.STRING(1000),
        alowNull: true,
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
    return Business;
}
