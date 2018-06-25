import React, { Component } from 'react';
import { db } from '../../firebase';

class SetPriority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank:[],
            district:[],
            groupType:[],
            itemType:[],
            numOfPeople:[],
            timeLimit:[],
            District:'',
            GroupType:'',
            ItemType:'',
            NumOfPeople:'',
            TimeLimit:'',
            url:'https://us-central1-hkrsf-csci321.cloudfunctions.net/scheduling_test?arr_1='
        }
        this.Ref = db.collection('competition').doc(sessionStorage.compID).collection('competitionItem');
        this.getAll();
        
    }

    getAll(){
        this.Ref.onSnapshot(function(querySnapshot) {
            var district = [];
            var groupType = [];
            var itemType = [];
            var numOfPeople = [];
            var timeLimit = [];
            querySnapshot.forEach(function(doc) {
                district.push(doc.data().district);
                groupType.push(doc.data().groupType);
                itemType.push(doc.data().itemType);
                numOfPeople.push(doc.data().numOfPeople);
                timeLimit.push(doc.data().timeLimit);
            });
           
            district = Array.from(new Set(district));
            itemType = Array.from(new Set(itemType));
            numOfPeople = Array.from(new Set(numOfPeople));
            timeLimit = Array.from(new Set(timeLimit));
            groupType = Array.from(new Set(groupType));
        });
        
    }

    setRank(){
        let rank = [];
        rank.push(this.state.District);
        rank.push(this.state.GroupType);
        rank.push(this.state.ItemType);
        rank.push(this.state.NumOfPeople);
        rank.push(this.state.TimeLimit);
        // eslint-disable-next-line 
        this.state.rank = JSON.stringify(rank);   
        console.log(this.state.rank);
    }
    render() {
        return (
            <div>
                地區:<br/>
                District:
                <input type="number"
                     id="District" 
                     min="1" max="5"
                     onChange={event => this.setState({ District: event.target.value })}
                     />
                <br/>
                比賽項目:<br/>
                Item Type:
                <input type="number"
                     id="ItemType" 
                     min="1" max="5"
                     onChange={event => this.setState({ ItemType: event.target.value })}
                     />
                <br/>
                參賽人數:<br/>
                # Of People:
                <input type="number"
                     id="NumOfPeople" 
                     min="1" max="5"
                     onChange={event => this.setState({ NumOfPeople: event.target.value })}
                     />
                <br/>
                時間限制:<br/>
                Time Limit:
                <input type="number"
                     id="TimeLimit" 
                     min="1" max="5"
                     onChange={event => this.setState({ TimeLimit: event.target.value })}
                     />
                <br/>
                組別:<br/>
                Group Type:
                <input type="number"
                     id="GroupType" 
                     min="1" max="5"
                     onChange={event => this.setState({ GroupType: event.target.value })}
                     />
                     <br/>
                     <button
                    className="btn btn-success"
                    onClick={() => this.setRank()}
                >
                    Submit
                </button>
                <a target="_blank" href={this.state.url+this.state.rank}><button
                    className="btn btn-success"
                >
                    gogo
                </button></a>
                
                <br/>
                    {this.state.rank}
            </div>
        )

    }

    
}
export default SetPriority;