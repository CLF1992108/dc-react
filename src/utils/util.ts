//获取参数方法
export function urlSearch(key: string) {
  let name, value, obj: Record<string, string> = {};
  let str = location.href; //取得整个地址栏
  let num = str.indexOf("?")
  str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]

  let arr = str.split("&"); //各个参数放到数组里
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      obj[name] = value;
    }
  }
  return obj[key]
}

export function dataURLtoFile(url: string, filename: string) {

  let arr = url.split(','), mimeArr = arr[0].match(/:(.*?);/), mime,
    bstr = atob(arr[1]), i = bstr.length, u8arr = new Uint8Array(i);
  if (mimeArr) {
    mime = mimeArr[1];
  }

  while (i--) {

    u8arr[i] = bstr.charCodeAt(i);

  }

  return new File([u8arr], filename, { type: mime });

}