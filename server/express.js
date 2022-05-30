import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import path from 'path'

import devBundle from './devBundle' //comment out in production

// modules for server-side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../client/theme'
import { StaticRouter } from 'react-router-dom'

// The order of the following is important e.g. bodyParser json has to be declared before using any routes
const CURRENT_WORKING_DIR = process.cwd()
const app = express()
devBundle.compile(app)  //comment out in production

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
// the following may lead to EvalError
// Refused to evaluate a string as JavaScript because 'unsafe-eval' 
// is not an allowed source of script in the following 
// Content Security Policy directive: "script-src 'self'
// Modify defaults based on https://www.npmjs.com/package/helmet
app.use(helmet())
app.use(cors())

app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('*', (req, res) => {
    const sheets = new ServerStyleSheets()
    const context = {}
    const markup = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <ThemeProvider theme={theme}>
                    <MainRouter/>
                </ThemeProvider>
            </StaticRouter>
        )
    )
    if (context.url) {
        return res.redirect(303, context.url)
    }
    const css = sheets.toString()
    res.status(200).send(Template({
        markup: markup,
        css: css
    }))
})


// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": `${err.name}: ${err.message}` })
    } else if (err) {
        res.status(400).json({ "error": `${err.name}: ${err.message}` })
        console.log(err)
    }
})

export default app