import React, { Component } from 'react';
import { db } from '../../firebase';
import { ListGroup, ListGroupItem, Alert, Button } from 'react-bootstrap'

class DeleteCompItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compItem: [],
            selectedCompItem: '',
            item: '',
            show: false
        }
        this.Ref = db.collection('competition').doc(sessionStorage.compID).collection('competitionItem');
        this.getCompItem();
       this.CompItemHandleChange = this.CompItemHandleChange.bind(this);
       this.handleDismiss = this.handleDismiss.bind(this);
       this.handleShow = this.handleShow.bind(this);
    }

    CompItemHandleChange(event) {
        this.setState({ selectedCompItem: event.target.value });
    }

    getCompItem(){
        this.Ref.onSnapshot(coll => {
            const compItem = coll.docs.map(doc => doc.id)
            this.setState({ compItem })
        })
    }

    DeleteItem(){
        this.Ref.doc(this.state.item).delete();
        this.setState({ show: false });
    }

    handleDismiss() {
        this.setState({ show: false });
    }

    handleShow(topic) {
        this.setState({item: topic});
        this.setState({ show: true });
    }

    render() {
        if (this.state.show) {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <h4>You are deleting a competition!</h4>
                    <p>Competition Name: {this.state.item}</p>
                    <p>
                        <Button bsStyle="danger" onClick={() => this.DeleteItem()}>Confirm</Button>
                        <span> or </span>
                        <Button onClick={this.handleDismiss}>Cancel</Button>
                    </p>
                </Alert>
            )
        }

        return (
            <div>
                <ListGroup style={{width: '30%'}}>
                {this.state.compItem.map((topic, index) =>
                      <ListGroupItem key={topic}  onClick={() => this.handleShow(topic)}>{topic}</ListGroupItem>
                )}
                </ListGroup>

            </div>
        )
    }

}
export default DeleteCompItem;
