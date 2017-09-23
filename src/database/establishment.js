import express from 'express'
import path from 'path'
import colors from 'colors'
import Promise from "bluebird"
import Sequelize from 'sequelize'

let dbConn
let Account
let Role
let TableFlow
let Tradecode
let BasicService
let Member
let SaleRecord

const configMap = {
	hint: {
		dbConnect: 'table has been created.',
	},
}

const isDatabaseRebuild = () => process.env.DB_isRebuild === 'true'

const getDefineModel = () =>({
	'Account': Account,
	'Role': Role,
	'TableFlow': TableFlow,
	'Tradecode': Tradecode,
	'BasicService': BasicService,
	'Member': Member,
	'SaleRecord': SaleRecord
})

const setdbConnection = () => {
	dbConn = new Sequelize(
		process.env.DB_name, process.env.DB_user, process.env.DB_password,
		{
			host: 'localhost',
			dialect: 'postgres',
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			}
			, logging: false
			, timezone: '+08:00'
		}
	)
}

const tableDefine = () => {
	Account= require('./define/Account.js')(dbConn, Sequelize)
	Role= require('./define/Role.js')(dbConn, Sequelize)
	TableFlow= require('./define/TableFlow.js')(dbConn, Sequelize)
	Tradecode= require('./define/Tradecode.js')(dbConn, Sequelize)
	BasicService= require('./define/BasicService.js')(dbConn, Sequelize)
	Member= require('./define/Member.js')(dbConn, Sequelize)
	SaleRecord= require('./define/SaleRecord.js')(dbConn, Sequelize)
}

const setAssociation = () => {
	Role.hasMany(Account)
	Account.belongsTo(Role)

	Tradecode.hasOne(BasicService)
	BasicService.belongsTo(Tradecode)

	SaleRecord.belongsTo(Tradecode)
	Tradecode.hasMany(SaleRecord)

	SaleRecord.belongsTo(Account)
	Account.hasMany(SaleRecord)
}

const initialData = () => dbConn.transaction()
	.then((t) =>
		Role.bulkCreate(
			[
				{ type: '擁有者' },
				{ type: '管理者' },
				{ type: '非管理者' }
			],
			{transaction: t}
		)
			.then(() => {
				return Account.create(
					{
						setProfile: {
							name: '樂桌遊管理帳號',
							email: 'admin@loveboardgame.com.tw',
							phone: '0225282765'
						},
						role_id: 1
					},
					{transaction: t}
				)
			})
			.then(() => t.commit())
			.catch((err) => {
				console.warn(colors.red(err))
				return t.rollback()
			})
	)


const createTable = () => new Promise((resolve, reject) => {
	 return dbConn.sync({force: isDatabaseRebuild()})
		.then(async () => {
			if (isDatabaseRebuild()){ await initialData() }
			return resolve()
		})
})


const connect = () => new Promise((resolve, reject) => {
	try {
		setdbConnection()

		tableDefine()
		setAssociation()

		return createTable()
			.then(() => resolve())
	} catch (errMsg) {
		reject(errMsg)
	}
})

const getSequelize = () => dbConn

module.exports = {
	connect: connect,
	getSequelize: getSequelize,
	getDefineModel: getDefineModel
}