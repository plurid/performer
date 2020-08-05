import {
    AppState,
} from '../store';



const getLoading = (state: AppState) => state.view.loading;



const selectors = {
    getLoading,
};


export default selectors;
