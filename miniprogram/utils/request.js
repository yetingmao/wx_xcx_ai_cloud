import {
  Config
} from "../config/index";
import {
  clond_uploadFile,
} from "../clond/index";
const {
  BASE_URL
} = Config;

function upload(opt, fn) {
  const {
    url,
    imgUrl,
    model
  } = opt;
  const _ = {};
  wx.uploadFile({
    url: BASE_URL + url, //仅为示例，非真实的接口地址
    filePath: imgUrl,
    name: 'file',
    formData: {
      'model': model
    },
    success: (res) => {
      if(res.statusCode===200){
        if(typeof res.data==="string"){
          _.data = JSON.parse(res.data) ;
        }else{
          _.data = res.data;
        }
      }else{
        console.log("uploadFile fail", res);
        _.error=res;
      }
    },
    fail: (res) => {
      console.log("uploadFile fail", res);
      _.error = res;
    },
    complete: (res) => {
      fn(_)
    }
  })
}
async function clond_request_upload(opt, fn) {
  const {
    imgUrl,
    model
  } = opt;
  const _ = {};
  const uploadFileRes = await clond_uploadFile({
    imgUrl,
    model
  });
  wx.cloud.callFunction({
    // 云函数名称
    name: 'distinguish',
    // 传给云函数的参数
    data: {
      model,
      fileID: uploadFileRes.fileID,
    },
    success: (res) => {
      console.log("uploadFile success", res);
      const data = res.result;
      _.data = data;
    },
    fail: (res) => {
      console.log("uploadFile fail", res);
      _.error = res;
    },
    complete: (res) => {
      fn(_)
    }
  })
}

function request(opt, fn) {}
module.exports = {
  upload,
  request,
  clond_request_upload
}