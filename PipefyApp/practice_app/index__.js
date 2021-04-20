/* globals PipefyApp */
import React from 'react';
import {render} from 'react-dom';

const pipefy = PipefyApp.init();

class ReactSample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {pipe: null};
    }

    componentDidMount() {
        PipefyApp.render(() => {
            pipefy.pipe().then((pipe) => {
                this.setState({pipe})
            });
        });
    }


    render() {
        if (!this.state.pipe) {
            return <div/>
        }
        return (
            <div>
                <h1>Solicitação Bacen</h1>
            <h3>Pipe: {this.state.pipe.name}</h3>
                <div>
                <label htmlFor="cardId">First name:</label><br>
                    <input type="text" name='cardId'></input>
                </div>
        </div>
    )
    }
}


render(<ReactSample/>, document.getElementById('application'));

