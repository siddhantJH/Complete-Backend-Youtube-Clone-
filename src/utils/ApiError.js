class ApiError extends Error{  //make a standarize error format
    constructor(statusCode,message="Something Went Wrong",errors=[],statck=""){
        super(message) 
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors
        if(statck){
            this.stack=statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}


export {ApiError}