

 interface User {
    id: string;
    name: string;
    email: string;
    // Add other user properties as needed
}


export interface authState {
    // Define your auth state properties here
    user : User | null
    isAuthenticated: boolean;
    userToken: string | null;
    isLoadindg: boolean;
    error: Error | null;

}


export const initialState : authState = {
    // Initialize your auth state properties here
    user: null,
    isAuthenticated: false,
    userToken: null,
    isLoadindg: false,
    error: null,
};

export type authActions =
     // Authentication actions
   { type: "SET_LOADING"; loading: boolean }
  | { type: "IOS_LOGIN"; user: User; token: string }
  | { type: "ANDROID_LOGIN"; user: User; token: string }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; user: User }
  | { type: "UPDATE_USER"; user: Partial<User> }
  | { type: "SET_ERROR"; error: string }
  | { type: "CLEAR_ERROR" }
  // Token management
  | { type: "SET_TOKEN"; token: string }
  | { type: "REFRESH_TOKEN"; token: string } |
  { type: "EXPIRE_TOKEN" };
    // Define your auth action properties here





export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        // Define your auth-related actions here 
        default:
            return state;
    }
};
