export default function queryURLParameter(url) {
  url = url.replace(/\*/g, '&');
  var reg = /([^?&=]+)=([^?&=]+)/g,
    obj = {};

  url.replace(reg, function() {
    obj[arguments[1]] = decodeURI(arguments[2]);
  });

  url = null;

  return obj;
}
