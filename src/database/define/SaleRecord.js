const SaleRecord = function(dbConn, Sequelize){
    return dbConn.define('sale_record', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type     : Sequelize.INTEGER,
            allowNull: false,
            get      : function()  {
                return this.getDataValue('amount');
            }
        },
        volume:  {
            type     : Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
            get      : function()  {
                return this.getDataValue('volume');
            }
        }
    },
    {
        tableName: 'sale_record',
        paranoid: true,
        underscored: true,
        updatedAt: false
    });
}

module.exports = SaleRecord;