import React, { Component } from 'react';
import { firebaseApp, db } from '../../firebase';


class SchoolInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType:'School',
            CName: '',
            EName: '',
            DOSchool: '',
            PName: '',
            contactCname:'',
            contactEname:'',
            contactAddress:'',
            officeTel:'',
            mobileTel:'',
            contactEmail:'',
            error: {
                message: ''
            }
        }
        this.user = firebaseApp.auth().currentUser;

    }
    handleChange(event) {
        this.setState({DOSchool: event.target.value});
      }

    render(){

        return (
            <div>
                <form>
                學校會員申請表<br />
                Membership	Application	Form<br />
                <b>基本資料 Basic	Information</b><br/>
                學校名稱（中文）
                <input type="text"
                     id="CName" 
                     placeholder="學校名稱"  
                     onChange={event => this.setState({ CName: event.target.value })}
                     /><br/>
                School	Name(English)
                <input type="text"
                    id="EName" 
                    placeholder="School	Name"  
                    onChange={event => this.setState({ EName: event.target.value })}
                    /><br/>
                學校所屬地區<br/>
                The district of school
                <select value={this.state.DOSchool} onChange={this.handleChange} >
                    <option value ="">請選擇 Please Select</option>
                    <option value ="CAndW">中西區Central and Western</option>
                    <option value="WanChai">灣仔區Wan Chai</option>
                    <option value="Eastern">東區Eastern</option>
                    <option value="Southern">南區Southern</option>
                    <option value="YauTsimMong">油尖旺區Yau Tsim Mong</option>
                    <option value="ShamShuiPo">深水埗區Sham Shui Po</option>
                    <option value="KowloonCity">九龍城區Kowloon City</option>
                    <option value="WongTaiSin">黃大仙區Wong Tai Sin</option>
                    <option value="KwunTong">觀塘區Kwun Tong</option>
                    <option value="KwaiTsing">葵青區Kwai Tsing</option>
                    <option value="TsuenWan">荃灣區Tsuen Wan</option>
                    <option value="TuenMun">屯門區Tuen Mun</option>
                    <option value="YuenLong">元朗區Yuen Long</option>
                    <option value="North">北區North</option>
                    <option value="TaiPo">大埔區Tai Po</option>
                    <option value="ShaTin">沙田區Sha Tin</option>
                    <option value="SaiKung">西貢區Sai Kung</option>
                    <option value="Islands">離島區Islands</option>
                </select>
                校長姓名<br/>
                Name of Principal:
                <input type="text"
                     id="PName" 
                     placeholder="校長姓名"  
                     onChange={event => this.setState({ PName: event.target.value })}
                     /><br/>
                <b>聯絡資料 Contact Details</b><br/>
                聯絡人姓名：(中文)
                <input type="text"
                     id="contactCname" 
                     placeholder="聯絡人姓名"  
                     onChange={event => this.setState({ contactCname: event.target.value })}
                     /><br/>
                Name of contact Person(English)
                <input type="text"
                     id="contactEname" 
                     placeholder="Name of contact Person"  
                     onChange={event => this.setState({ contactEname: event.target.value })}
                     /><br/>
                地址:<br/>
                Address
                <input type="text"
                     id="contactAddress" 
                     placeholder="地址" 
                     onChange={event => this.setState({ contactAddress: event.target.value })} 
                     /><br/>
                電話：(辦公室)<br/>
                Telephone(Office)
                <input type="text"
                     id="officeTel" 
                     placeholder="辦公室電話"  
                     onChange={event => this.setState({ officeTel: event.target.value })} 
                     /><br/>
                電話：(流動)<br/>
                Telephone(Mobile)
                <input type="text"
                     id="mobileTel" 
                     placeholder="流動電話"  
                     onChange={event => this.setState({ mobileTel: event.target.value })} 
                     /><br/>
                傳真號碼:<br/>
                Fax
                <input type="text"
                     id="fax" 
                     placeholder="Fax"  
                     onChange={event => this.setState({ fax: event.target.value })}
                     /><br/>
                電郵<br/>
                Email address
                <input type="text"
                     id="contactEmail" 
                     placeholder="Email address"  
                     onChange={event => this.setState({ contactEmail: event.target.value })}
                     /><br/>
                </form>
                <button
                    className="btn btn-danger"
                    onClick={() => this.signOut()}
                >
                    Submit
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => this.addSchoolInfor(this.SchoolInfor)}
                >
                    Sign Out
                </button>
            </div>
        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }
    addSchoolInfor(SchoolInfor) {
        const uid = this.user.uid;
        db.collection("user").doc(uid).set({
            userType: this.state.userType
        });
    }
    
}
export default SchoolInfor;