export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
    },

    ADMIN: {
    GET_ALL_USERS: "/api/v1/admin/users",
    GET_STATS: "/api/v1/admin/stats",
    DELETE_USER: (userId) => `/api/v1/admin/users/${userId}`,
    },

    DASHBOARD: {

        GET_DATA: "/api/v1/dashboard", 
    },

    INCOME: {
        ADD_INCOME: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/get",
        DELETE_INCOME: (incomeId) =>   `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_ALL_EXPENSE: "/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE:  `/api/v1/expense/downloadexcel`,
        //IMPORT_CSV: `/api/v1/expense/import-csv`,

    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    },

    IMPORT: {
    IMPORT_CSV: "/api/v1/import/csv",
    },

};