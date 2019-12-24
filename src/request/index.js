import axios from 'axios'
import React from 'react'

let instance = axios.create({
    baseURL: 'http://localhost:8080'
})
instance.interceptors.response.use(res=>{
    return res.data
},err=>{
    return err
})

React.Component.prototype.$axios = instance