import React, { Component } from 'react';
import { db } from '../../firebase';

class ShowComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            competition:[]
        }
        this.getCompInfor();
    }
getCompInfor(){
    this.com = [];
    // db.collection('competition').get().then(snapshot =>
    //     {snapshot.forEach(doc => {
    //             //console.log(doc.id, '=>', doc.data().name);
    //             // this.com.push(doc.id,doc.data().name);
    //         this.com.push(doc.data().name);
    //             console.log(this.com);
    //         // this.setState({ com })
    //         });
    //     })
    //
    //
    //     .catch(err => {
    //         console.log('Error getting documents', err);
    //     });

    db.collection('competition').onSnapshot(coll => {
        const competition = coll.docs.map(doc => doc.data().name)
        this.setState({ competition })
    })

    // db.collection("competition").get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // });
}




    render() {


        return (
            <div>


                    {
                    this.state.competition.map((topic, index) =>
                        <button className="btn btn-danger" key={index}>{topic}</button>
                    )
                    }

                    </div>


           
        )

    }

}
export default ShowComp;