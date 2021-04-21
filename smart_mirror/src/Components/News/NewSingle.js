import React from 'react';

const styles = {
    news: {
        color: 'white',
        fontSize: '2.8em',
        alignContent: 'center',
        alignItems: 'center'
    },
    image: {

    }
}
const NewSingle = ({item}) => (
    <div className={"card"}>
        <div className={"card-image"}>
            <h5 style={styles.news}>{item.title}</h5>
            <img className={"card-img-top"} src={item.urlToImage} alt={item.title} style={{
                height: 400,
                width: 600,
                resizeMode: 'center'
            }}/>
            <span class={"card-title"}>{item.source.name}</span>
        </div>

    </div>
);

export default NewSingle;

