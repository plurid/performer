import {
    AppState,
} from '../store';



const getLoading = (state: AppState) => state.view.loading;
const getIndexGeneralSelector = (state: AppState) => state.view.indexGeneralSelector;
const getIndexGeneralView = (state: AppState) => state.view.indexGeneralView;



const selectors = {
    getLoading,
    getIndexGeneralSelector,
    getIndexGeneralView,
};


export default selectors;
