import { RouterProvider } from "react-router-dom";
import { MainRouter } from "./router/mainRouter";
import { Provider } from "react-redux";
import { store } from "./hooks/Store";

export const App = () => {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={MainRouter} />
      </Provider>
    </div>
  );
};
