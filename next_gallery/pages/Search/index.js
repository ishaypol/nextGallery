import React, { useState, useCallback } from 'react';
import axios from 'axios';

const Photo = ({ photo_data, source }) => {

        const [loading, setLoading] = useState(false);

        const  photo_url = `https://farm${photo_data.farm}.staticflickr.com/${photo_data.server}` +
            `/${photo_data.id}_${photo_data.secret}.jpg`;

        return (
            <div style={{display:'inLine'}}>
                {loading && <div className="preloader4"/>}
                <img src={photo_url} className="photo" alt={source} onLoad={() => setLoading(false)}
                     style={{display: loading ? 'none' : 'inline' }} height="165" width="165"/>
            </div>
        );
};

const PhotoContainer = ({ photos }) => {
    const [displayNum, setDisplayNum] = useState(10);

        return (
            <div>
                <select  className="dropdown" defaultValue='10' onInput={({ target : { value } }) => setDisplayNum(value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                <div className="Photos">
                    {
                        photos.slice(0,displayNum).map((data) => (
                                <Photo photo_data={data} key={data.id}/>
                            ))
                    }
                </div>
            </div>
        );
    };

const Search = () => {
    const [photos, setPhotos] = useState([]);

    const searchPhotos = useCallback((query) => {
        const api_key = 'b4f935ecf2ae1382defc3b002a7f6b80';
        const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&' +
            'api_key=' + api_key + '&text=' + query + '&format=json&per_page=60' +
            '&nojsoncallback=1&sort=interestingness-desc';

        axios.get(url).then(res => {
            var res_dict = res.data.photos.photo;
            setPhotos(res_dict);
        });
    }, [setPhotos]);

        return (
            <div>
                <SearchField searchPhotos={searchPhotos}/>
                <PhotoContainer photos={photos}/>
            </div>
        );
    }

const SearchField = ({ searchPhotos }) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        searchPhotos(value);
    }

    return (
        <form className="searchbox_1" onSubmit={handleSubmit}>
            <input type="search" className="search_1" onChange={handleChange} placeholder="Search Photos" />
            <button type="submit" className="submit_1" value="search">Go!</button>
        </form>
    );
};


export default Search;
