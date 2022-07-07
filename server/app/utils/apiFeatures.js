const { PromiseProvider } = require('mongoose');

class APIFeatures {
  constructor(query, queryObject) {
    this.query = query;
    this.queryObject = queryObject;
  }

  search(query) {
    if (this.queryObject.search) {
      this.query = this.query.find({
        [query]: { $regex: new RegExp(this.queryObject.search) },
      });
    }
    return this;
  }

  filter(date = '-createdAt') {
    const queryObj = { ...this.queryObject };
    const excludeEmpty = Object.keys(queryObj);
    excludeEmpty.forEach((key) => {
      if (queryObj[key] === '') delete queryObj[key];
    });
    const excludedFields = ['sort', 'limit', 'page', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Handle date
    if (queryObj[date]) {
      const dates = new Date(queryObj[date]);
      const date2 = new Date(queryObj[date]);
      queryObj[date] = {};
      queryObj[date].gte = dates;
      const nextDate = new Date(date2.setDate(dates.getDate() + 1));
      queryObj[date].lt = nextDate;
    }
    // 1B.) Advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort(value = '-createdAt') {
    if (this.queryObject.sort) {
      const sortBy = this.queryObject.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else if (this.queryObject.sort === '') {
      this.query = this.query.sort(value);
    } else {
      this.query = this.query.sort(value);
    }
    return this;
  }

  fields() {
    if (this.queryObject.fields) {
      const fields = this.queryObject.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select(`-__v`);
    }
    return this;
  }

  paginate(definedLimit = 10) {
    const page = this.queryObject.page * 1 || 1;
    const limit = this.queryObject.limit * 1 || definedLimit;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
