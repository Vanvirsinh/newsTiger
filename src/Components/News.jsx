import { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {


    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeStr = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const updateArticles = async (pageNo) => {
        props.setProgress(20)
        let url = `https://newsapi.org/v2/everything?q=${props.query}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${pageNo}`;
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${capitalizeStr(props.query)} - News Tiger`;
        updateArticles(page)
        // eslint-disable-next-line
    }, [])

    const handlePreviousPost = async () => {
        updateArticles(page - 1)
        setPage(page - 1)
    }

    const handleNextPost = async () => {
        updateArticles(page + 1);
        setPage(page + 1)
    }

    const fetchData = async () => {
        let url = `https://newsapi.org/v2/everything?q=${props.query}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(preArticles => [...preArticles, ...parsedData.articles])
        setPage(page => page + 1);
        setTotalResults(parsedData.totalResults);
    }
    return (
        <>
            {/* {loading && <Spinner />} */}
            <div className='bg-[#fcfcfc] pt-40'>
                <h1 className='w-3/4 mx-auto font-rubik-medium text-3xl text-[#444444]'>NEWS TIGER - Top {capitalizeStr(props.query)} Headlines</h1>

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchData}
                    hasMore={articles.length !== totalResults} // Replace with a condition based on your data source
                    loader={<p>Loading...</p>}
                    endMessage={<p>No more data to load.</p>}
                >
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 w-full md:w-3/4 mx-auto py-10'>
                        {articles.map((article) => (
                            <NewsItem key={article.url} title={article.title} description={article.description} thumbnail={article.urlToImage} newsUrl={article.url} />
                        ))}
                    </div>
                </InfiniteScroll>

                <div className='w-3/4 mx-auto flex justify-between my-20 hidden'>
                    <button disabled={page <= 1} className={`custom-link-button ${page <= 1 ? "disabled:opacity-30 disabled:cursor-not-allowed hover:disabled:bg-[#00d1cd]" : ""}`} onClick={handlePreviousPost}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className={`custom-link-button ${page + 1 > Math.ceil(totalResults / props.pageSize) ? "disabled:opacity-30 disabled:cursor-not-allowed hover:disabled:bg-[#00d1cd]" : ""}`} onClick={handleNextPost}>Next &rarr;</button>
                </div>
            </div>
        </>
    );
}


News.defaultProps = {
    pageSize: 9,
    query: "Business"
}

News.propTypes = {
    pageSize: PropTypes.number,
    query: PropTypes.string
}

export default News;
