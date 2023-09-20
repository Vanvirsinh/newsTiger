import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

class News extends Component {

    static defaultProps = {
        pageSize: 9,
        query: "Business"
    }

    static propTypes = {
        pageSize: PropTypes.number,
        query: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeStr(this.props.query)} - News Tiger`
    }

    capitalizeStr = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    async updateArticles(pageNo) {
        this.props.setProgress(20)
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/everything?q=${this.props.query}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${pageNo}`;
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateArticles(this.state.page);
    }

    handlePreviousPost = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateArticles(this.state.page - 1)
    }

    handleNextPost = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateArticles(this.state.page + 1);
    }

    fetchData = async () => {
        let url = `https://newsapi.org/v2/everything?q=${this.props.query}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: [...this.state.articles, ...parsedData.articles],
            page: this.state.page + 1,
            totalResults: parsedData.totalResults
        });
    }

    render() {
        return (
            <>
                {/* {this.state.loading && <Spinner />} */}
                <div className='bg-[#fcfcfc] pt-10'>
                    <h1 className='w-3/4 mx-auto font-rubik-medium text-3xl text-[#444444]'>NEWS TIGER - Top {this.capitalizeStr(this.props.query)} Headlines</h1>

                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchData}
                        hasMore={this.state.articles.length !== this.state.totalResults} // Replace with a condition based on your data source
                        loader={<p>Loading...</p>}
                        endMessage={<p>No more data to load.</p>}
                    >
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 w-full md:w-3/4 mx-auto py-10'>
                            {this.state.articles.map((article) => (
                                <NewsItem key={article.url} title={article.title} description={article.description} thumbnail={article.urlToImage} newsUrl={article.url} />
                            ))}
                        </div>
                    </InfiniteScroll>

                    <div className='w-3/4 mx-auto flex justify-between my-20 hidden'>
                        <button disabled={this.state.page <= 1} className={`custom-link-button ${this.state.page <= 1 ? "disabled:opacity-30 disabled:cursor-not-allowed hover:disabled:bg-[#00d1cd]" : ""}`} onClick={this.handlePreviousPost}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className={`custom-link-button ${this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) ? "disabled:opacity-30 disabled:cursor-not-allowed hover:disabled:bg-[#00d1cd]" : ""}`} onClick={this.handleNextPost}>Next &rarr;</button>
                    </div>
                </div>
            </>
        );
    }
}

export default News;
