export const ERRORS = {
  E_INT_SERVER_ERR: {
    body: {
      code: 'E_INT_SERVER_ERR',
      message: 'Something went wrong! We will look into it.',
      data: {},
    },
    responseCode: 500,
  },
  E_UNAUTHORIZED: {
    body: {
      code: 'E_UNAUTHORIZED',
      message: 'You are unauthorized to access this area',
      data: {},
    },
    responseCode: 401,
  },
  E_INVALID_REQ_DATA: {
    body: {
      code: 'E_INVALID_REQ_DATA',
      message: 'Data you sent is invalid',
      data: {},
    },
    responseCode: 400,
  },
  E_DUPLICATE_RECORD: {
    body: {
      code: 'E_DUPLICATE_RECORD',
      message: 'Record with this data already exists',
      data: {},
    },
    responseCode: 400,
  },
};
