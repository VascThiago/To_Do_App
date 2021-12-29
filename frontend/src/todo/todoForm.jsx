import React, { Component } from "react";
import Grid from "../template/grid";
import IconButton from "../template/iconButton";

import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { add, changeDescription, search, clear } from "./todoActions";

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(e) {

        const { add, search, description, clear } = this.props

        if(e.key === 'Enter') {
            e.shiftKey ? search(description) : add(description)
        } else if (e.key === 'Escape') {
            this.props.clear()
        }
    }

    render() {

        const { add, search, description, clear } = this.props

        return (
            <div role='form' className="todoForm">
                <Grid cols='12 9 10'>
                    <input id='discription' className="form-control" placeholder="Adicione uma tarefa"
                        onChange={this.props.changeDescription}
                        onKeyUp = {this.keyHandler}
                        value={this.props.description} />
                </Grid>
                
                <Grid cols="12 3 2">
                    <IconButton style='primary' icon='plus'
                        onClick={() => add(description)} />

                    <IconButton style='info' icon='search'
                        onClick={() => search(description)} />

                    <IconButton style='default' icon='close'
                        onClick={() => clear() } />
                </Grid>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        description: state.todo.description
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ add, changeDescription, search, clear }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)