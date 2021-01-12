// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    fileID,
    model
  } = event;
  const res = await cloud.downloadFile({
    fileID,
  })
  const image = res.fileContent.toString("base64");
  const funResult = await cloud.callFunction({
    // 要调用的云函数名称
    name: 'clint',
    // 传递给云函数的参数
    data: {
      image,
      model
    }
  })
  return funResult.result;
}