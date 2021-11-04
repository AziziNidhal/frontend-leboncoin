const minLengthValidator = (value:string,minLength:number) => {
    return value.trim().length >= minLength 
}

export default minLengthValidator;