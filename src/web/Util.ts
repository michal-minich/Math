
export function getRandomInt(min: number, max: number): number {
    //Int.assume(min);
    //Int.assume(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}