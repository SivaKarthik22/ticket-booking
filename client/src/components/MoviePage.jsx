import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie } from "../services/movieServices";
import { Card, Divider, Flex, Input, Space, Button } from "antd";
import moment from "moment";
import LoadingComp from './LoadingComp';
import ErrorComp from "./ErrorComp";
import { getAllShowsOfMovie } from "../services/showServices";

function MoviePage(){
    const {movieId} = useParams();
    const [movie, setMovie] = useState(null);
    const [movieLoading, setMovieLoading] = useState(false);
    const [movieError, setMovieError] = useState(false);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const navigate = useNavigate();
    const [theatresWithShows, setTheatresWithShows] = useState([]);
    const [showsLoading, setShowsLoading] = useState(false);

    useEffect(()=>{
        async function initilizeMovie(){
            setMovieLoading(true);
            const responseData = await getMovie(movieId);
            setMovieLoading(false);
            if(responseData.success){
                setMovie(responseData.data);
                setMovieError(false);
            }
            else{
                setMovie(null);
                setMovieError(true);
            }
        }
        initilizeMovie();
    },[movieId]);

    useEffect(()=>{
        async function getTheatresAndShows(){
            setShowsLoading(true);
            const responseData = await getAllShowsOfMovie({movie: movieId, date});
            setShowsLoading(false);
            if(responseData.success)
                setTheatresWithShows(responseData.data);
            else
                setTheatresWithShows([]);
        }
        getTheatresAndShows();
    },[movieId, date]);

    function handleDateChange(event){
        const formattedDate = moment(event.target.value).format("YYYY-MM-DD"); 
        setDate(formattedDate);
        //navigate(`/movie/${movieId}?date=${formattedDate}`);
    }

    function seatAvailabilityCheck(showObj){
        const availableSeatPercentage = (showObj.totalSeats - showObj.bookedSeats.length)*100/showObj.totalSeats;
        if(availableSeatPercentage == 0)
            return "sold-out"
        if(availableSeatPercentage > 50)
            return "available"
        return "filling-fast"
    }
    function checkSoldOut(showObj){
        if(showObj.totalSeats - showObj.bookedSeats.length == 0)
            return true;
        return false;
    }

    if(movieLoading) return <LoadingComp/>;
    if(movieError) return <ErrorComp/>;
    if(movie) {
        return(<>
            <Card className="width-full grey-bg">
                <Flex gap="large" align="center">
                    <div className="movie-card image-container">
                        <img alt="movie poster" src={movie.poster} className="image-in-container" />
                    </div>
                    <div>
                        <h1>{movie.title}</h1>
                        <Flex style={{marginTop:"20px"}} gap="large">
                            <Flex gap="small" vertical >
                                <p>
                                    <span className="label">Language: </span>
                                    <span className="bold">{movie.language}</span>
                                </p>
                                <p>
                                    <span className="label">Genre: </span>
                                    <span className="bold">{movie.genre}</span>
                                </p>
                                <p>
                                    <span className="label">Release Date: </span>
                                    <span className="bold">{moment(movie.releaseDate).format("DD MMM, YYYY")}</span>
                                </p>
                                <p>
                                    <span className="label">Duration: </span>
                                    <span className="bold">{movie.duration} mins</span>
                                </p>
                            </Flex>
                            <div style={{maxWidth:"400px", margin:"0 10px"}}>
                                <p className="bold">About The movie:</p>
                                <p>{movie.description}</p>
                            </div>
                        </Flex>
                    </div>
                </Flex>
            </Card>

            <Flex gap="small" align="center" style={{margin:"30px 0"}}>
                <h3>Choose show date: </h3>
                <Input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="date-input"
                ></Input>
            </Flex>

            <Card className="width-full" style={{ borderColor: '#d9d9d9' }}>
                {showsLoading ? <LoadingComp/> : <>
                    {theatresWithShows.length == 0 && <p>Sorry, No Shows available on this date</p>}
                    {theatresWithShows.map((theatreObj, index) => <div key={theatreObj._id}>
                        <Flex gap="large">
                            <Flex vertical gap="middle" style={{flex:"0.3"}}>
                                <h3>{theatreObj.name}</h3>
                                <p style={{fontSize:"12px", maxWidth:"80%"}}>{theatreObj.address}</p>
                            </Flex>
                            <Space wrap style={{flex:"0.7"}} size="middle" align="start">
                                {theatreObj.shows
                                .sort((showObj1, showObj2)=>{
                                    return moment(showObj1.time, "HH:mm") - moment(showObj2.time, "HH:mm");
                                })
                                .map(showObj => (
                                    <Button
                                        className={`show-button ${seatAvailabilityCheck(showObj)}`}
                                        key={showObj._id}
                                        disabled={checkSoldOut(showObj)}
                                        onClick={()=>{ navigate(`/book-show/${showObj._id}`) }}
                                    >
                                        {moment(showObj.time, "HH:mm").format("hh:mm A")}
                                    </Button>
                                ))}
                            </Space>                        
                        </Flex>
                        {(index < theatresWithShows.length-1) && <Divider style={{ borderColor: '#d9d9d9' }}/>}
                    </div>)}
                </>}
            </Card>
        </>);
    }
}

export default MoviePage;