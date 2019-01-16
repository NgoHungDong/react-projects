import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDoneItem = this.handleDoneItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    render() {
        return (
            <div>
                <h3>TODO</h3>
                <ul>
                {this.state.items.map(item => (
                    <TodoItem key={item.id} item={item} handleDoneItem={this.handleDoneItem} handleDeleteItem={this.handleDeleteItem} data_id={item.id}/>
                ))}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Add #{this.state.items.length + 1}
                    </button>
                </form>                                                                                                                                                                                                                                              
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.text.length) {
            return;
        }
        const newItem = {
            id: Date.now(),
            text: this.state.text,
            status: false
        }
        this.setState(prev => ({
            items: prev.items.concat(newItem),
            text: ''
        }));
    }

    handleDoneItem(_State, _Id) {
        this.setState(state => {
            const items = state.items.map(item => {
                if (item.id === _Id){
                    item.status = _State.status
                    return item
                } else {
                    return item
                }
            })
            return items
        })
    }

    handleDeleteItem(_Id) {
        let filteredItems = this.state.items.filter(item => item.id !== _Id)
        this.setState({
            items: filteredItems,
            text: ''
        });
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateDoneItem = this.updateDoneItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    render() {
        
        return (
            <li><input type="checkbox" onClick={this.handleChange}></input>
            {this.props.item.status ? (
                <strike>{this.props.item.text}</strike>
            ) : (
                this.props.item.text
            )}
            <button onClick={this.deleteItem}>delete</button>
            </li>
        )
    }

    handleChange(){
        this.setState({
            status: !this.state.status
        }, this.updateDoneItem)
    }

    updateDoneItem() {
        this.props.handleDoneItem(this.state, this.props.data_id)
    }

    deleteItem() {
        this.props.handleDeleteItem(this.props.data_id)
    }
}


// ========================================

ReactDOM.render(
    <Todo />,
    document.getElementById('root')
);
