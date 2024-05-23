import { createRoot } from "react-dom/client";
// Axios
import { Chart, registerables } from "chart.js";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// Apps
import "./_metronic/assets/fonticon/fonticon.css";
import "./_metronic/assets/keenicons/duotone/style.css";
import "./_metronic/assets/keenicons/outline/style.css";
import "./_metronic/assets/keenicons/solid/style.css";
import "./_metronic/assets/sass/style.react.scss";
import { MetronicI18nProvider } from "./_metronic/i18n/Metronici18n";
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./_metronic/assets/sass/style.scss";
import { AuthProvider, setupAxios } from "./app/modules/auth";
import { AppRoutes } from "./app/routing/AppRoutes";

import { MsalProvider } from "@azure/msal-react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import msalInstance from "./msal-config";
import axios from "axios";

// import "leaflet/dist/leaflet.css";

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
Chart.register(...registerables);

setupAxios(axios, store.dispatch, store);

const queryClient = new QueryClient();
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <MsalProvider instance={msalInstance}>
        <MetronicI18nProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AuthProvider>
                <AppRoutes />
              </AuthProvider>
            </PersistGate>
          </Provider>
        </MetronicI18nProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </MsalProvider>
    </QueryClientProvider>
  );
}
