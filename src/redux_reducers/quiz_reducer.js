import { setStorage } from '../components/utils';

const INITIAL_STATE = {
    retrying_quiz: false, 
    minutes_practiced: 0,
    use_piano: false,
    piano_notes: true,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'RETRY_QUIZ': 
            return {
                ...state, 
                retrying_quiz: action.payload,
            }
        case 'QUIZ_COMPLETED':
            return {
                ...state,
                minutes_practiced: state.minutes_practiced + 1
            }
        case 'TOGGLE_PIANO':
            let use_piano = !state.use_piano;
            setStorage('use_piano', use_piano);

            return {
                ...state,
                use_piano: use_piano,
            }
        case 'TOGGLE_PIANO_NOTES':
            let piano_notes = !state.piano_notes;
            setStorage('piano_notes', piano_notes);

            return {
                ...state,
                piano_notes: piano_notes,
            }

        default:
            return state;
    }
};