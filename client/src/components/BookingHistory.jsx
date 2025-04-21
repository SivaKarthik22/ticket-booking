import AccessDeny from "./AccessDeny";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import LoadingComp from "./LoadingComp";
import { getAllBookings } from "../services/bookingServices";
import { Card, Flex } from "antd";
import moment from "moment";

function BookingHistory(){
    const {user, userLoading} = useSelector(store=> store.user);
    const [tickets, setTickets] = useState(null);
    const [ticketsLoading, setTicketsLoading] = useState(false);
    const [ticketsError, setTicketsError] = useState(null);

    useEffect(()=>{
        if(user){
            async function initialiseTickets(){
                setTicketsLoading(true);
                const responseData = await getAllBookings();
                setTicketsLoading(false);
                if(responseData.success){
                    setTickets(responseData.data);
                    setTicketsError(null);
                }
                else{
                    setTicketsError(responseData.message);
                }
            }
            initialiseTickets();
        }
    },[user]);

    if(userLoading || ticketsLoading) return <LoadingComp/>;    
    if(!user) return <AccessDeny/> ;
    if(ticketsError) return <ErrorComp/>
    
    return(
        <>
            {tickets && 
                <Flex vertical gap="middle">
                    <h2>Booking History</h2>
                    {tickets.map(ticket => <Card key={ticket._id} className="booking">
                        <Flex gap="large">
                            <img src={ticket.show.movie.poster} height={200} style={{flex:0.1}}/>
                            <div style={{flex:0.45}}>
                                <h2>{ticket.show.movie.title}</h2>
                                <p className="light" style={{marginBottom:"20px"}}>{ticket.show.movie.language}</p>
                                <h3>{moment(ticket.show.date).format("DD MMM, YYYY")} | {moment(ticket.show.time, "HH:mm").format("hh:mm A")}</h3>
                                <p>{ticket.show.theatre.name}</p>
                                <p className="light" style={{fontSize:"12px", marginBottom:"25px"}}>{ticket.show.theatre.address}</p>
                                <p className="bold">
                                    {ticket.seats.length} Tickets : {" "}
                                    {ticket.seats.map((seat, index) => <span key={seat}>
                                        {seat}{index < ticket.seats.length-1 ? ", " : ""}
                                    </span>)}
                                </p>
                            </div>
                            <div style={{flex:0.45}}>
                                <h3>Total Price: Rs.{ticket.seats.length * ticket.show.ticketPrice}</h3>
                                <p>Price breakup: {ticket.seats.length} * {ticket.show.ticketPrice} = Rs. {ticket.seats.length * ticket.show.ticketPrice}</p>
                                <p>Transaction ID: {ticket.transactionId}</p>
                                <p>Payment method: Card</p>
                            </div>
                        </Flex>
                    </Card>)}
                </Flex>
            }
        </>
    );
}

export default BookingHistory;