
import { useState } from 'react';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import { FcPortraitMode, FcFilmReel, FcBiotech, FcGlobe  } from "react-icons/fc";
import { GiInterceptorShip } from "react-icons/gi";
import { IoCarSportSharp } from "react-icons/io5";
import Select from 'react-select';



const Menu = ({api, setSearch}) => {
    const [localeID, setLocaleID] = useState(-1);
    const navigate = useNavigate();

    const options = [
        { value: 'people', label: <><FcPortraitMode /> People </> },
        { value: 'films', label: <><FcFilmReel /> Films </> },
        { value: 'species', label: <><FcBiotech /> Species </> },
        { value: 'planets', label: <><FcGlobe /> Planets </> },
        { value: 'starships', label: <><GiInterceptorShip /> Starships </> },
        { value: 'vehicles', label: <><IoCarSportSharp /> Vehicles </> },
    ]
    const customStyles = {
        control: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: "20px"
        }),
    };
    const changeHandler = (e) => {
        const {value} = e.target;
        setSearch(value);
    }
    const handleSubmit = (e) => {
        (localeID !== -1)
        ? navigate(`/${localeID}`)
        : navigate(`/1 `)
        e.preventDefault();
    }
    const handleChange = (selectedOption) => {
        changeHandler({ target: { value: selectedOption.value } });
    };
    return (
        <div >
            
            <form onSubmit={handleSubmit} className='menu'>
                <label htmlFor="menu">Search for:</label>
                <Select
                    options={options}
                    styles={customStyles}
                    onChange={handleChange}/>
                <Search setLocaleID={setLocaleID} localeID={localeID}/>
                <button className='button'>Search</button>
            </form>
        </div>
        );
};

export default Menu;