const TableFlow = function(dbConn, Sequelize) {
    return dbConn.define('table_flow', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        deskNum: {
            type     : Sequelize.STRING,
            allowNull: false,
            get      : function() {
                return this.getDataValue('deskNum');
            }
        },
        player: {
            type     : Sequelize.INTEGER,
            allowNull: false,
            get      : function() {
                return this.getDataValue('player');
            }
        },
        UUID: {
            type     : Sequelize.STRING,
            allowNull: false,
            get      : function() {
                return this.getDataValue('UUID');
            }
        }
    },
    {
        tableName: 'table_flow',
        underscored: true,
        createdAt: 'entry_at',
        updatedAt: false,
        setterMethods: {
            playerEntry: function(obj){
                this.setDataValue('deskNum', obj.deskNum);
                this.setDataValue('player', obj.player);
                this.setDataValue('UUID', obj.UUID);
            }
        }
    });
}

module.exports = TableFlow;