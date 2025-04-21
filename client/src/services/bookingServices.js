import { bookingAxiosInstance } from ".";

export async function bookShow(bookingDetails){
    try{
        const response = await bookingAxiosInstance.post('/book-show', bookingDetails);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function createPaymentIntent(amount){
    try{
        const response = await bookingAxiosInstance.post('/create-payment-intent', {amount});
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function getAllBookings(){
    try{
        const response = await bookingAxiosInstance.get('/get-all-bookings', {
            headers: {'authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function getBooking(bookingId){
    try{
        const response = await bookingAxiosInstance.get(`/get-booking/${bookingId}`, {
            headers: {'authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}