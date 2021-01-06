export function sleep(sec: number) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(0);
        }, sec * 1000);
    });
}

export function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}