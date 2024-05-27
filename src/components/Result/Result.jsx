import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error/Error";





const Result = ({search}) => {
    const {id} = useParams();
    const [result, setResult] = useState([]);

    const [homeworldURL, setHomeworldURL] = useState("a");
    const [homeworld, setHomeworld] = useState("a");
    const [error, setError] = useState("0");
    useEffect( () => {
        const callApi = () => {
            if (homeworldURL !== "a") {
                axios.get(homeworldURL)
                .then(respuesta => {
                    setHomeworld(respuesta.data.name)
                    setError("0")
                })
                .catch(error => setError(error.response.status));
            }
            
        }
        callApi();
    }, [homeworldURL])

    useEffect( () => {
        const apiCall = () => {
            axios.get(`https://swapi.dev/api/${search}/${id}`)
            .then(response => {
                let data = Object.entries(response.data).filter( (value) => {
                    return (value[0] !== "created"&&
                    value[0] !== "edited"&&
                    value[0] !== "url" &&
                    value[0] !== "vehicles" &&
                    value[0] !== "starships" &&
                    value[0] !== "films" &&
                    value[0] !== "species"&&
                    value[0] !== "residents" &&
                    value[0] !== 'characters' &&
                    value[0] !== 'planets' &&
                    value[0] !== 'people'&&
                    value[0] !== 'homeworld'
                );
                })
                Object.entries(response.data).map( (value) => {
                    return ((value[0] === "homeworld") ? setHomeworldURL(value[1])  : "");
                })
                setError("0")
                setResult(data)
            })
            .catch(error => setError(error.response.status));
        }

        apiCall();
    }, [id, search])


    return (
        <div className="result"> 
            {(error !== "0") ? <Error />
            : (Array(result))
                ?  result.map( (item, value) => {
                    return (<div class="resultKey" key={value}> <span className="key">{item[0].replace("name"," ")}
                    </span> {
                        (item[1] === "n/a") ? item[1].replace("n/a", ": desconocido") 
                        : (item[0] === "name" || item[0] === "title") ? <span className="title">{item[1]}</span> : `: ${item[1]}`
                    }</div>);
                })
                : ""
            }
            {(error !== "0") ? "" 
            :(homeworld !== "a") 
                ? <div> <span className="key">Homeworld</span>: {homeworld}</div>
                : ""}
            
        </div>
        );
};

export default Result;