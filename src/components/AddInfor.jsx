import React, { Component } from 'react';
import { firebaseApp } from '../firebase';

class AddInfor extends Component {

        constructor(props) {
          super(props);
          this.changepage;
        }


    render() {

        return (
            <div class = "pickerdiv">
                <select id = "typeselect" onChange= {this.changepage } >
                    <option value ="dfv">Please Select Your User type</option>
                    <option value ="Personal">個人Personal</option>
                    <option value="School">學校School</option>
                    <option value="Organization">組織Organization</option>
                </select>
                <b id = "test">"You selected: Personal"</b>

                    //form for user input
                <form id="form1" name="form1" /*style="display:none;"*/ /* ERROR will disable all the element */ >
                    <p>  First name :<input name="name" type="text" id="name" /></p>
                    <p>Last name :<input name="address" type="text" id="address"  /></p>
                    <p> Age: <input name="age" type="text" id="age" /></p>
                </form>
                <br></br>
                <button
                    className="btn btn-danger"
                    onClick={() => this.signOut()}
                >
                    Sign Out
                </button>
            </div>



        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }

    changepage = () => {
        var x = document.getElementById("typeselect").value;
        document.getElementById("test").innerHTML = "You selected: " + x;
console.log(x);
        if(x === "Personal"){
            var createinput = document.createElement("input");
            createinput.setAttribute('type', 'text');
            document.body.appendChild(createinput);

           //set visable show/hidden
            document.getElementById("form1").style.display="none";
        }else if (x ==="School"){

        }else if (x ==="Organization" ){

        }







    }









}
export default AddInfor;