import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppProvider from "./hooks";
import GlobalStyle from "./styles/global";
import RoutePage from "./routes";

const App: React.FC = () => (
  <Router>
    <>
      <AppProvider>
        <RoutePage />
      </AppProvider>

      <GlobalStyle />
    </>
  </Router>
);

export default App;
