// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Games } from "./pages/Games";
import { RetroGames } from "./pages/Retrogames";
import { Merch } from "./pages/Merch";
import { Checkout } from "./pages/Checkout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { GameDetails } from "./pages/GamesDetail";
import { Profile } from "./pages/Profile";
import { MustLogin } from "./pages/MustLogin";
import { RetroGameDetails } from "./pages/RetroGameDetail";



export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />
        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />
        <Route path="/games" element={<Games />} />
        <Route path="/retrogames" element={<RetroGames />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/game/:slug" element={<GameDetails />} />
        <Route path="/retrogame/:uid" element={<RetroGameDetails />} />
        <Route path="/profile/:theId" element={<Profile />} />
        <Route path="/must-login" element={<MustLogin />} />
      </Route>
    )
);
