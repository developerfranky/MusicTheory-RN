import { combineReducers } from 'redux';
import CategoryReducer from './topic_reducer';
import QuestionReducer from './question_reducer';
import PurchaseReducer from './purchase_reducer';
import QuizReducer from './quiz_reducer';
import AdReducer from './ad_reducer';
import SoundReducer from './sound_reducer';
import DimensionReducer from './dimension_reducer';

export default combineReducers({
    category: CategoryReducer,
    question: QuestionReducer,
    purchases: PurchaseReducer,
    quiz: QuizReducer,
    ad: AdReducer,
    sound: SoundReducer,
    dimension: DimensionReducer,
});
