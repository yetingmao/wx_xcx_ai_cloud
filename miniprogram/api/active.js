import {
  clond_request_upload,
  request
} from "../utils/index";

export function compute(opt,fn){
  clond_request_upload({...opt,url:"/ai"},(res)=>{
    fn(res.error,res.data)
  })
}