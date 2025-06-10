
export function random(len: number) {
    let options = "asdfgjklqwertyuiopzcxvn123456789"
    let length = options.length
    let result = ""
    for(let i = 0; i < len; i++) {
        result += options[Math.floor(Math.random() * length)]
    }
    return result;
}