// Import the react-native-sound module
var Sound = require('react-native-sound');

console.log(Sound);

export const addSounds = (mp3_list) => {
    // Enable playback in silence mode
    Sound.setCategory('Playback');
    let sound_dict = {};
    
    let sounds = mp3_list.map(file_name => {
        let note = file_name.split('.')[0];
        let sound_file = new Sound(file_name, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        });
        sound_dict[note] = sound_file;
    });


    return {
        type:'ADD_SOUNDS', 
        payload: sound_dict,
    };
};


export const setMute = (bool) => {
    return {
        type: 'SET_MUTE',
        payload: bool
    };
};

// export const clearSounds = () => {
//     return {
//         type: 'CLEAR_SOUNDS',
//         payload: null
//     }
// }
