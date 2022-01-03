class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    let queryCopy = { ...this.queryStr };
    console.log("Filter", queryCopy);
    //remove fields from the queryString
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);
    console.log("removed", queryCopy);
    queryCopy = JSON.stringify(queryCopy);
    queryCopy = queryCopy.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    queryCopy = JSON.parse(queryCopy);
    console.log("query string", queryCopy);

    this.query = this.query.find();
    return this;
  }

  pagination(resPerPage) {
    console.log("pagination", this.queryStr);
    let currentPage = this.queryStr.page || 1;
    let skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}
module.exports = APIFeatures;
