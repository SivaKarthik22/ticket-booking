import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComp from "./LoadingComp";
import { Button, Card, Col, Flex, Row } from "antd";
import { getShow } from "../services/showServices";
import ErrorComp from "./ErrorComp";
import moment from "moment";

function BookingPage(){
    const {user, userLoading} = useSelector(store => store.user);
    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [showIsLoading, setShowIsLoading] = useState(false);
    const {showId} = useParams();
    const [showError, setShowError] = useState(null);
    const totalCols = 18;
    const [selectedSeats, setSelectedSeats] = useState([]);

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

    function displaySeats(){
        const seatRows = [];
        for(let rowNum=1, seatNum=1; seatNum <= show.totalSeats; rowNum++){
            const seatRow = [];
            for(let colNum=1; colNum <= totalCols; colNum++, seatNum++){
                seatRow.push(
                    <Col key={seatNum}><Button key={`seat_${seatNum}`} className="seat-btn">{seatNum}</Button></Col>
                );
            }
            seatRows.push(
                <Row key={`row_${rowNum}`} className="row">{seatRow}</Row>
            );
        }
        return seatRows;
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
                {(selectedSeats.length != 0) && <>
                    <p style={{margin:"60px 0 15px 0"}}>{selectedSeats.length} tickets selected</p> 
                    <Button className="pay-btn" type="primary">Pay Rs.{selectedSeats.length * show.ticketPrice}</Button>
                </>}
            </Flex>
        </>}
    </>);
}

export default BookingPage;