import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../redux/MovieSlice";
import { Card, Flex } from "antd";
import '../styles/component-styles.css';

function Home(){
    const {movies, isLoading, errorMsg} = useSelector(store => store.movies);
    const dispatch = useDispatch();

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
                {!isLoading && errorMsg && <p>Error loading movies! Please try again later</p>}
                {!isLoading && !errorMsg && movies.length == 0 && <p>No Movies at this location</p>}
                {!isLoading && movies.length > 0 && (
                    <>  
                        { movies.map(movie => (
                            <Card
                                hoverable
                                className="movie-card"
                                cover={<img alt="movie poster" src={movie.poster} height="290"/>}
                                key={movie._id}
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