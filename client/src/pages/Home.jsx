import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../redux/MovieSlice";
import { Spin, Card, Flex } from "antd";
import '../styles/component-styles.css';

function Home(){
    const {movies, isLoading, errorMsg} = useSelector(store => store.movies);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllMovies());
    }, []);        


    return(
        <>
            <div className="home-container">
                <Spin
                    spinning={isLoading}
                    size="large"
                />
                {movies.length > 0 && (
                    <>
                        <h2 style={{marginBottom:"20px"}}>Movies in Coimbatore</h2>
                        <Flex wrap gap="large">
                            { movies.map(movie => (
                                <Card
                                    hoverable
                                    className="movie-card"
                                    cover={<img alt="movie poster" src={movie.poster} height="290"/>}
                                >
                                    <Card.Meta title={movie.title} description={movie.language} />
                                </Card>
                            )) }
                        </Flex>  
                    </>
                )}
                {movies.length == 0}
                {errorMsg && (<p>Error loading movies!</p>)}
            </div>
        </>
    );
}

export default Home;