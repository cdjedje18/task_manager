module.exports = (sequelize, DataTypes) => {

    const Task = sequelize.define('tasks', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        createdAt: "created_at",
        updatedAt: "updated_at",
    });

    return Task;

}