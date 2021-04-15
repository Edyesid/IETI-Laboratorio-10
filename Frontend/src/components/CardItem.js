import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import './Card.css'

export class CardItem extends React.Component {

  render() {

    const myList = [
      {"key": "Description", "value": this.props.description},
      {"key": "Name", "value": this.props.name},
      {"key": "Email", "value": this.props.email},
      {"key": "Status", "value": this.props.status},
      {"key": "Duedate", "value": this.props.dueDate}
    ];

    return (
      <Card className="root">
        <CardActionArea>
          <td>{this.props.fileUrl ? <img src={this.props.fileUrl} /> : <div/>}</td>
        <CardContent>
        {myList.map((item) =>
          <div key = {item.key + "_" + item.value}>                                 
              <h2 style = {{display: 'inline-block'}}> {item.key}: </h2> {item.value}
          </div>
        )}
        </CardContent>
        </CardActionArea>
      </Card>
    );
}
}
export default CardItem;