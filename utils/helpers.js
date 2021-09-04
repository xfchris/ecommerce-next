export function calculateNumItemsPerPage(currentPage, limit) {
  let page = parseInt(currentPage);
  page = page === 1 || !page ? 0 : page * limit - limit;

  return page;
}
