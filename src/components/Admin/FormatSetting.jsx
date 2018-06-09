import React, { Component } from 'react';
import { db } from '../../firebase';

class FormatSetting extends Component {
    constructor(props) {
        super(props);
        this.state={
            limitType: []
        }
        this.limitType();
    }

    limitType(){
        db.collection('competitionFormat').doc('competitionItem').onSnapshot(coll => {
            const limitType = coll.collections.map(collection => collection.data().id)
            this.setState({ limitType })
        })
    }


    render() {


        return (
            <div>
                {
                    this.state.limitType.map((topic, index) =>
                        <button className="btn btn-danger" id={index}>{topic}</button>
                    )
                }
            </div>
            )

    }

}
export default FormatSetting;