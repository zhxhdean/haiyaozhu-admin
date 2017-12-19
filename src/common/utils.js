// 判断对象是否json
function isJSON(obj) {
  return typeof obj === 'object' && Object
    .prototype
    .toString
    .call(obj)
    .toLowerCase() === '[object object]' && !obj.length
}
// 允许上传格式
const ALLOW_UPLOAD = ['image/jpg', 'image/jpeg', 'image/png']
// 允许上传文件格式
function allowUploadFile(filetype) {
  return filetype && ALLOW_UPLOAD.includes(filetype)
}

export default {
  isJSON,
  allowUploadFile
}
