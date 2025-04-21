import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import ErrorComp from "./ErrorComp";
import { getBooking } from "../services/bookingServices";
import LoadingComp from "./LoadingComp";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Card, Flex } from "antd";
import moment from "moment";

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
                <p className="bold red" style={{fontSize:"20px"}}>Tickets Booked Successfully!</p>
            </Flex>
            {ticket && 
                <Card className="ticket" style={{marginTop:"10px"}}>
                    <Flex gap="large">
                        <img src={ticket.show.movie.poster} height={200}/>
                        <div>
                            <h2>{ticket.show.movie.title}</h2>
                            <p className="light" style={{marginBottom:"20px"}}>{ticket.show.movie.language}</p>
                            <h3>{moment(ticket.show.date).format("DD MMM, YYYY")} | {moment(ticket.show.time, "HH:mm").format("hh:mm A")}</h3>
                            <p>{ticket.show.theatre.name}</p>
                            <p className="light" style={{fontSize:"12px", marginBottom:"20px"}}>{ticket.show.theatre.address}</p>
                            <p className="bold">
                                {ticket.seats.length} Tickets : {" "}
                                {ticket.seats.map((seat, index) => <span key={seat}>
                                    {seat}{index < ticket.seats.length-1 ? ", " : ""}
                                </span>)}
                            </p>
                            <p className="bold">Rs. {ticket.seats.length * ticket.show.ticketPrice}</p>
                        </div>
                    </Flex>
                </Card>
            }
            <Link className="link" style={{marginTop:"30px"}} to="/bookings">Go to Booking History</Link>
        </Flex>
    );
}

export default BookingConfirmation;