import "../helpers/array";

class ErrorResolver {
    static resolveError = (responseData) => {
        if (!responseData || !responseData.error) {
            return [];
        }

        let result = [];

        if (responseData.error.isArray() && responseData.error.length > 0) {
            for (let k in responseData.error) {
                if (responseData.error.hasOwnProperty(k)) {
                    result.push(responseData.error[k]);
                }
            }
        } else {
            result = [responseData.error];
        }

        return result;
    };
}

export default ErrorResolver;