import {
  chooseImage
} from "../../utils/index";
import {
  compute
} from "../../api/index"
import Toast from '../../components/toast/toast';
Page({
  data: {
    title: "",
    model: "",
    imgUrl: "",
    result: [],
    overlayShow:false
  },
  //事件处理函数
  onLoad: function (query) {
    const {
      name,
      model,
    } = query;
    this.setData({
      title: name,
      model: model,
    });
  },

  setTakePhoto: function (e) {
    chooseImage((err, data) => {
      if (err) {
        Toast.fail('获取图片失败');
      } else {
        const {
          tempFilePaths
        } = data;
        this.setData({
          imgUrl: tempFilePaths
        })
      }
    })
  },
  startCompute: function () {
    this.setData({
      overlayShow:true
    })
    compute({
      imgUrl: this.data.imgUrl[0],
      model: this.data.model
    }, (err, res) => {
      if (err) {
        Toast.fail('识别失败，请稍后再试');
      } else {
        const {
          result
        } = res;
       this.setData({
        result,
       })
      }
      this.setData({
        overlayShow:false
       })
    })
  }
})