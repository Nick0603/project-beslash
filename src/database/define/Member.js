const Member = function(dbConn, Sequelize) {
    return dbConn.define('member', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        level: {
            type     : Sequelize.ENUM,
            allowNull: false,
            values: ['體驗會員', '尊榮會員'],
            defaultValue: '體驗會員',
            get      : function() {
                return this.getDataValue('level');
            }
        },
        shop_code: {
            type     : Sequelize.STRING,
            allowNull: false,
            unique: 'compositeIndex',
            get      : function() {
                return this.getDataValue('shop_code');
            }
        },
        serial_number: {
            type     : Sequelize.STRING,
            allowNull: false,
            unique: 'compositeIndex',
            get      : function() {
                return this.getDataValue('serial_number');
            }
        },
        name: {
            type     : Sequelize.STRING,
            allowNull: false,
            get      : function() {
                return this.getDataValue('name');
            }
        },
        gender: {
            type     : Sequelize.ENUM,
            allowNull: true,
            values: ['M', 'F'],
            get      : function() {
                return this.getDataValue('gender');
            }
        },
        birth: {
            type     : Sequelize.DATEONLY,
            allowNull: true,
            get      : function() {
                return this.getDataValue('birth');
            }
        },
        address: {
            type     : Sequelize.STRING,
            allowNull: true,
            get      : function() {
                return this.getDataValue('address');
            }
        },
        phone: {
            type     : Sequelize.STRING,
            allowNull: false,
            get      : function() {
                return this.getDataValue('phone');
            }
        },
        expiry: {
            type     : Sequelize.DATEONLY,
            allowNull: true,
            get      : function() {
                return this.getDataValue('expiry');
            }
        },
        email: {
            type     : Sequelize.STRING,
            allowNull: true,
            get      : function() {
                return this.getDataValue('email');
            }
        },
        remark: {
            type     : Sequelize.STRING,
            allowNull: true,
            get      : function() {
                return this.getDataValue('remark');
            }
        }
    },
    {
        tableName: 'member',
        paranoid: true,
        underscored: true,
        createdAt: false,
        setterMethods: {
            createInfo: function(obj){
                this.setDataValue('level', obj.level);
                this.setDataValue('shop_code', obj.shop_code);
                this.setDataValue('serial_number', obj.serial_number);
                this.setDataValue('name', obj.name);
                this.setDataValue('phone', obj.phone);
            }
        }
    });
}

module.exports = Member;