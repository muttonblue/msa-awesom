import {combineReducers} from 'redux'
import PlaygroundReducer from './PlaygroundReducer';
import CommonReducer from 'thaisamut/common/reducers/CommonReducer';

export default combineReducers({
    gs:CommonReducer,
    playground:PlaygroundReducer
})
