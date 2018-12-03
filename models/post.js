module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
    jobTitle:{
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payRange:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    skills:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    website:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    about:{
        type: DataTypes.STRING(1000),
        alowNull: false,
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
    return Post;
}
