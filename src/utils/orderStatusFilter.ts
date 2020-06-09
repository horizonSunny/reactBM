function statusFilter(status) {
  let textInfo;
  switch (status) {
    case '00':
      textInfo = '待支付';
      break;
    case '10':
      textInfo = '待接诊';
      break;
    case '20':
      textInfo = '问诊中';
      break;
    case '90':
      textInfo = '支付超时关单';
      break;
    case '91':
      textInfo = '支付超时关单';
      break;
    case '92':
      textInfo = '用户取消关单';
      break;
    case '93':
      textInfo = '医生取消关单';
      break;
    case '99':
      textInfo = '问诊结束关单';
      break;
    default:
      break;
  }
  return textInfo;
}

export { statusFilter };
