const baseURL = 'http://localhost:3001/';

const auth = '/auth';
const users = '/users';
const orders = '/orders';

const urls = {
  auth: {
    register: `${auth}/create-manager`,
    activate: (token: string) => `${auth}/activate/${token}`,
    recoveryToken: (userId: string) => `${auth}/recovery-token/${userId}`,
    recoveryPassword: (token: string) => `${auth}/recovery-password/${token}`,
    login: `${auth}/login`,
    refresh: `${auth}/refresh`,
    logout: `${auth}/sign-out`,
  },
  users: {
    me: `${users}/me`,
    list: users,
    ban: (userId: string) => `${users}/ban/${userId}`,
    unBan: (userId: string) => `${users}/unban/${userId}`,
  },
  orders: {
    list: orders,
    exportToExcel: `${orders}/export-to-excel`,
    statistics: `${orders}/statistic`,
    managerStatistics: (managerId: string) =>
      `${orders}/${managerId}/statistic`,
    byId: (orderId: string) => `${orders}/${orderId}`,
    updateById: (orderId: string) => `${orders}/${orderId}`,
    createGroup: `${orders}/group`,
    addComment: (orderId: string) => `${orders}/${orderId}/comments`,
    getGroups: `${orders}/group`,
    getStatuses: `${orders}/status`,
    getCourseTypes: `${orders}/course-type`,
    getCourseFormats: `${orders}/course-format`,
    getCourses: `${orders}/courses`,
  },
};

export { baseURL, urls };
