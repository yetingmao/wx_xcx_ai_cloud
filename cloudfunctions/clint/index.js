// 云函数入口文件
const cloud = require('wx-server-sdk')
const AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
const Config = require('./config');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    APP_ID,
    API_KEY,
    SECRET_KEY
  } = Config.AI;
  const client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);
  const {
    image,
    model
  } = event;
  let result;
  try {
    switch (model) {
      case "dongwugugefenxi":
        result = await client.advancedGeneral(image);
        break;
      case "zhiwu":
        result = await client.plantDetect(image);
        break;
      case "shicai":
        result = await client.ingredient(image);
        break;
      default:
        result = await client.advancedGeneral(image);
        break;
    }
  } catch (error) {
    console.log(error);
  }
  return result;
}