const RandomizeChoices = (correctChoice, otherChoice1, otherChoice2) => {

    let arr = [correctChoice,otherChoice1,otherChoice2];

    let i = arr.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return [arr[0], arr[1], arr[2]];
}

export {RandomizeChoices}