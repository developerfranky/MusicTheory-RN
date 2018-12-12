import { CHOOSE_CATEGORY, CHOOSE_TOPIC, NEW_HIGH_SCORE, CLEAR_NEW_HIGH_SCORE } from '../redux_actions/types';
import { MUSIC_DIR } from '../core_music_logic/types';

const INITIAL_STATE = {
	category: '', 
	topic_dict: '',
	topic_name: '',
	topic_id: '',
	new_high_score: null, // used for when a new high score is set, it is displayed in the scene_topics without having to exit activity.
	topic_is_pro: false, 

};

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case CHOOSE_CATEGORY:

			if (MUSIC_DIR[action.payload].length < 1) {
				return {
					...state, 
					category: '',
					topic_dict: '',
				}
			}
			return {
				...state, 
				category: action.payload,
				topic_dict: MUSIC_DIR[action.payload]
			}

		case CHOOSE_TOPIC: 
			console.log('CHOOSE_TOPIC');
			console.log(action.payload);
			return {
				...state, 
				topic_name: action.payload.text,
				topic_id: action.payload.id,
				topic_is_pro: action.payload.pro_only,
			}
		
		// the following pair is only being used to update the scene_topic. 
		// Using as a trigger to update the star rating when a user gets a new high score.
		case NEW_HIGH_SCORE: 
			console.log('adding new high score');
			console.log(action.payload);
			return {
				...state, 
				new_high_score: action.payload
			}
		case CLEAR_NEW_HIGH_SCORE: 
			console.log('clearing high scores to refresh');
			return {
				...state, 
				new_high_score: null
			}


		default:
			return state;
	}
};
