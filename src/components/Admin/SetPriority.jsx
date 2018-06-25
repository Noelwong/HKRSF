import React, { Component } from 'react';
import { db } from '../../firebase';

class SetPriority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank:[''],
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





            console.log(district);
            console.log(itemType);
            console.log(numOfPeople);
            console.log(timeLimit);
            console.log(groupType);
        });
        
    }

    setRank(){
        this.setState({rank:[ this.state.District, this.state.GroupType, this.state.ItemType, this.state.NumOfPeople, this.state.TimeLimit]});
    }


    render() {
        return (
            <div>
                <br/>
                <form name="manageProject"  method="post" encType="multipart/form-data">

                    <table border="1" width="718" align="center">
                        <tbody>
                        <tr>
                            <td align="left" width="100"><font size="4">地區 (District)
                                <input type="number"
                                 d="District"
                                 min="1" max="5"
                                 onChange={event => this.setState({ District: event.target.value })}
                            /></font></td>
                        </tr>     
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18020</font></td>

                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18018</font></td>
                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18011</font></td>

                        </tr>
                        </tbody>
                    </table>
                    <table border="1" width="718" align="center">
                        <tbody>
                        <tr>
                        
                            <td align="left" width="181"><font size="4">比賽項目 (Item Type)
                                <input type="number"
                                       id="NumOfPeople"
                                       min="1" max="5"
                                       onChange={event => this.setState({ ItemType: event.target.value })}
                            /></font></td>
                        </tr>     
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18020</font></td>

                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18018</font></td>
                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18011</font></td>
                        </tr>
                        </tbody>
                    </table>
                    <table border="1" width="718" align="center">
                        <tbody>
                        <tr>
                        
                            <td align="center" width="83"><font size="4">參賽人數 (# Of People)
                                <input type="number"
                                       id="NumOfPeople"
                                       min="1" max="5"
                                       onChange={event => this.setState({ NumOfPeople: event.target.value })}
                                /></font></td>
                        </tr>     
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18020</font></td>

                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18018</font></td>
                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18011</font></td>

                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P17092</font></td>
                        </tr>
                        </tbody>
                    </table>
                    <table border="1" width="718" align="center">
                        <tbody>
                        <tr>
                            <td align="center" width="83"><font size="4"> 時間限制 (Time Limit)
                                <input type="number"
                                       id="TimeLimit"
                                       min="1" max="5"
                                       onChange={event => this.setState({ TimeLimit: event.target.value })}
                            /></font></td>
                        </tr>     
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18020</font></td>

                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18018</font></td>
                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18011</font></td>

                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P17092</font></td>
                        </tr>
                        </tbody>
                    </table>
                    <table border="1" width="718" align="center">
                        <tbody>
                        <tr>
                            <td align="center" width="105"><font size="4">組別 (Group Type)
                                <input type="number"
                                       id="GroupType"
                                       min="1" max="5"
                                       onChange={event => this.setState({ GroupType: event.target.value })}
                            /></font></td>
                        </tr>     
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18020</font></td>

                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18018</font></td>
                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P18011</font></td>

                        </tr>
                        <tr>
                            <td align="left" colSpan="1"><font size="3">P17092</font></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                <br/>
                <br/>

                <form align="center">
                <a target="_blank" href={this.state.url+ JSON.stringify(this.state.rank) } ><button
                    className="btn btn-success"
                    onClick={() => this.setRank()}
                >
                    Submit
                </button></a>
                </form>

                <br/>

            </div>
        )

    }

    
}
export default SetPriority;