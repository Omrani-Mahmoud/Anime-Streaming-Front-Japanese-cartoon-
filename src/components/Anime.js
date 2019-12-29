import React from "react";
import {Image, Rating, Card} from 'semantic-ui-react';

function Anime(props){
    return(
    <div id="element" >

        <Card href={`/episodes/${props.anime.id}`} >
        <div className="insideCardI">
        <Image src={props.anime.cover}
                    alt="new" size="medium" className="img" id="imgCover"/>
                
                <div className="CardDesc">
                <Card.Header>{props.anime.title}</Card.Header>
                <Card.Meta>{props.anime.types}</Card.Meta>
                <Rating maxRating={10} disabled icon="star" rating={props.anime.rates} />
                </div>
                </div>
        </Card>

      
    </div>
    )
}

export default Anime;



/*
  <Card href={`/episodes/${props.anime.id}`} >
        <div className="insideCardI">
        <Image src={props.anime.cover}
                    alt="new" size="medium" className="img" id="imgCover"/>
                    </div>
                    <Card.Content>
                <div className="CardDesc">
                <Card.Header>{props.anime.title}</Card.Header>
                <Card.Meta>{props.anime.types}</Card.Meta>
                </div>
            </Card.Content>
            <Card.Content extra>
                <div>
                <Rating maxRating={10} disabled icon="star" rating={props.anime.rates} />
                </div>
             </Card.Content>
             
        </Card>
             */