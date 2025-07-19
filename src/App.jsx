import classes from "./App.module.scss";

import ScreenContainer from "./UI/UIComponents/screenContainer/SCREENCONTAINER";

const AppWrapper = ({ children }) => {
  return <div className={classes.appWrapper}>{children}</div>;
};

function App() {
  return (
    <AppWrapper>
      <ScreenContainer />
    </AppWrapper>
  );
}

export default App;
