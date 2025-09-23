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
 *
 * ** TODO NOW! **
 * Quickview images (currently only displays placeholders)
 * ------------------------------------------------
 * ** BUGS **
 * ------------------------------------------------
 * ** THINGS TO FIX **
 * Give uniqueImage a small time to load so it doesn't stutter so much
 * ** make explore item text smaller (possibly h4 or h5)
 *
 *
 * Seperate all fetch-logic. Make them into functions and remove the handling of it from the main-components
 *
 * On Gallery: Category-sidebar: underline is sometimes uneven in height
 *
 * Website need to be able to scale for mobile & bigger screens (currently most components do not scale well)
 * Website need to scale well for bigger screens as well. Currently, some images & texts scale very strangely with big screens
 * ------------------------------------------------
 * ** ADD TO COMPONENTS **
 * ------------------------------------------------
 * ** NEW COMPONENTS **
 * Create an instagram section - this should be a spinning wheel that simply has images from ellies instagram-page, and when clicked, takes you to ellies instagram
 * Create a 'new-in' component, which is a stand-alone component. Not related to prints/paintings sections. It simply displays something with a nice animation. (this should seperate prints & paintings)
 *
 *
 * Intro page (while website loads)
 * Error page (if page not found)
 * Contact us Page
 * Payment method page
 *
 * ------------------------------------------------
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
