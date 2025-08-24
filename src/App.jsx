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
 * Add an image for each type-section (prints, paintings) which will display one example with some nice text on the right and an animation with icons
 *
 */

/*** RULES FOR PROJECT
 ** UI/UIComponents
 * Each MAIN-COMPONENT (Example: BODY is main-component) contains a set of sub-components, which are sections.
 * Each main-component has all imported information. That information is then passed down to children as props
 * Each sub-component then contains the 'main-information' which is passed down to then. Each sub-component is then split, where each child-component handles their own logic such as Object.keys/values, mapping, etc.
 * ALL DATA is rendered on top-layer. This is for two reasons:
 ** Fetching outside components
 * If data is wrapped inside of a component: React works like so that it first renders the component with all of it's initial information, then re-renders if anything is updated. If data is fetched inside of component, it will intially run with data set to null/undefined. If we render data outside of component, prior to it being built, and simply pass it as promps, we avoid the intial render where no data is rendered.
 ** One control-panel
 * Having one place where data is managed and 'played' with simplifies the process of creating abstract components which simply takes promps, and localizes data to fewer files. Like so, errors are more isolated and easier to manage. Logic is also seperated, creating a cleaner and more precise working-environment
 *
 ** ABSTRACT/components
 * Contains NO LOGIC OR INFORMATION.
 * Each component is a single, styled component. No mapping, no props which are related to UI/UIComponents. Only one document containing it's own, isolated logic.
 * Exceptions to styling is allowed. I.e., a button, which can have prop "color". This allows you to control color to match different backgrounds, etc.
 *
 ** ABSTRACT/fullyComponents
 * Made to create components which are used on several pages.
 * Must be abstract to a degree where individual sources and styles can be applied.
 * -- May/can contain logic such as mapped arrays.
 * -- May/can contain defined sizes.
 * Does NOT contain section-information such as titles, background-colors or anything which belongs to a wrapper.
 * Must obide to wrappers size and be dynamic to wrap correctly in parent-elements
 */
