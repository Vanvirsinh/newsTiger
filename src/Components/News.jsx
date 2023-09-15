import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

class News extends Component {

    static defaultProps = {
        pageSize: 9,
        query: "Business"
    }

    static propTypes = {
        pageSize: PropTypes.number,
        query: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/everything?q=${this.props.query}&apiKey=9391f4e22a2c48ebbf5edc910b4de3e7&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    handlePreviousPost = async () => {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/everything?q=${this.props.query}&apiKey=9391f4e22a2c48ebbf5edc910b4de3e7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles });
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        })
    }

    handleNextPost = async () => {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/everything?q=${this.props.query}&apiKey=9391f4e22a2c48ebbf5edc910b4de3e7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles });
        this.setState({
            articles: parsedData.articles,
            page: this.state.page + 1,
            loading: false
        })

    }

    render() {
        return (
            <>
                {this.state.loading && <Spinner />}
                {!this.state.loading && <div className='bg-[#fcfcfc] pt-10'>
                    <h1 className='w-3/4 mx-auto font-rubik-medium text-3xl text-[#444444]'>NEWS TIGER - Top Headlines </h1>
                    <div className='grid grid-cols-3 gap-10 w-3/4 mx-auto py-10'>
                        {this.state.articles.map((article) => (
                            <NewsItem key={article.url} title={article.title} description={article.description} thumbnail={article.urlToImage} newsUrl={article.url} />
                        ))}
                    </div>
                    <div className='w-3/4 mx-auto flex justify-between my-20'>
                        <button disabled={this.state.page <= 1} className={`custom-link-button ${this.state.page <= 1 ? "disabled:opacity-30 disabled:cursor-not-allowed hover:disabled:bg-[#00d1cd]" : ""}`} onClick={this.handlePreviousPost}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className={`custom-link-button ${this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) ? "disabled:opacity-30 disabled:cursor-not-allowed hover:disabled:bg-[#00d1cd]" : ""}`} onClick={this.handleNextPost}>Next &rarr;</button>
                    </div>
                </div>}
            </>
        );
    }
}

export default News;
