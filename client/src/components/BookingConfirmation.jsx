import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import ErrorComp from "./ErrorComp";
import { getBooking } from "../services/bookingServices";
import LoadingComp from "./LoadingComp";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Card, Flex } from "antd";

function BookingConfirmation(){
    const {bookingId} = useParams();
    const [ticket, setTicket] = useState(null);
    const [ticketLoading, setTicketLoading] = useState(false);
    const [ticketError, setTicketError] = useState(null);
    const {user, userLoading} = useSelector(store => store.user);

    useEffect(()=>{
        if(user){
            async function initialiseTicket(){
                setTicketLoading(true);
                const responseData = await getBooking(bookingId);
                setTicketLoading(false);
                if(responseData.success){
                    setTicket(responseData.data);
                    setTicketError(null);
                }
                else{
                    setTicketError(responseData.message);
                }
            }
            initialiseTicket();
        }
    },[user]);

    if(userLoading || ticketLoading) return <LoadingComp/>;
    if(!user) return <PageNotFound/>;    
    if(ticketError) return <ErrorComp/>
    return(
        <Flex vertical gap="large" align="center">
            <Flex vertical gap="small" align="center">
                <CheckCircleTwoTone twoToneColor="#f8447a" style={{fontSize:"60px"}}/>
                <p className="bold" style={{fontSize:"20px"}}>Tickets Booked Successfully!</p>
            </Flex>
            <Card></Card>
        </Flex>
    );
}

export default BookingConfirmation;