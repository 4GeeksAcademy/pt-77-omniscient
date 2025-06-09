// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"; // Import the reducer and the initial state.
import {
  signup as handleSignup,
  login as handleLogin,
  getUser as handleGetUser,
  getVintageGames,
  getRawgGames,
  getGameDescription,
  getUserById,
  saveGameForLater,
  getSavedGames,
  removeSavedGame,
} from "../Actions";

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext();

// Define a provider component that encapsulates the store and warps it in a context provider to
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
  // Initialize reducer with the initial state.
  const [store, dispatch] = useReducer(storeReducer, initialStore());
  // Provide the store and dispatch method to all child components.
  const actions = {
    signup: (payload) => handleSignup(dispatch, payload),
    login: (payload) => handleLogin(dispatch, payload),
    getUser: (payload) => handleGetUser(dispatch, payload),
    getVintageGames: (payload) => getVintageGames(dispatch, payload),
    getRawgGames: (payload) => getRawgGames(dispatch, payload),
    getGameDescription: (payload) => getGameDescription(dispatch, payload),
    getUserById: (payload) => getUserById(dispatch, payload),
    saveGameForLater: (payload) => saveGameForLater(dispatch, payload),
    getSavedGames: () => getSavedGames(dispatch),
    removeSavedGame: (gameId) => removeSavedGame(dispatch, gameId),
  };

  return (
    <StoreContext.Provider value={{ store, dispatch, ...actions }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
  const {
    dispatch,
    store,
    signup,
    login,
    getUser,
    getVintageGames,
    getRawgGames,
    getGameDescription,
    getUserById,
    saveGameForLater,
    getSavedGames,
    removeSavedGame,
  } = useContext(StoreContext);
  return {
    dispatch,
    store,
    signup,
    login,
    getUser,
    getVintageGames,
    getRawgGames,
    getGameDescription,
    getUserById,
    saveGameForLater,
    getSavedGames,
    removeSavedGame,
  };
}
