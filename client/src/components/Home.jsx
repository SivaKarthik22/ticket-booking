import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../redux/MovieSlice";
import { Card, Flex } from "antd";
import ErrorComp from "./ErrorComp";
import { useNavigate } from 'react-router-dom';

function Home(){
    const {movies, isLoading, errorMsg} = useSelector(store => store.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getAllMovies());
    }, []);        

    return(
        <>
            <h2 style={{marginBottom:"20px"}}>Movies in Coimbatore</h2>
            <Flex wrap gap="large">
                {isLoading && (
                    <>
                        {Array.from({ length: 4 }).map((ele,idx) => (
                            <Card loading={true} className="movie-loading-card" key={idx} />
                        ))}
                    </>
                )}
                {!isLoading && errorMsg && <ErrorComp/>}
                {!isLoading && !errorMsg && movies.length == 0 && <p>No Movies at this location</p>}
                {!isLoading && movies.length > 0 && (
                    <>  
                        { movies.map(movie => (
                            <Card
                                hoverable
                                className="movie-card"
                                cover={<img alt="movie poster" src={movie.poster} height="290"/>}
                                key={movie._id}
                                onClick={()=>{
                                    navigate(`/movie/${movie._id}`);
                                    //navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`);
                                }}
                            >
                                <Card.Meta title={movie.title} description={movie.language} />
                            </Card>
                        )) }  
                    </>
                )}
                
            </Flex> 
        </>
    );
}

export default Home;