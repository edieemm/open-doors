import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input, Grid } from 'semantic-ui-react'
import Header from '../Header/Header'

class UserPortalSignUp2 extends Component {
    state = {
        selectedTypes: this.props.reduxState.signUpForm.types || []
    }
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TYPES' });
    }

    handleSubmit = () => {
        console.log(this.state.selectedTypes)
        this.props.dispatch({ type: 'TYPES_FORM', payload: this.state.selectedTypes })
        this.props.dispatch({ type: 'ID_FOR_FORM', payload: this.props.reduxState.userShelter.id })
        this.props.history.push('/sign-up-4')
    }
    handleBack = () => {
        this.props.dispatch({ type: 'TYPES_FORM', payload: this.state.selectedTypes })
        this.props.history.push('/sign-up-2')
    }

    handleTypeAdd = () => {
        console.log(this.state.inputType)
        if (this.state.inputType) {
            this.setState({
                ...this.state,
                selectedTypes: [...this.state.selectedTypes, this.state.inputType]
            })
        }
    }
    handleTypeNameChange = (event) => {
        this.setState({
            ...this.state,
            inputType: {
                ...this.state.inputType,
                type: event.target.value
            }
        })
    }
    handleTypeCapacityChange = (event) => {
        this.setState({
            ...this.state,
            inputType: {
                ...this.state.inputType,
                capacity: event.target.value
            }
        })
    }
    render() {
        return (
            <>
                <div>
                    <Header
                        icon1={'checkmark'}
                        icon2={'checkmark'}
                        value3={3}
                        value4={4}
                        value5={'Review'}
                        color3={'grey'}
                    />
                    <div>
                        <div>
                            <Grid celled >
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        Guest Types
                            </Grid.Column>
                                    <Grid.Column width={8}>
                                        Capacity
                            </Grid.Column>
                                </Grid.Row>
                                {this.state.selectedTypes.map(selectedTypes => (
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            {selectedTypes.type}
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                            {selectedTypes.capacity}
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Button>X</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                ))}
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <select className="dropdown"
                                            onChange={this.handleTypeNameChange}>
                                            {this.props.reduxState.types.map(type => (
                                                <option key={type.id}>{type.type}</option>
                                            ))}
                                        </select>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Input fluid placeholder={'Capacity'} onChange={this.handleTypeCapacityChange} />
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button onClick={this.handleTypeAdd}>Add</Button>                                </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                        <Button onClick={this.handleBack}>Back</Button>
                        <Button primary onClick={this.handleSubmit}>Next</Button>

                    </div>
                </div>
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(UserPortalSignUp2);