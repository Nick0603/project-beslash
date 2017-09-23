const BasicService = function(dbConn, Sequelize){
    return dbConn.define('basic_service', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:  {
            type     : Sequelize.STRING,
            allowNull: false,
            unique   : true,
            get      : function()  {
                return this.getDataValue('name');
            }
        },
        price:  {
            type     : Sequelize.INTEGER,
            allowNull: false,
            get      : function()  {
                return this.getDataValue('price');
            }
        }
    },
    {
        tableName: 'basic_service',
        underscored: true,
        createdAt: false,
        setterMethods: {
            fullData: function(obj){
                this.setDataValue('name', obj.name);
                this.setDataValue('price', obj.price);
            }
        }
    });
}

module.exports = BasicService;