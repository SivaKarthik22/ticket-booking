import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from "../services/bookingServices";
import { Button, Form, Spin } from "antd";
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import LoadingComp from "./LoadingComp";
import ErrorComp from "./ErrorComp";

function PaymentComp({amount, messageApi, bookTickets}){
    const [stripePromise, setstripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const publishableKey = "pk_test_51RCO1oRuKC394fyClXoIHv46ABABJ9wk0NWxbftrMO0zY0gpkK4x6ST2FAuS0TeD1mRcU6HNA8WCw3By5lVDTzHx00zr3ALjdo";

    useEffect(()=>{
        setstripePromise(loadStripe(publishableKey));
    }, []);
    useEffect(()=>{
        async function initialisePaymentIntent(){
            const responseData = await createPaymentIntent(amount);
            if(responseData.success){
                setClientSecret(responseData.data.clientSecret);
                setPaymentId(responseData.data.paymentId);
                setErrorMsg(null);
            }
            else{
                setErrorMsg(responseData.message);
            }
        }
        initialisePaymentIntent();
    }, []);

    if(errorMsg) return <ErrorComp/>;

    return(
        <>
            {(stripePromise && clientSecret) ? 
                <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm
                        messageApi={messageApi}
                        bookTickets={bookTickets}
                        paymentId={paymentId}
                    />
                </Elements>
                :
                <LoadingComp/>
            }
        </>
    );
}

export default PaymentComp;



function CheckoutForm({messageApi, bookTickets, paymentId}){
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    async function handleSubmit(){
        if(!stripe || !elements)
            return;
        setIsProcessing(true);
        const {error} = await stripe.confirmPayment({
            elements,
            return_url: window.location.origin,
            redirect:"if_required",
        });
        setIsProcessing(false);
        if(error){
            messageApi.open({
                type: 'error',
                content: `Error occurred, please try again later. (${error.message})`,
            });
            return;
        }
        messageApi.open({
            type: 'success',
            content: 'Payment Success',
        });
        
        await bookTickets(paymentId);
    }

    return(
        <Spin size="large" spinning={isProcessing} >
            <Form
                onFinish={handleSubmit}
            >
                <PaymentElement/>
                <Button type="primary" htmlType="submit" style={{marginTop:"20px"}} className="button3 bold width-full">
                    { isProcessing ? "Processing..." : `Pay Now`}
                </Button>
            </Form>
        </Spin>
    );
}