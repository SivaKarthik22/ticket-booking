import { useSelector } from "react-redux";

function Home(){
    const {movies} = useSelector(store => store.movies);

    return(
        <>
            <h2>Home Page</h2>
        </>
    );
}

export default Home;