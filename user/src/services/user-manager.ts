import _ from 'lodash';
import UserModel from '../models/user';
import cipherManager from './cypher-manager';

enum sortOrder {
  asc = 1,
  dsc = -1,
}
type getUsersQuery = {
  page?: number;
  limit?: number;
  orderBy?: string;
  sortOrder?: sortOrder;
  search?: string;
};
const _DEFAULT_MAX_DOCS_PER_PAGE = 10;
class UserManager {
  async getUsers(query: getUsersQuery) {
    if (!query.orderBy) {
      query.orderBy = 'createdAt';
    }
    if (!query.sortOrder) {
      query.sortOrder = sortOrder.dsc;
    }
    if (!query.limit) {
      query.limit = _DEFAULT_MAX_DOCS_PER_PAGE;
    }
    if (!query.page) {
      query.page = 0;
    }
    if (query.page > 0) {
      query.page = query.page - 1;
    }
    if (!_.isNumber(query.page)) {
      const num = _.toNumber(query.page);
      query.page = _.isNaN(num) ? 0 : num;
    }
    if (!_.isNumber(query.limit)) {
      const num = _.toNumber(query.limit);
      query.limit = _.isNaN(num) ? _DEFAULT_MAX_DOCS_PER_PAGE : num;
    }
    const skip = query.limit * query.page;
    const sort = { [query.orderBy]: query.sortOrder };
    const match: any = {};
    if (query.search) {
      match.hashes = {
        $in: [cipherManager.encrypt(query.search.toLowerCase().trim())],
      };
    }
    const users = await UserModel.find(match)
      .populate('role')
      .sort(sort)
      .skip(skip)
      .limit(query.limit);
    return users;
  }
}

const userManager = new UserManager();
export default userManager;
