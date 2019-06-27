import { AxiosError } from 'axios';
import HTTP_STATUS from '../httpStatus';

export default function getErrorStatus(error: AxiosError): number {
    return typeof error.response === 'object'
        ? error.response.status
        : HTTP_STATUS.REQUEST_TIMEOUT;
}
