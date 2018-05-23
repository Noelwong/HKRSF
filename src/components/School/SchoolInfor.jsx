import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';


class SchoolInfor extends Component {
    constructor(props) {
        super(props);
        this.SchoolInfor = {
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
                     /><br/>
                School	Name(English)
                <input type="text"
                    id="EName" 
                    placeholder="School	Name"  
                    /><br/>
                學校所屬地區<br/>
                The district of school
                <select id = "DOSchool"  >
                    <option value ="dfv">請選擇 Please Select</option>
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
                     /><br/>
                <b>聯絡資料 Contact Details</b><br/>
                聯絡人姓名：(中文)
                <input type="text"
                     id="contactCname" 
                     placeholder="聯絡人姓名"  
                     /><br/>
                Name of contact Person(English)
                <input type="text"
                     id="contactEname" 
                     placeholder="Name of contact Person"  
                     /><br/>
                地址:<br/>
                Address
                <input type="text"
                     id="contactAddress" 
                     placeholder="地址"  
                     /><br/>
                電話：(辦公室)<br/>
                Telephone(Office)
                <input type="text"
                     id="officeTel" 
                     placeholder="辦公室電話"  
                     /><br/>
                電話：(流動)<br/>
                Telephone(Mobile)
                <input type="text"
                     id="mobileTel" 
                     placeholder="流動電話"  
                     /><br/>
                傳真號碼:<br/>
                Fax
                <input type="text"
                     id="fax" 
                     placeholder="Fax"  
                     /><br/>
                電郵<br/>
                Email address
                <input type="text"
                     id="contactEmail" 
                     placeholder="Email address"  
                     /><br/>
                </form>
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
    
}
export default SchoolInfor;