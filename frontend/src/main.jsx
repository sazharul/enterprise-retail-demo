import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import "./scss/styles.scss";
import {RouterProvider} from "react-router-dom";
import {router} from "./Routes/Routes.jsx";
import LogicProvider from "./providers/LogicProvider.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider.jsx";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store.js";
import {Toaster} from "sonner";
import {PersistGate} from "redux-persist/integration/react";
import {API_URL} from "./config/api";

axios.defaults.baseURL = `${API_URL}/`;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <AuthProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <LogicProvider>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router}/>
                    </QueryClientProvider>
                </LogicProvider>
            </PersistGate>
        </Provider>
        {/* <Toaster /> */}
    </AuthProvider>
    // </React.StrictMode>
);
