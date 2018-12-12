import { START_QUESTIONS, START_DRILL, NEW_QUESTION, 
    ADD_SCORE, 
    ADD_MISTAKE, 
    RESET_SCORE,
    PUSH_USER_ANSWER,
    // TIME_UP,
    // TIMER_START,
    // TIMER_TICK,
    // TIMER_STOP
} from './types';

export const startQuestions = (topic) => {
    return {
        type: START_QUESTIONS,
        payload: topic
    };
};

export const setUpDrill = (topic_id) => {
    return {
        type: START_DRILL,
        payload: topic_id
    };
};

export const startDrill = (topic_id) => {
    // console.log('start drill action');
    return {
        type: START_DRILL,
        payload: topic_id
    };
};

export const newQuestion = () => {
    return {
        type: NEW_QUESTION,
        payload: ''
    };
};

export const addScore = () => {
    return {
        type: ADD_SCORE,
        payload: ''
    };
};

export const addMistake = (note) => {
    console.log('addMistake action: ' + note);
    return {
        type: ADD_MISTAKE,
        payload: note
    };
};

export const resetScore = () => {
    return {
        type: RESET_SCORE,
        payload: ''
    };
};

export const pushUserAnswer = (note) => {
    return {
        type: PUSH_USER_ANSWER,
        payload: note
    };
};

// export const setTimeUp = () => {
//     return {
//         type: TIME_UP,
//         payload: ''
//     };
// };
