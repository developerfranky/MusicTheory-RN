import { CHOOSE_CATEGORY, CHOOSE_TOPIC,
	TOPIC_CHANGED, OPTION_CHANGED, SUBTOPIC_CHANGED,
	NEW_HIGH_SCORE, CLEAR_NEW_HIGH_SCORE
} from './types';


export const chooseCategory = (category) => {
	return {
		type: CHOOSE_CATEGORY,
		payload: category
	};
};

export const chooseTopic = (topic) => {
    // console.log('inside choose topic');
    // console.log(topic);
	return {
		type: CHOOSE_TOPIC,
		payload: topic
	};
};

export const appendNewHighScore = (topic_id) => {
	return {
		type: NEW_HIGH_SCORE,
		payload: topic_id
	};
};


export const clearHighScore = () => {
	return {
		type: CLEAR_NEW_HIGH_SCORE,
		payload: ''
	};
};

// export const mark_complete = (topic_name, level) => {
// 	return {
// 		type: 'OPTION_COMPLETE',
// 		payload: {topic_name, level }
// 	}
// }	


