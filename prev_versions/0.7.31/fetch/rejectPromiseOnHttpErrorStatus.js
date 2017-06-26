/**
 * https://github.com/github/fetch
 *
 * The Promise returned from fetch() won't reject on HTTP error status even if the response is a HTTP 404 or 500.
 * Instead, it will resolve normally, and it will only reject on network failure, or if anything prevented the request from completing.
 *
 * But we want our saga's to go in the catch block on all api errors. This method ensures this.
 */
function rejectPromiseOnHttpErrorStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export default rejectPromiseOnHttpErrorStatus;