import express from 'express'
import colors from 'colors'
import helmet from 'helmet'
import compression from 'compression'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'

import webpack from './webpack.config.js'
import database from './database/establishment'
import pageController from './router/pageController'
import restAPI from './router/api'

dotenv.config()

const app = express() 

const configMap = {
  hint: {
    dbCrash: 'can not connect to database.',
    viewEngineReady: 'view engine is ready.',
    serverLaunch: 'server has been lanched'
  }
}

// secret
app.use(
  helmet({
    noCache: true
  })
)

database.connect()
  .then(() => {
    // GZIP
    app.use(compression())

    // cookie, session..
    app.use(session({
      name: 'maxapp.sid',
      secret: 'power by liou',  // 用来对session id相关的cookie进行签名
      // store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
      saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
      resave: false,  // 是否每次都重新保存会话，建议false
      cookie: {
        secure: true
      }
    }))

    // view engine setup
    app.set('views', path.join(__dirname, '../views'))
    app.set('view engine', 'jade')
    app.disable('x-powered-by')

    // uncomment after placing your favicon in /public
    app.use(favicon(path.join(__dirname, '../public', 'images', 'favicon.ico')))

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, '../public')))

    // router setting while db has ready.
    app.use('/', pageController)
    app.use('/rest', restAPI)

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      var err = new Error('Not Found')
      err.status = 404
      return next(err)
    })

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(logger('dev'))
      app.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.render('error', {
          message: err.message,
          error: err
        })
      })
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.render('error', {
        message: err.message,
        error: {}
      })
    })

    console.warn(colors.green(configMap.hint.serverLaunch))
  })
module.exports = app
