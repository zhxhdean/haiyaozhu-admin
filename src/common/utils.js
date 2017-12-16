// 判断对象是否json
function isJSON (obj) {
  return typeof obj === 'object' && Object
    .prototype
    .toString
    .call(obj)
    .toLowerCase() === '[object object]' && !obj.length
}

export default {
  isJSON
}
