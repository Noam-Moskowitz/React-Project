import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { startSearch } from '../../store/searchSlice';

const SearchBar = ({ bgColor }) => {

    const dispatch = useDispatch()


    return (
        <div className=' flex items-center relative'>
            <TextField
                size='small'
                placeholder='Search...'
                style={{ backgroundColor: bgColor, borderRadius: `5px` }}
                onChange={(e) => dispatch(startSearch(e.target.value))}
            />
            <div className='absolute right-0 t-0'>
                <SearchIcon color='primary' />
            </div>

        </div >
    )
}

export default SearchBar
