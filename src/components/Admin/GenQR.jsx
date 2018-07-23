import React, { Component } from 'react';
import { db } from '../../firebase';
import { QRCode } from 'react-qr-svg';

class GenQR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participant: [],
        }
        this.Ref = db.collection('competition').doc(sessionStorage.compID).collection('participant');
        this.getAll();
    }

    getAll() {
        this.Ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                const PID = doc.id
                const Name = doc.data().CName
                let dataSet = {
                    PID: PID,
                    Name: Name
                }
                this.state.participant.push(JSON.stringify(dataSet))
            })
        })
    }

    render() {
        console.log(this.state.participant)
        return (
            <div>
                <table>

                    <tbody>
                        {this.state.participant.map((topic, index) =>
                            <tr>
                                <td>
                                    {JSON.parse(topic).Name}
                                </td>
                                <td>
                                    {<QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="Q"
                                        style={{ width: 64 }}
                                        value={JSON.parse(topic).PID}
                                    />}
                                </td>
                            </tr>)}
                    </tbody>

                </table>
            </div >
        )
    }

}
export default GenQR;