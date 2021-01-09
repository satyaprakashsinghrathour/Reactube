import { Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingCard from '../components/LoadingCard';
import ResultCard from '../components/ResultCard';

function Trending(props) {

    const { trending } = props;
    const [ trendingVids, setTrending ] = useState([]);

    const getTrending = () => {
        axios.get('https://invidious.kavin.rocks/api/v1/trending/')  
        .then((res) => {
            console.log(res.data)
            setTrending(res.data);
        })
    }

    useEffect(() => {
        if(trending === true && trendingVids.length === 0)
            getTrending();
        if(trending === false )
            setTrending([]);
    });

    return(
        <div>
            <Row justify='center' >
                {  trendingVids.length !== 0 ? trendingVids.map( video => {
                    return(
                        <ResultCard details={video} />
                    )
                }) : [...Array(12)].map( i => {
                    if(trending)
                        return(
                            <LoadingCard count={12} />
                        )
                    else
                        return(<div/>)
                } )
            }
            </Row>
        </div>
    )     
}

export default Trending;