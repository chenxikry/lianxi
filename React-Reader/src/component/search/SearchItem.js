import React, { Component } from 'react';
import '../../style/search/SearchItem.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchItem extends Component {
    handleImageError(ev){
        ev.target.src=require('../../images/error.jpg');
    }
    goToBookIntro(ev){
       ev.preventDefault();
        // console.log('SeachItem',this.context);
        //利用父组件的history对象实现跳转
        this.context.parentHistory.push(`/bookintro/${this.props.content._id}`);
    }
    render(){
        return (
            //子路由中Link无法通过to属性跳转父路由的对应组件
            // <Link to={`/bookintro/${this.props.content._id}`}>
                <div className="search_item"  onClick={this.goToBookIntro.bind(this)}>
                    <div className="search_card">
                        <img src={this.props.content.cover} onError={this.handleImageError.bind(this)}/>
                        <div className="card_right">
                            <h3 className="item_title">{this.props.content.title}</h3>
                            <span className="item_content">{this.props.content.latelyFollower}人在追 | {this.props.content.retentionRatio}读者留存 | {this.props.content.author}著</span>
                        </div>
                    </div>
                    <p className="shortIntro"><span>内容简介:</span><span className="shortIntroContent">{this.props.content.shortIntro}</span></p>
                </div>
                // </Link>
        )
    }
  
}

SearchItem.contextTypes = {
    parentHistory: PropTypes.object
  };
export default SearchItem;