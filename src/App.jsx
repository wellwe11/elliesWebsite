import classes from "./App.module.scss";

import ScreenContainer from "./UI/UIComponents/screenContainer/SCREENCONTAINER";

const AppWrapper = ({ children }) => {
  return <div className={classes.appWrapper}>{children}</div>;
};
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <AppWrapper>
      <Router>
        <ScreenContainer />
      </Router>
    </AppWrapper>
  );
}

export default App;
