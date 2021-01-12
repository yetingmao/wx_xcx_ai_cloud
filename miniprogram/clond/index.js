async function clond_uploadFile(opt){
  const { imgUrl,model}=opt;
  const tempArr=imgUrl.split(".");
  const type=tempArr[tempArr.length-1]
  const cloudPath=`${model}/${new Date().getTime()}.${type}`
  return await  wx.cloud.uploadFile({
    cloudPath, // 上传至云端的路径
    filePath: imgUrl, // 小程序临时文件路径
  })
}
async function clond_getTempFileURL(opt){
  const { fileList }=opt;
  return await wx.cloud.getTempFileURL({
    fileList
  })
}
module.exports = {
  clond_uploadFile,
  clond_getTempFileURL
}
