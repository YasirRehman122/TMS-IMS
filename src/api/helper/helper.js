const Helper = {

    /**
     * This fucntion is responsible to check if all the params are present or not
     * @param {*} requiredParams List of all mandatory params
     * @param {*} data The request body that we have received in the signup request
     * @returns Boolean and error
     */
    paramsPresent(requiredParams, data){

        for (let i=0; i < requiredParams.length; i++){
            let val = requiredParams[i]
            if (data[val] === undefined || data[val] === null || data[val] === ''){
                return [false, val];
            }
        }
        return [true, null];

    }

}

module.exports = Helper;