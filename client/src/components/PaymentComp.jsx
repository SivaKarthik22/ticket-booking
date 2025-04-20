import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from "../services/bookingServices";
import { Button, Form, Spin } from "antd";
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import LoadingComp from "./LoadingComp";

function PaymentComp({amount, messageApi}){
    const [stripePromise, setstripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const publishableKey = "pk_test_51RCO1oRuKC394fyClXoIHv46ABABJ9wk0NWxbftrMO0zY0gpkK4x6ST2FAuS0TeD1mRcU6HNA8WCw3By5lVDTzHx00zr3ALjdo";

    useEffect(()=>{
        setstripePromise(loadStripe(publishableKey));
    }, []);
    useEffect(()=>{
        async function initialisePaymentIntent(){
            const responseData = await createPaymentIntent(amount);
            setClientSecret(responseData.data.clientSecret);
            setPaymentId(responseData.data.paymentId);
        }
        initialisePaymentIntent();
    }, []);

    return(
        <>
            {(stripePromise && clientSecret) ? 
                <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm messageApi={messageApi}/>
                </Elements>
                :
                <LoadingComp/>
            }
        </>
    );
}

export default PaymentComp;



function CheckoutForm({messageApi}){
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    async function handleSubmit(){
        if(!stripe || !elements)
            return;
        setIsProcessing(true);
        const {error} = await stripe.confirmPayment({
            elements,
            redirect:"if_required",
        });
        setIsProcessing(false);
        if(error){
            messageApi.open({
                type: 'error',
                content: error.message,
            });
            return;
        }
        messageApi.open({
            type: 'success',
            content: 'Payment Success',
        });
    }

    return(
        <Spin size="large" spinning={isProcessing}>
            <Form
                onFinish={handleSubmit}
            >
                <PaymentElement/>
                <Button type="primary" htmlType="submit" disabled={isProcessing} style={{marginTop:"20px"}} className="button3 bold width-full">
                    { isProcessing ? "Processing..." : `Pay Now`}
                </Button>
            </Form>
        </Spin>
    );
}