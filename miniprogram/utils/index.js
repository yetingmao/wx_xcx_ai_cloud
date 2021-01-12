const formatTime = require('./util.js')
import {chooseImage}from "./camera"
import {upload,request,clond_request_upload }from "./request"





module.exports = {
  formatTime: formatTime,upload,request,chooseImage,clond_request_upload
}