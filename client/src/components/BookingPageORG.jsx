import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComp from "./LoadingComp";
import { Button, Card, Col, Flex, Row, message, Spin } from "antd";
import { getShow } from "../services/showServices";
import ErrorComp from "./ErrorComp";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import { bookShow, makePayment } from "../services/bookingServices";

function BookingPage(){
    const {user, userLoading} = useSelector(store => store.user);
    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [showIsLoading, setShowIsLoading] = useState(false);
    const {showId} = useParams();
    const [showError, setShowError] = useState(null);
    const totalCols = 18;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(()=>{
        async function initilizeShow(){
            setShowIsLoading(true);
            const responseData = await getShow(showId);
            setShowIsLoading(false);
            if(responseData.success){
                setShow(responseData.data);
                setShowError(false);
            }
            else{
                setShow(null);
                setShowError(true);
            }
        }
        if(user){
            initilizeShow();
        }
    },[showId, user]);

    function handleSeatClick(seatNum){
        console.log(seatNum);
        if(selectedSeats.includes(seatNum)){
            const updatedSelection = selectedSeats.filter(seat => seat != seatNum);
            setSelectedSeats(updatedSelection);
        }
        else{
            setSelectedSeats([...selectedSeats, seatNum]);
        }
    }

    function displaySeats(){
        const seatRows = [];
        let seats = [];
        for(let seatNum=1, rowNum=1; seatNum <= show.totalSeats; seatNum++){
            seats.push(
                <Col key={`seat_${seatNum}`}>
                    <Button key={seatNum}
                        className={`seat-btn ${selectedSeats.includes(seatNum) ? "selected-seat" : "available-seat"}`}
                        onClick={()=>{handleSeatClick(seatNum)} }
                        disabled={show.bookedSeats.includes(seatNum)}
                    >
                        {seatNum}
                    </Button>
                </Col>
            );
            if((seatNum % totalCols == 0) || (seatNum == show.totalSeats && seats.length != 0) ){
                rowNum++;
                const seatRow = [...seats];
                seatRows.push(
                    <Row key={`row_${rowNum}`} className="row">{seatRow}</Row>
                );
                seats = [];
            }
        }
        return seatRows;
    }

    async function onToken(token){
        setBookingLoading(true);
        const paymentResponseData = await makePayment(token, selectedSeats.length*show.ticketPrice*100);
        if(paymentResponseData.success){
            messageApi.open({
                type: 'success',
                content: paymentResponseData.message,
            });

            const bookingResponseData = await bookShow({
                show: showId,
                user: user._id,
                seats: selectedSeats,
                transactionId: paymentResponseData.data,
            });

            setBookingLoading(false);

            if(bookingResponseData.success){
                messageApi.open({
                    type: 'success',
                    content: bookingResponseData.message,
                });
                navigate(`/booking-confirmation/${bookingResponseData.data}`);
            }
            else{
                messageApi.open({
                    type: 'error',
                    content: bookingResponseData.message,
                });    
            }
        }
        else{
            setBookingLoading(false);
            messageApi.open({
                type: 'error',
                content: paymentResponseData.message,
            });
        }
    }

    if(userLoading) return <LoadingComp/>;
    if(!user){
        return(
            <div style={{width:"100%", textAlign:"center"}}>
                <p style={{margin:"15px 0", fontSize:"16px"}}>Sign in to continue booking tickets</p>
                <Button type="primary" onClick={()=>{navigate('/register/user')}}>Sign in</Button>
            </div>
        );
    }
    if(showIsLoading) return <LoadingComp/>;
    if(showError) return <ErrorComp/>;

    return(<>
        {show && <>
            {contextHolder}
            <Spin
                spinning={bookingLoading}
                size="large"
                fullscreen
            />
            <Card className="width-full" style={{marginBottom:"40px"}}>
                <p style={{fontSize: "medium"}}>{show.movie.title}</p>
                <p><span className="bold">{show.theatre.name}</span>: {show.theatre.address}</p>
                <p className="bold red">{moment(show.date).format("DD MMM YYYY")}, {moment(show.time, "HH:mm").format("HH:mm A")}</p>
            </Card>
            <Flex align="center" vertical>
                {(show.totalSeats-show.bookedSeats.length < 15) &&                    
                    <div className="small-box">
                        {show.totalSeats-show.bookedSeats.length} seats available
                    </div>
                }
                <div className="price-display" style={{width:`${totalCols*30+(totalCols-1)*5}px`}}>
                    Rs. {show.ticketPrice}
                </div>
                <div className="seat-grid-container">
                    {displaySeats()}
                </div>
                <div className="screen">Screen is this way</div>
                <Flex align="center" gap="large">
                    <div className="available-info info">Available</div>
                    <div className="selected-info info">Selected</div>
                    <div className="sold-info info">Sold</div>
                </Flex>
                {(selectedSeats.length != 0) && 
                    <Card className="width-full" style={{marginTop:"60px", textAlign:"center"}}>
                        <p style={{marginBottom:"15px"}}>{selectedSeats.length} tickets selected</p> 
                        <StripeCheckout
                            amount={selectedSeats.length * show.ticketPrice*100}
                            stripeKey="pk_test_51RCO1oRuKC394fyClXoIHv46ABABJ9wk0NWxbftrMO0zY0gpkK4x6ST2FAuS0TeD1mRcU6HNA8WCw3By5lVDTzHx00zr3ALjdo"
                            token={onToken}
                            email={user.email}
                            name="Pay with Card"
                        >
                            <Button className="pay-btn" type="primary">
                                Pay Rs.{selectedSeats.length * show.ticketPrice}
                            </Button>
                        </StripeCheckout>
                    </Card>
                }
            </Flex>
        </>}
    </>);
}

export default BookingPage;