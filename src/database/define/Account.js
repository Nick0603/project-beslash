const Account = function(dbConn, Sequelize){
    return dbConn.define('account', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:  {
            type     : Sequelize.STRING,
            allowNull: false,
            get      : function()  {
                return this.getDataValue('name');
            }
        },
        password: {
            type     : Sequelize.STRING,
            allowNull: true,
            defaultValue: '0000',
            get      : function()  {
                return this.getDataValue('password');
            }
        },
        email:  {
            type     : Sequelize.STRING,
            allowNull: true,
            unique   : true,
            get      : function()  {
                return this.getDataValue('email');
            }
        },
        phone:  {
            type     : Sequelize.STRING,
            allowNull: true,
            get      : function()  {
                return this.getDataValue('phone');
            }
        }
    },
    {
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['email']
        //     }
        // ],
        tableName: 'account',
        paranoid: true,
        underscored: true,
        createdAt: false,
        // getterMethods:{
        //     info: function(){ return this.getDataValue('token'); }
        // },
        setterMethods: {
            setProfile: function(obj){
                this.setDataValue('name', obj.name);
                this.setDataValue('email', obj.email);
                this.setDataValue('phone', obj.phone);
            }
        }
    });
}

module.exports = Account;