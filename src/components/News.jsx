import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7eafd91b89eb4582ad785543fb09061b&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  }

  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)} - Newsly`;
    updateNews();
  },[]);

  // handleNext = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

  // handlePrev = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7eafd91b89eb4582ad785543fb09061b&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();

    setTotalResults(parsedData.totalResults);
    setArticles(articles.concat(parsedData.articles));
    setLoading(false);
  };

  //https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7eafd91b89eb4582ad785543fb09061b&pageSize=${props.pageSize
  
    return (
      <>
        <h2 className="text-center" style={{ margin: "30px", marginTop: "90px" }}>
          Headlines from {capitalizeFirstLetter(props.category)}
        </h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title.slice(0, 20) + "....."}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imgUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://i.ytimg.com/vi/EmcOnogBKkk/maxresdefault.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author ? element.author : "Anonymus"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-evenly my-3">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark mx-3 "
              onClick={this.handlePrev}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / props.pageSize)
              }
              type="button"
              className="btn btn-dark mx-3"
              onClick={this.handleNext}
            >
              Next &rarr;
            </button>
          </div> */}
      </>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
  page: 1
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  page: PropTypes.number
};

export default News;
