import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input, Grid } from 'semantic-ui-react'

class UserPortalSignUp1 extends Component {
    state = {
        allDays: [
            { id: 1, day: 'Monday' },
            { id: 2, day: 'Tuesday' },
            { id: 3, day: 'Wednesday' },
            { id: 4, day: 'Friday' },
            { id: 5, day: 'Saturday' },
            { id: 6, day: 'Sunday' },
            { id: 7, day: 'Every day' },
            { id: 8, day: 'Monday-Friday' },
            { id: 9, day: 'Saturday-Sunday' }
        ],
        selectedDays: [
            { id: 1, day: 'Monday', open: '5:00 PM', close: '9:00 AM' },
            { id: 2, day: 'Tuesday', open: '7:00 PM', close: '9:00 AM' },
        ]
    }
    handleSubmit = () => {
        this.props.dispatch({ type: 'HOURS_FORM', payload: this.state.selectedDays })
    }
    handleHourChange = (event, keyName) => {
        this.setState({
            ...this.state,
            inputHour: {
                ...this.state.inputHour,
                [keyName]: event.target.value
            }
        })
    }
    handleHourAdd = () => {
        if (this.state.inputHour) {
            this.setState({
                ...this.state,
                selectedDays: [...this.state.selectedDays, this.state.inputHour]
            })
        }
    }
    render() {
        return (
            <div>
                <div>
                    <label>Hours</label>
                    <Grid celled >
                        <Grid.Row>
                            <Grid.Column width={6}>
                                Day of the Week
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <label>Opens</label>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <label>Closes</label>
                            </Grid.Column>
                        </Grid.Row>
                        {this.state.selectedDays.map(selectedDay => (
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    {selectedDay.day}
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    {selectedDay.open}
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    {selectedDay.close}
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <Button size='mini' value={selectedDay.id}>X</Button>
                                </Grid.Column>
                            </Grid.Row>
                        ))}
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <select className="dropdown"
                                    onChange={(e) => this.handleHourChange(e, 'day')}>
                                    {this.state.allDays.map(day => (
                                        <option key={day.id}>{day.day}</option>
                                    ))}
                                </select>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Input
                                    fluid
                                    placeholder={'Opens'}
                                    onChange={(e) => this.handleHourChange(e, 'open')}
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Input
                                    fluid
                                    placeholder={'Closes'}
                                    onChange={(e) => this.handleHourChange(e, 'close')}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button onClick={this.handleHourAdd}>Add</Button>
                </div>
                <Button onClick={this.handleSubmit}>Next</Button>

            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(UserPortalSignUp1);