const Role = function(dbConn, Sequelize){
    return dbConn.define('role', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        type:  {
            type:   Sequelize.ENUM,
            allowNull: false,
            unique   : true,
            values: ['管理者', '非管理者', '擁有者'],
            get      : function()  {
                return this.getDataValue('type');
            }
        }
    },
    {
        tableName: 'role',
        underscored: true,
        createdAt: false
    });
}

module.exports = Role;