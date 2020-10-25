function regexEmail (str) {
    const re = /^\S+@\S +\.\S + $/
    return str.match(re)
}

export {
    regexEmail
}