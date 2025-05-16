(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/store/auth/auth.slice.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "login": (()=>login),
    "loginFailure": (()=>loginFailure),
    "loginSuccess": (()=>loginSuccess),
    "logout": (()=>logout),
    "logoutFailure": (()=>logoutFailure),
    "logoutSuccess": (()=>logoutSuccess),
    "refreshToken": (()=>refreshToken),
    "refreshTokenFailure": (()=>refreshTokenFailure),
    "refreshTokenSuccess": (()=>refreshTokenSuccess),
    "register": (()=>register),
    "registerFailure": (()=>registerFailure),
    "registerSuccess": (()=>registerSuccess),
    "resetRegistration": (()=>resetRegistration),
    "setUser": (()=>setUser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
// Function to get initial state from localStorage
const getInitialState = ()=>{
    // Check if window exists (for server-side rendering)
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const userString = localStorage.getItem("user");
            if (token && userString) {
                const user = JSON.parse(userString);
                return {
                    user,
                    token,
                    refreshToken,
                    loading: false,
                    error: null,
                    registrationSuccess: false
                };
            }
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
        }
    }
    // Default initial state if no user found in localStorage
    return {
        user: null,
        token: null,
        refreshToken: null,
        loading: false,
        error: null,
        registrationSuccess: false
    };
};
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "auth",
    initialState: getInitialState(),
    reducers: {
        // Login actions
        login: (state, _)=>{
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action)=>{
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.error = null;
        },
        loginFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        // Register actions
        register: (state, _)=>{
            state.loading = true;
            state.error = null;
            state.registrationSuccess = false;
        },
        registerSuccess: (state, _)=>{
            state.loading = false;
            state.error = null;
            state.registrationSuccess = true;
        // Don't set user and token on registration success
        },
        registerFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.registrationSuccess = false;
        },
        // Logout actions
        logout: (state)=>{
            state.loading = true;
            state.error = null;
        },
        logoutSuccess: (state)=>{
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.error = null;
            state.registrationSuccess = false;
            state.loading = false;
            // Also clear localStorage and sessionStorage
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
            }
        },
        logoutFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        // Refresh token actions
        refreshToken: (state)=>{
            state.loading = true;
            state.error = null;
        },
        refreshTokenSuccess: (state, action)=>{
            state.loading = false;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.error = null;
        },
        refreshTokenFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        // Other actions
        setUser: (state, action)=>{
            state.user = action.payload;
        },
        resetRegistration: (state)=>{
            state.registrationSuccess = false;
        }
    }
});
const { login, loginSuccess, loginFailure, register, registerSuccess, registerFailure, logout, logoutSuccess, logoutFailure, refreshToken, refreshTokenSuccess, refreshTokenFailure, setUser, resetRegistration } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/store/slices/drawerSlice.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// store/slices/drawerSlice.ts
__turbopack_context__.s({
    "closeDrawer": (()=>closeDrawer),
    "default": (()=>__TURBOPACK__default__export__),
    "drawerSlice": (()=>drawerSlice),
    "openDrawer": (()=>openDrawer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    isOpen: false,
    title: "",
    contentType: "",
    contentProps: {},
    content: null,
    size: "md",
    isOverlayClose: true
};
const drawerSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "drawer",
    initialState,
    reducers: {
        openDrawer: (state, action)=>{
            state.isOpen = true;
            state.title = action.payload.title;
            state.contentType = action.payload.contentType || "";
            state.contentProps = action.payload.contentProps || {};
            state.content = action.payload.content || null;
            state.size = action.payload.size || "md";
            state.isOverlayClose = action.payload.isOverlayClose !== undefined ? action.payload.isOverlayClose : true;
        },
        closeDrawer: (state)=>{
            state.isOpen = false;
            state.contentType = "";
            state.contentProps = {};
            state.content = null;
        }
    }
});
const { openDrawer, closeDrawer } = drawerSlice.actions;
const __TURBOPACK__default__export__ = drawerSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/api/axios.config.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth/auth.slice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/store.ts [app-client] (ecmascript)");
;
;
;
// Update the API_URL to include /api if not present
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";
console.log("API URL:", API_URL); // Debug log
// Ensure API_URL is properly formed
const normalizedUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
console.log("Normalized API URL:", normalizedUrl);
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: normalizedUrl,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 15000
});
// Request interceptor
axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Making request to:", `${config.baseURL}${config.url}`, {
        method: config.method?.toUpperCase(),
        headers: config.headers,
        data: config.data ? "Data present" : "No data"
    });
    return config;
}, (error)=>{
    console.error("Request interceptor error:", error);
    return Promise.reject({
        message: "Failed to set up the request",
        status: 500,
        data: error
    });
});
// Response interceptor
axiosInstance.interceptors.response.use((response)=>{
    console.log("Response received:", {
        status: response.status,
        url: response.config.url,
        dataSize: response.data ? JSON.stringify(response.data).length : 0
    });
    return response;
}, async (error)=>{
    console.error("Response error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        data: error.response?.data || "No response data"
    });
    // If there's no error object, return a generic error
    if (!error) {
        return Promise.reject({
            message: "An unknown error occurred",
            status: 500
        });
    }
    const originalRequest = error.config;
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
        // Try to refresh the token only once
        if (originalRequest) {
            originalRequest._retry = true;
            try {
                // Try to get a new token
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    // No refresh token available, proceed with logout
                    handleLogout();
                    return Promise.reject({
                        message: "Session expired. Please login again.",
                        status: 401
                    });
                }
                // Call refresh token endpoint
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${API_URL}/auth/refresh-token`, {
                    refreshToken
                });
                // Update tokens
                const { token, refreshToken: newRefreshToken } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", newRefreshToken);
                // Update Authorization header
                originalRequest.headers.Authorization = `Bearer ${token}`;
                // Retry the original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                // Refresh token failed, proceed with logout
                handleLogout();
                return Promise.reject({
                    message: "Session expired. Please login again.",
                    status: 401
                });
            }
        }
        // If originalRequest is undefined (shouldn't happen normally)
        handleLogout();
        return Promise.reject({
            message: "Session expired. Please login again.",
            status: 401
        });
    }
    // If we have a response from the server
    if (error.response) {
        // Extract more detailed error information
        const serverError = error.response.data;
        console.error("Detailed API error:", {
            status: error.response.status,
            statusText: error.response.statusText,
            data: serverError,
            url: error.config?.url,
            method: error.config?.method
        });
        // Add special handling for 500 errors
        if (error.response.status === 500) {
            console.error("SERVER ERROR 500! Request details:", {
                url: `${error.config?.baseURL}${error.config?.url}`,
                method: error.config?.method?.toUpperCase(),
                headers: error.config?.headers,
                data: error.config?.data ? JSON.parse(String(error.config.data)) : null,
                params: error.config?.params
            });
            if (serverError && typeof serverError === "object" && "stack" in serverError) {
                console.error("Server stack trace:", serverError.stack);
            }
        }
        // Format a more user-friendly error message
        let errorMessage = "Server error";
        if (typeof serverError === "string") {
            errorMessage = serverError;
        } else if (serverError && typeof serverError === "object") {
            // Try to extract error message from various common API error formats
            errorMessage = serverError.message || serverError.error || serverError.errors?.[0]?.message || serverError.detail || error.message || "Unknown server error";
        }
        const customError = {
            message: errorMessage,
            status: error.response.status,
            data: serverError
        };
        return Promise.reject(customError);
    }
    // If the request was made but no response was received
    if (error.request) {
        const customError = {
            message: "No response from server. Please check if the server is running.",
            status: 503,
            data: {
                originalError: error.message
            }
        };
        console.error("Network error details:", customError);
        return Promise.reject(customError);
    }
    // Something happened in setting up the request
    const customError = {
        message: error.message || "Failed to make the request",
        status: 500,
        data: {
            originalError: error.toJSON()
        }
    };
    console.error("Request setup error details:", customError);
    return Promise.reject(customError);
});
// Helper function to handle logout
function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    // Also dispatch a logout action to update Redux state
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"]) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"].dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshTokenFailure"])("Session expired"));
    }
    // Redirect to login page
    window.location.href = "/auth/login";
}
const __TURBOPACK__default__export__ = axiosInstance;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/api/auth.service.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthService": (()=>AuthService),
    "authService": (()=>authService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$axios$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/axios.config.ts [app-client] (ecmascript)");
;
class AuthService {
    static async login(credentials) {
        try {
            console.log("Login request initiated for:", credentials.email);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$axios$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("auth/login", credentials);
            // Check if response includes a user with inactive status
            if (response.data?.user?.status === false) {
                console.warn("Login attempt by inactive user:", credentials.email);
            // We'll let the saga handle this, but we won't store the tokens
            } else {
                // Store tokens and user data in localStorage only for active users
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("refreshToken", response.data.refreshToken);
                    localStorage.setItem("user", JSON.stringify({
                        ...response.data.user,
                        // Ensure status is included
                        status: response.data.user.status ?? true
                    }));
                }
            }
            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
    static async register(credentials) {
        try {
            console.log("Register request initiated for:", credentials.email);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$axios$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("auth/register", credentials);
            return response.data;
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        }
    }
    static async refreshToken(refreshToken) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$axios$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("auth/refresh-token", {
                refreshToken
            });
            // Update tokens in localStorage
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("refreshToken", response.data.refreshToken);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async logout() {
        try {
            // For JWT, we just need to clear the local storage
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            sessionStorage.clear();
        // Optional: Call a server-side logout endpoint if needed
        // await axiosInstance.post("/auth/logout");
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    }
    static async getCurrentUser() {
        try {
            // For JWT, we can get the user from localStorage
            const userJson = localStorage.getItem("user");
            if (!userJson) {
                throw new Error("User not found in local storage");
            }
            const user = JSON.parse(userJson);
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            if (!token || !refreshToken) {
                throw new Error("Authentication tokens not found");
            }
            return {
                user,
                token,
                refreshToken,
                success: true,
                message: "User retrieved from local storage"
            };
        } catch (error) {
            console.error("Get current user error:", error);
            throw error;
        }
    }
    static async changePassword(data) {
        try {
            console.log("Change password request initiated");
            // Get the token from localStorage
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Authentication required. Please log in again.");
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$axios$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("auth/change-password", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Password changed successfully");
            return response.data;
        } catch (error) {
            console.error("Change password error:", error);
            throw error;
        }
    }
}
const authService = new AuthService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/store/auth/auth.saga.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "authSaga": (()=>authSaga)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$saga$2f$dist$2f$redux$2d$saga$2d$effects$2d$npm$2d$proxy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__O__as__call$3e$__ = __turbopack_context__.i("[project]/node_modules/@redux-saga/core/dist/io-22ea0cf9.js [app-client] (ecmascript) <export O as call>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__ = __turbopack_context__.i("[project]/node_modules/@redux-saga/core/dist/io-22ea0cf9.js [app-client] (ecmascript) <export Z as put>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$redux$2d$saga$2d$effects$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth/auth.slice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
;
;
;
;
function* loginSaga(action) {
    try {
        console.log("Processing login request in saga...");
        const response = yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__O__as__call$3e$__["call"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthService"].login, action.payload);
        console.log("Login successful, checking user status...");
        // Check if user is inactive before updating the store
        if (response.user && response.user.status === false) {
            console.log("Login attempt by inactive user");
            yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginFailure"])("Account is inactive. Please contact the administrator to activate your account."));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Account is inactive. Please contact the administrator to activate your account.");
            return; // Exit early - don't update store with inactive user's data
        }
        console.log("User is active, updating store...");
        // Add status property to user object to match User type if not present
        yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginSuccess"])({
            user: {
                ...response.user,
                status: response.user.status ?? true
            },
            token: response.token,
            refreshToken: response.refreshToken
        }));
        console.log("Redux store updated with login success");
        // Using window.location.href for a full page reload which can help with state reset issues
        window.location.href = "/dashboard";
    } catch (error) {
        console.error("Login saga error:", error);
        // Cast to our custom error type or use a safe fallback
        const apiError = error;
        // Check specifically for inactive user error or other specific errors
        if (apiError.message && apiError.message.includes("User is inactive")) {
            console.log("Login attempt by inactive user");
            yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginFailure"])("Account is inactive. Please contact the administrator to activate your account."));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Account is inactive. Please contact the administrator to activate your account.");
        } else {
            yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginFailure"])(apiError.message || "Login failed"));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(apiError.message || "Login failed");
        }
    }
}
function* registerSaga(action) {
    try {
        console.log("Processing registration request...");
        const response = yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__O__as__call$3e$__["call"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthService"].register, action.payload);
        // Do not store authentication data after registration
        // User should log in explicitly
        console.log("Registration successful");
        // Add status property to user object to match User type
        yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerSuccess"])({
            user: {
                ...response.user,
                status: true
            },
            token: response.token,
            refreshToken: response.refreshToken
        }));
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Registration successful! Please login.");
        // Redirect to login page after successful registration
        window.location.href = "/auth/login";
    } catch (error) {
        console.error("Registration saga error:", error);
        const apiError = error;
        yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerFailure"])(apiError.message || "Registration failed"));
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(apiError.message || "Registration failed");
    }
}
function* logoutSaga() {
    try {
        console.log("Processing logout in saga...");
        // Call service to clear localStorage
        yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__O__as__call$3e$__["call"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthService"].logout);
        console.log("Local storage cleared");
        yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutSuccess"])());
        console.log("Logout success action dispatched");
        // Redirect to login page after logout
        window.location.href = "/auth/login";
    } catch (error) {
        console.error("Logout saga error:", error);
        const apiError = error;
        yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutFailure"])(apiError.message || "Logout failed"));
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(apiError.message || "Logout failed");
        // Even if the API call fails, we still want to log the user out locally
        yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutSuccess"])());
        window.location.href = "/auth/login";
    }
}
function* refreshTokenSaga() {
    try {
        const currentRefreshToken = localStorage.getItem("refreshToken");
        if (!currentRefreshToken) {
            throw new Error("No refresh token available");
        }
        const response = yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__O__as__call$3e$__["call"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthService"].refreshToken, currentRefreshToken);
        yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshTokenSuccess"])(response));
    } catch (error) {
        const apiError = error;
        yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshTokenFailure"])(apiError.message || "Token refresh failed"));
        // If refresh token fails, log the user out
        yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Z__as__put$3e$__["put"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logout"])());
    }
}
function* authSaga() {
    yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$redux$2d$saga$2d$effects$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["takeLatest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["login"].type, loginSaga);
    yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$redux$2d$saga$2d$effects$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["takeLatest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["register"].type, registerSaga);
    yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$redux$2d$saga$2d$effects$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["takeLatest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logout"].type, logoutSaga);
    yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$redux$2d$saga$2d$effects$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["takeLatest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshToken"].type, refreshTokenSaga);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/store/sagas/index.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// store/sagas/index.ts
__turbopack_context__.s({
    "default": (()=>rootSaga)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$saga$2f$dist$2f$redux$2d$saga$2d$effects$2d$npm$2d$proxy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$$__as__all$3e$__ = __turbopack_context__.i("[project]/node_modules/@redux-saga/core/dist/io-22ea0cf9.js [app-client] (ecmascript) <export $ as all>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__M__as__fork$3e$__ = __turbopack_context__.i("[project]/node_modules/@redux-saga/core/dist/io-22ea0cf9.js [app-client] (ecmascript) <export M as fork>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$saga$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth/auth.saga.ts [app-client] (ecmascript)");
;
;
// Example watcher saga
function* watchDrawerSaga() {
// You can put drawer-related saga logic here, e.g., logging, analytics, async actions
// yield takeEvery('drawer/openDrawer', yourWorkerSaga);
}
function* rootSaga() {
    yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$$__as__all$3e$__["all"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__M__as__fork$3e$__["fork"])(watchDrawerSaga),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__M__as__fork$3e$__["fork"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$saga$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authSaga"])
    ]);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/store/store.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "store": (()=>store)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$saga$2f$dist$2f$redux$2d$saga$2d$core$2d$npm$2d$proxy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$saga$2f$dist$2f$redux$2d$saga$2d$core$2d$npm$2d$proxy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$saga$2f$dist$2f$redux$2d$saga$2d$effects$2d$npm$2d$proxy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$$__as__all$3e$__ = __turbopack_context__.i("[project]/node_modules/@redux-saga/core/dist/io-22ea0cf9.js [app-client] (ecmascript) <export $ as all>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth/auth.slice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$drawerSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/drawerSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$saga$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth/auth.saga.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$sagas$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/sagas/index.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
const sagaMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$saga$2f$dist$2f$redux$2d$saga$2d$core$2d$npm$2d$proxy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])();
function* combinedSaga() {
    yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$io$2d$22ea0cf9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$$__as__all$3e$__["all"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$saga$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authSaga"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$sagas$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])()
    ]);
}
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2f$auth$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        drawer: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$drawerSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            thunk: true,
            serializableCheck: {
                // Ignore the non-serializable values in drawer state
                ignoredActions: [
                    "drawer/openDrawer"
                ],
                ignoredPaths: [
                    "drawer.contentProps.onSuccess",
                    "drawer.content"
                ]
            }
        }).concat(sagaMiddleware)
});
sagaMiddleware.run(combinedSaga);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/providers/Providers.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Providers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/store.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/providers/Providers.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_d04416dc._.js.map