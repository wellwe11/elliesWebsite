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

/** TODO LIST
 * Currently, navbar can be hovered and the extended portion will be displayed,
 * without actually hovering a button. Needs to be fixed
 *
 * Somewhere, Object.keys(obj) is causing an error, trying to convert null/undefined to keys
 * -- Error: 'Uncaught (in promise) TypeError: Cannot convert undefined or null to object'
 *
 * Implement a button on uniqueImage page to help user navigate down to the details-page
 *
 * Services-buttons need to be fixed. Currently, you can hover outside of text and all things except underline text is interactive
 */

/*** RULES FOR PROJECT
 ** UI/UIComponents
 * Each MAIN-COMPONENT (Example: BODY is main-component) contains a set of sub-components, which are sections.
 * Each main-component has all imported information. That information is then passed down to children as props
 * Each sub-component then contains the 'main-information' which is passed down to then. Each sub-component is then split, where each child-component handles their own logic such as Object.keys/values, mapping, etc.
 *
 ** ABSTRACT/COMPONENTS
 * Contains NO LOGIC OR INFORMATION.
 * Each component is a single, styled component. No mapping, no props which are related to UI/UIComponents. Only one document containing it's own, isolated logic.
 * Exceptions to styling is allowed. I.e., a button, which can have prop "color". This allows you to control color to match different backgrounds, etc.
 *
 * Add an image for each type-section (prints, paintings) which will display one example with some nice text on the right and an animation with icons
 */
