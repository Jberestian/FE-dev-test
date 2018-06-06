import React, { Component } from 'react';
import initialData from './data';


class ListTest extends Component{

    constructor() {
        super();
        this.state = {
            initial: initialData,
            data: initialData,
            search: '',
            total: 0
        }
    }

    componentWillMount() {
        this.calculateTotal(this.state.data);
    }

    calculateTotal = (data) => {
        let total = 0;
        for(let i = 0; i < data.length; i++) {
            total += data[i].currency;
        }

        this.setState({ total });
    };

    updateSearch = (event) => {
        const search = event.target.value;
        const { initial } = this.state;
        const data = initial.filter(object => object.name.includes(search) || object.id.includes(search) || object.location.includes(search) || object.currency.toString().includes(search));
        this.calculateTotal(data);
        this.setState({ search, data });
    };

    render(){
        return(
            <div>
                <form>
                    <input
                    type='text'
                    value={this.state.search}
                    onChange={this.updateSearch}
                    />
                </form>
                <table>
                    <tbody>{this.state.data.map(function(item, key) {
                        return (
                            <tr key = {key}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.location}</td>
                                <td>{item.currency}</td>
                            </tr>
                        )

                    })}</tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}>Total:</td>
                            <td>{this.state.total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default ListTest;