import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { startSearch, stopSearch } from '../../store/searchSlice';

const SearchBar = ({ bgColor, isSearching, setIsSearching }) => {

    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState()

    const handleChange = (e) => {
        setIsSearching(true)
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        if (!isSearching) {
            setSearchValue(``)
            dispatch(stopSearch());
        }
    }, [isSearching])

    useEffect(() => {
        if (searchValue) {
            dispatch(dispatch(startSearch(searchValue)))
        }
    }, [searchValue])


    return (
        <div className=' flex items-center relative'>
            <TextField
                size='small'
                placeholder='Search...'
                value={searchValue}
                style={{ backgroundColor: bgColor, borderRadius: `5px` }}
                onChange={handleChange}
            />
            <div className='absolute right-0 t-0'>
                <SearchIcon color='primary' />
            </div>

        </div >
    )
}

export default SearchBar
