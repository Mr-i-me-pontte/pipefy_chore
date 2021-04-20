/* globals PipefyApp */
import React from "react";
import {render} from "react-dom";

const pipefy = PipefyApp.init();

class ReactSample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {pipe: null, cardId: ""};
    }

    loaCards() {
        PipefyApp.render(() => {
            pipefy.card().then(card => {
                console.log("card:", card);
            });
        });
    }

    componentDidMount() {
        PipefyApp.render(() => {
            pipefy.pipe().then(pipe => {
                this.setState({pipe});
            });
        });
    }

    handleChange({event: {target: {value}}}) {
        this.setState({cardId: value});
        // openCard(value);
        console.log("this.state", this.state);
    }

    submit(cardId) {
        console.log("warnnnnnnnnnnnnn");
        console.log("cardId", cardId);
        // const pcard = PipefyApp.card(cardId);
        // console.log(pcard.resolve());

        pipefy
            .get("card", "token", {ID: 411819745})
            .then(card => {
                console.log(card); // return actual value stored
            })
            .catch(error => {
                // Handle error
                console.log(error);
            });
        // .then(card => console.log("card:", card))
        // console.log("PipefyApp card:", pcard)
        // var Promise = PipefyApp.Promise;
    }

    render() {
        const mockCadId = "411819745";
        if (!this.state.pipe) {
            return <div/>;
        }
        return (
            <div>
                <div>
                    <h1>Solicitação Bacen</h1>
                    <h3>Pipe: {this.state.pipe.name}</h3>
                    <div>
                        <form>
                            <div>
                                <label>
                                    cardId:
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={event => this.handleChange({event})}
                                    />
                                </label>
                                <button
                                    type="submit"
                                    onClick={() => this.submit(this.state.cardId)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

render(<ReactSample/>, document.getElementById("application"));
