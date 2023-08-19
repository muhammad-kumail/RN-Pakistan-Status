export interface AppState {
    [x: string]: any;
    bottomNavVisible: boolean;
  }
  
  const initialState: AppState = {
    bottomNavVisible: false, 
  };


  const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_BOTTOM_NAV_VISIBILITY':
        return {
            ...state,
            bottomNavVisible: action.payload
          };
      default:
        return state;
    }
  };
  
  export default appReducer;