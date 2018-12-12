// import { PURCHASED_FULL_VERSION } from './types';


export const retryQuiz = (bool) => {
    return {
        type:'RETRY_QUIZ', 
        payload: bool
    };
};

export const countQuiz = () => {
    return {
        type: 'QUIZ_COMPLETED',
        payload: true
    }
}

export const togglePiano = () => {
    return {
        type: 'TOGGLE_PIANO',
        payload: null
    }
}

export const togglePianoNotes = () => {
    return {
        type: 'TOGGLE_PIANO_NOTES',
        payload: null
    }
}

// export const startQuiz = () => {
//     return {
//         type:'IN_QUIZ', 
//         payload: true
//     };
// };


// export const endQuiz = () => {
//     return {
//         type:'END_QUIZ', 
//         payload: true
//     };
// };
