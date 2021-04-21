import React, { Component} from "react";
import NewSingle from "./NewSingle";

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        };
    }

    componentDidMount() {
        const url = `https://newsapi.org/v2/everything?q=keyword&apiKey=38d3b4c25cfe47368723781f810fb92f`;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    news: data.articles
                })
            })
            .catch((error) => console.log(error));
    }

    renderItem() {
        return this.state.news.map((item) => (
            <NewSingle key={item.url} item={item}/>
        ));
    }

    render() {
        return (
            <div className={"col-md-4"}>
                {this.renderItem()}
            </div>
        );
    }
}

export default News;
