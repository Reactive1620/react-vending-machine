import React from 'react'
import ProductsBox from './products-box'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: [
                {
                    name: 'SNICKERS',
                    price: 5.98,
                    count: 4
                },
                {
                    name: 'MARS',
                    price: 5.45,
                    count: 5
                },
                {
                    name: 'COKE',
                    price: 4.35,
                    count: 3
                }
            ],
            activeItemIdx: -1,
            outBoxItemName: '',
            bank: 100,
            userMoney: 0,
            userChange: -1,
            isBuyOk: false
        }

        this.checkBuyRequirements = this.checkBuyRequirements.bind(this);
    }

    selectProduct(itemIdx) {
        const activeItem = this.state.items[itemIdx];
        // Exit when click on empty item
        if (activeItem.count < 1) return false

        // Toogle current active item
        if (this.state.activeItemIdx === itemIdx) this.setState({ activeItemIdx: -1 }, this.checkBuyRequirements) 
        // Set new active item       
        else this.setState( { activeItemIdx: itemIdx }, this.checkBuyRequirements );        	
    }

    handleOutItemClick() {
        this.setState({
           outBoxItemName: ''
        });
    }
    handleUserChangeClick() {
        this.setState({
           userChange: -1
        });
    }

    checkBuyRequirements() {
    	const idx = this.state.activeItemIdx;
        const activeItem = this.state.items[idx] ? this.state.items[idx] : null;            
        const userMoney = this.state.userMoney;

        // Product selected and User money is enough for buy product
        if (activeItem && 
        	activeItem.count > 0 &&
        	activeItem.price < userMoney) {
        	this.setState({ isBuyOk: true });
        } else this.setState({ isBuyOk: false });
    }

    pay(e) {
    	this.setState({ userMoney: e.target.value }, this.checkBuyRequirements);
    }

    buy() {
    	const idx = this.state.activeItemIdx;
        const activeItem = this.state.items[idx];            
        const userMoney = this.state.userMoney;

        // Update product count (decrease selected product count)
        this.setState({ 
            items: this.state.items.map((item, idx)=>{
                if (idx === this.state.activeItemIdx) {
                    var updatedItem = item;
                    updatedItem.count--;
                    return updatedItem;
                } else return item;
            }) 
        });
        // Set money to the bank
        this.setState({ bank: this.state.bank + activeItem.price});
        // Give the item to a user
        this.setState({ outBoxItemName: activeItem.name});
        // Give the change to a user
        this.setState({ userChange: userMoney - activeItem.price});
        // Reset money input
        this.setState({ userMoney: 0}, this.checkBuyRequirements);
    }

    render() {
        return (
            <div className="container">
                <h2>Reactive vending machine</h2>
                <div className="twoColBLock">
                    <div className="mainCol">
                        <ProductsBox items={this.state.items} activeItemIdx={this.state.activeItemIdx} clickHandler={this.selectProduct.bind(this)}/>
                        <div className="itemOutBox">
                            {this.state.outBoxItemName &&
                                <div className="outItem" onClick={this.handleOutItemClick.bind(this)}>{this.state.outBoxItemName}</div>
                            }
                        </div>
                        {this.state.bank && <h4>Bank: ${this.state.bank.toFixed(2)}</h4> }
                    </div>
                    <div className="sideCol">
                        <ol className="guide">
                            <li>Select a product</li>
                            <li>Put money and press Enter</li>
                            <li>Pick up your product and pick up your change</li>         
                        </ol>
                        <div>Put money</div>
                        <input type="number" className="moneyInput" value={this.state.userMoney} onChange={this.pay.bind(this)} min="0"/>
                        {this.state.isBuyOk ?
                        	<button className="buyBtn" onClick={this.buy.bind(this)}>Buy</button> :
                        	<button className="buyBtn" disabled>Buy</button>
                    	}
                        {this.state.userChange > 0 && 
                        	<div>
	                            <div>Pick up your change</div>
	                            <div className="userChange" onClick={this.handleUserChangeClick.bind(this)}>
	                                ${this.state.userChange.toFixed(2)}
	                            </div>
                            </div> 
                        }
                    </div>
                </div>
            </div>
        );
    }
}