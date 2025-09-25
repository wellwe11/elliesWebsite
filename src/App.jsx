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
 * ------------------------------------------------
 * ** BUGS **
 * On gallery, current page needs to update after you've gone to next page
 * ButtonWithUnderlineAndText's hover is a bit 'flickery'
 * When user goes back from uniqueImagePage > quickView > Gallery, no data is displayed
 * ------------------------------------------------
 * ** THINGS TO FIX **
 * Website need to be able to scale for mobile & bigger screens (currently most components do not scale well)
 * Website need to scale well for bigger screens as well. Currently, some images & texts scale very strangely with big screens
 * services background-color should be 100% of windows width. Add screenContainers class to the child-element (to preserve dynamic width), and make containers width 100%
 * WheelOfManyImages is bugged atm when too few images (considner making it always be 10 objects)
 * ------------------------------------------------
 * ** ADD TO COMPONENTS **
 * add Links to footer
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
 *
 * ** FUTURE UPDATES **
 * In the future, I will create two main-objects for products.
 * -- Object one: Front-page contains a certain amount of items. This Object will have a minor version of the total-object. This is to render as quickly as possible, and fetch only needed information.
 * -- Object two: The total amount of items. This object will contain ALL information, which will later be fetched for gallery. This fetch will be unique, and only download 9 items at a time, while also downloading all categories.
 * --- All categoties will be downloaded for the side-panel to toggle which category user wnats to view.
 * -- 9 items to display items per page. This saves brandwidth for user.
 * --- Each time user changes page, it will re-fetch the information & update the current products to be displayed.
 * --- Like so, I can clean code which calculates the currently displayed products, because it wont be needed. The front-end UI will only manage all items which come in, while the fetch (eventually will be put into back-end) will contain all viewable items.
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
