// context/navigation/navigationReducer.ts

/**
 * Represents the current navigation state stored in context.
 * You can expand this later (navigation history, params, etc.)
 */


/**
 * Define all valid navigation routes used in the app.
 * This ensures type-safe navigation.
 */
export type AppRoutes =
  | "Tabs"
  | "Home"
  | "Settings"
  | "Notifications";

export type NavigationState = {
  currentRoute: string | null; // The name of the currently active route
};

/**
 * Initial navigation state.
 */
export const initialState: NavigationState = {
  currentRoute: null,
};

/**
 * Available actions for navigation reducer.
 * - NAVIGATE: Move to a specific route
 * - GO_BACK: Go to the previous route (optional logic)
 */
export type NavigationAction =
  | { type: "NAVIGATE"; payload: { route: string } }
  | { type: "GO_BACK" };

/**
 * Reducer responsible for updating navigation state.
 * IMPORTANT: This reducer controls only *your own context state*.
 * The actual React Navigation movement is handled in NavigationContext,
 * not in this reducer.
 */
export const navigationReducer = (
  state: NavigationState,
  action: NavigationAction
): NavigationState => {
  switch (action.type) {
    case "NAVIGATE":
      // Store the new route in state so other components can react to it
      return { ...state, currentRoute: action.payload.route };

    case "GO_BACK":
      // You can implement custom goBack logic here later
      // For now, we simply return state unchanged
      return state;

    default:
      return state;
  }
};
