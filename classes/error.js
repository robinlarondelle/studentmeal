class ApiError {
    constructor(message, code){
        this.message = message;
        this.code = code;
        this.datetime = new Date().toISOString()
    }
}

module.exports = ApiError;