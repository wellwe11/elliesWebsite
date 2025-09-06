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
 * TODO NOW!
 * CLEAN CSS FILES FROM CLASSES WHICH DONT BELONG THERE (HAVE BEEN MOVED)
 * Fix uniqueImage-page so that it takes information from params!
 * Change products so it uses a route-system to change filters. Essentially, change inline-pages
 *
 * ** BUGS **
 * sectionSeperationImage is currently buggy - snaps to a position when entering the screen. Does not smoothly transition in
 *
 * Home-page, quick-view buttons do not scale with the websites site; remove the quick-view scaling on gallery-page and make it scale simply on the initial file: quickViewButton
 *
 * Something fishy is going on with the link - When you go to a category, and you want to click 'back' with your browser, it doesnt work
 *
 * When switching between pages, (except navigating to uniqueImagePage) uniqueImageContext needs to reset. Currently it doesnt, because of this, the quickView window is open when switching pages.
 *
 * Remove scroll from white-background on which is up when quickView window is open
 *
 *
 * ** ADD TO COMPONENTS **
 * Implement a button on uniqueImage page to help user navigate down to the details-page
 * Implement a add to cart on uniqueImage page
 *
 * navBar icon-animation (the blue/white circle) resets when you click it. Either, remove this, or add a spin-animation (360 spin) to click.
 *
 * * On hover: display quickview & change image for product
 *
 * on click: take to product-page
 *
 * remake whiteButtonCenterText to a quickViewImage, which has a quickViewButton. Then you can map that specific component in wheelOfManyImages for example, or use it as a single component for Gallery
 *
 * ** NEW COMPONENTS **
 * Create an instagram section - this should be a spinning wheel that simply has images from ellies instagram-page, and when clicked, takes you to ellies instagram
 * Create a 'new-in' component, which is a stand-alone component. Not related to prints/paintings sections. It simply displays something with a nice animation. (this should seperate prints & paintings)
 * Contact us section above footer
 *
 * Shopping-cart page
 * -- shopping-cart sidebar
 *
 * Loading page (if data not loaded)
 * Error page (if page not found)
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
