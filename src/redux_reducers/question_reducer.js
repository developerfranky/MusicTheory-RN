import { 
    START_DRILL, 
    NEW_QUESTION, 
    ADD_MISTAKE,
    RESET_SCORE,
    TIMER_START,
    TIMER_TICK,
    TIMER_STOP,
    PUSH_USER_ANSWER,
    PUSH_USER_MISTAKE,
    // TIME_UP
} from '../redux_actions/types';
import { getIntervalQuestion, parseIntervalID } from '../core_music_logic/IntervalQuestionGenerator';
import { getChordQuestion, getChordObj } from '../core_music_logic/ChordQuestionGenerator';
import { getScaleQuestion } from '../core_music_logic/ScaleQuestionGenerator';
import { getNoteQuestion } from '../core_music_logic/NoteQuestionGenerator';


const INITIAL_STATE = {
    correct_answers: 0,
    mistakes: 0,
    questionGenerator: '',
    category: '',
    topic_id: '',
    question: {question:'', answer: '', reference_code: ''},
    answer_array: [],
    user_answers: [],
    user_mistakes: [],
    waiting: false, 
    // timeup: false,
};


export default (state = INITIAL_STATE, action) => {
    // console.log(action);
    
    switch (action.type) {

        case START_DRILL:
            const category = action.payload.split('_')[0].toLowerCase();

            return { 
                ...state, 
                topic_id: action.payload,
                correct_answers: 0,
                mistakes: 0,
                category: category
            };

        case NEW_QUESTION:
            let q;
            if (state.category == 'intervals') {
                let code = parseIntervalID(state.topic_id);
                q = getIntervalQuestion(code.code, code.note_color);
                while (q.reference_code == state.question.reference_code) {
                    q = getIntervalQuestion(code.code, code.note_color);
                }
                return {
                    ...state,
                    question: q,
                    answer_array: [q.answer], // this [] is the difference between this and below block.
                    user_answers: [],
                    user_mistakes: [],
                    waiting: false,
                }
            }
            if (state.category == 'chords') {
                q = getChordQuestion(state.topic_id);
                while (q.reference_code == state.question.reference_code) {
                    q = getChordQuestion(state.topic_id);
                }
                return {
                    ...state,
                    question: q,
                    answer_array: q.answer,
                    user_answers: [],
                    user_mistakes: [],
                    waiting: false,
                }
            }
            if (state.category == 'scales') {
                q = getScaleQuestion(state.topic_id);
                while (q.reference_code == state.question.reference_code) {
                    q = getScaleQuestion(state.topic_id);
                }
                return {
                    ...state,
                    question: q,
                    answer_array: q.answer,
                    user_answers: [],
                    user_mistakes: [],
                    waiting: false,
                }
            }
            if (state.category == 'notes') {
                q = getNoteQuestion(state.topic_id);
                while (q.reference_code == state.question.reference_code) {
                    q = getNoteQuestion(state.topic_id);
                }
                return {
                    ...state,
                    question: q,
                    answer_array: [q.answer],
                    user_answers: [],
                    user_mistakes: [],
                    waiting: false,
                }
            }

            return state;

        case PUSH_USER_ANSWER:
            let user_attempt = action.payload;
            if (!state.answer_array.includes(user_attempt)) return { ...state }; // wrong answer
            if (state.user_answers.includes(user_attempt)) return {...state }; //already there
            
            return {
                ...state,
                user_answers: state.user_answers.concat(user_attempt),
                correct_answers: state.correct_answers + 1,
            }
        
        case ADD_MISTAKE:
            let mistake = action.payload;
            if (state.user_mistakes.includes(mistake)) return {...state }; //already there
            
            return {
                ...state,
                user_mistakes: state.user_mistakes.concat(mistake),
                mistakes: state.mistakes + 1,
            }

        case RESET_SCORE:
            return {
                ...state,
                correct_answers: 0,
                mistakes: 0,
            }
        case TIMER_TICK:
            return {
                ...state,
                time_left: state.time_left - 1
            }
        default:
            return state;
    }
};
