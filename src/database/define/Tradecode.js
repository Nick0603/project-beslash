const Tradecode = function(dbConn, Sequelize){
    return dbConn.define('tradecode', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tradecode:  {
            type     : Sequelize.STRING(15),
            allowNull: false,
            unique   : true,
            get      : function()  {
                return this.getDataValue('tradecode');
            }
        }
    },
    {
        tableName: 'tradecode',
        underscored: true,
        createdAt: false
    });
}

module.exports = Tradecode;