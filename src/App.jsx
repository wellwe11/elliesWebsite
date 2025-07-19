import classes from "./App.module.scss";
import Body from "./UI/UIComponents/BODY/body";
import Footer from "./UI/UIComponents/FOOTER/footer";
import Navbar from "./UI/UIComponents/NAVBAR/navbar";
import ScreenContainer from "./abstract/components/WIDTHCONTAINER/SCREENCONTAINER";

const AppWrapper = ({ children }) => {
  return <div className={classes.appWrapper}>{children}</div>;
};

function App() {
  return (
    <AppWrapper>
      <ScreenContainer>
        <Body />
      </ScreenContainer>
    </AppWrapper>
  );
}

export default App;
