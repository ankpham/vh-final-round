const SetChoiceAtBottom = (arrOfChoices, choiceToBeAtBottom) => {

    let newArr = [,,];

    for (let i = 0;i < arrOfChoices.length;i++) {
        if (arrOfChoices[i] !== choiceToBeAtBottom) {
            newArr[0] = arrOfChoices[i];
            arrOfChoices.splice(i,1)
            break;
        }
    }

    for (let i = 0;i < arrOfChoices.length;i++) {
        if (arrOfChoices[i] !== choiceToBeAtBottom) {
            newArr[1] = arrOfChoices[i];
            arrOfChoices.splice(i,1)
            break;
        }
    }

    for (let i = 0;i < arrOfChoices.length;i++) {
        if (arrOfChoices[i] === choiceToBeAtBottom) {
            newArr[2] = arrOfChoices[i];
        }
    }

    return newArr;
}

export {SetChoiceAtBottom}