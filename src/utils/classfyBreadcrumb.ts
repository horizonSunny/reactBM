export default function classfyB(url, parasms) {
  if (parasms) {
    switch (url) {
      case 'commodityAdm/management/edit':
        return '编辑产品';
        break;
      case 'operTool/findCommodity/newCategory':
        return '编辑分类';
        break;
    }
  }
}
