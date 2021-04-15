import React from 'react';
import CardItem from './CardItem';

export class Todo extends React.Component {

    render() {
        return (
            <CardItem
                description = {this.props.description}
                name = {this.props.name}
                email = {this.props.email}
                status = {this.props.status}
                dueDate = {this.props.dueDate.toString()}
                fileUrl = {this.props.fileUrl}
                >
            </CardItem>
        );
    }

}