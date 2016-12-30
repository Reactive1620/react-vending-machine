import React from 'react'

function VendingItem(props) {
    let itemClasses = 'vendingItem';
    if (props.activeItemIdx === props.idx) itemClasses = itemClasses.concat(' active');
    if (props.item.count < 1) itemClasses = itemClasses.concat(' empty');

    return (
        <div className={itemClasses} onClick={props.handleClick.bind(this, props.idx)}>        
            <div className="title">{props.item.name}</div>
            <div className="price">{props.item.price}</div>
            <div className="counter">{props.item.count}</div>
        </div>
    )
}


export default class VendingItemsBox extends React.Component {
    render() {
        return (
            <div className="vendingItemsBox">
                {this.props.items.map( (item, idx) => <VendingItem 
                    key={item.name}
                    activeItemIdx={this.props.activeItemIdx} 
                    item={item}
                    idx={idx}
                    handleClick={this.props.clickHandler} /> 
                )}
            </div>
        );
    }
}