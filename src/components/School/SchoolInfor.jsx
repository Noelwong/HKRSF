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
            fax:'',
            error: {
                message: ''
            },
            checkCName:'',
            checkEName:'',
            checkCCname:'',
            checkCEname:'',
            checkOfficeTel:'',
            checkMobileTel:'',
            checkFax:'',
            checkCEmail:'',
        }
        this.user = firebaseApp.auth().currentUser;
        this.handleChange = this.handleChange.bind(this);
    }

    CName(event){
        this.setState({CName:event.target.value})
        var chineseName = /^[\u4e00-\u9fa5]{0,}$/;
        var _val = ""
        var val_CName = event.target.value
        var checkCName = new Boolean

        if(chineseName.test(val_CName)){
            this.setState({"checkCName":true})
            _val = val_CName;
            setTimeout(function(){
                this.setState({info_CName:""});
            }.bind(this), 1000);
        }else{
            this.setState({"checkCName":false}) 
            //val_CName = _val;
            this.setState({info_CName:"請輸入正確的中文名字"});
        }
        this.setState({"val_CName":val_CName})
    }

    EName(event){
        this.setState({EName:event.target.value})
        var englishName = /^[A-Za-z]+$/;
        var _val = ""
        var val_EName = event.target.value
        var checkEName = new Boolean

        if(englishName.test(val_EName)){
            this.setState({"checkEName":true})
            _val = val_EName;
            setTimeout(function(){
                this.setState({info_EName:""});
            }.bind(this), 1000);
        }else{
            this.setState({"checkEName":false})
            //val_EName = _val;
            this.setState({info_EName:"Please Input Correct English Name"})
        }
        this.setState({"val_EName":val_EName})
    }

    contactCname(event){
        this.setState({contactCname:event.target.value})
        var contactChineseName = /^[\u4e00-\u9fa5]{0,}$/;
        var _val =""
        var val_contactCname = event.target.value
        var checkCCname = new Boolean

        if(contactChineseName.test(val_contactCname)){
            this.setState({"checkCCname":true})
            _val = val_contactCname;
            setTimeout(function(){
                this.setState({info_contactCname:""});
            }.bind(this), 1000);
        }else{ 
            this.setState({"checkCCname":false})
            //val_contactCname = _val;
            this.setState({info_contactCname:"請輸入正確的中文名字"});
        }
        this.setState({"val_contactCname":val_contactCname})
    }

    contactEname(event){
        this.setState({contactEname:event.target.value})
        var contactEnglishName = /^[A-Za-z]+$/;
        var _val = ""
        var val_contactEname = event.target.value
        var checkCEname = new Boolean

        if(contactEnglishName.test(val_contactEname)){
            this.setState({"checkCEname":true})
            _val = val_contactEname;
            setTimeout(function(){
                this.setState({info_contactEname:""});
            }.bind(this), 1000);
        }else{
            this.setState({"checkCEname":false})
            //val_contactEname = _val;
            this.setState({info_contactEname:"Please Input Correct English Name"})
        }
        this.setState({"val_contactEname":val_contactEname})
    }

    officeTel(event){
        this.setState({officeTel:event.target.value})
        var officeTel = /^[0-9]*$/;
        var _val = ""
        var val_officeTel = event.target.value
        var checkOfficeTel = new Boolean

        if(officeTel.test(val_officeTel)){
            this.setState({"checkOfficeTel":true})
            _val = val_officeTel;
            setTimeout(function(){
                this.setState({info_officeTel:""});
            }.bind(this), 1000);
        }else{
            this.setState({"checkOfficeTel":false})
            //val_officeTel = _val;
            this.setState({info_officeTel:"請輸入正確的辦公室電話號碼/Please Input Correct Office Phone Number"})
        }
        this.setState({"val_officeTel":val_officeTel})
    }
    
    mobileTel(event){
        this.setState({mobileTel:event.target.value})
        var mobileTel = /^[0-9]*$/;
        var _val = ""
        var val_mobileTel = event.target.value
        var checkMobileTel = new Boolean

        if(mobileTel.test(val_mobileTel)){
            this.setState({"checkMobileTel":true})
            _val = val_mobileTel;
            setTimeout(function(){
                this.setState({info_mobileTel:""});
            }.bind(this), 1000);
        }else{
            this.setState({"checkMobileTel":false})
            //val_mobileTel = _val;
            this.setState({info_mobileTel:"請輸入正確的手機電話號碼/Please Input Correct Telephone Number"})
        }
        this.setState({"val_mobileTel":val_mobileTel})
    }
    
    fax(event){
        this.setState({fax:event.target.value})
        var fax = /^[0-9]*$/;
        var _val = ""
        var val_fax = event.target.value
        var checkFax = new Boolean

        if(fax.test(val_fax)){
            this.setState({"checkFax":true})
            _val = val_fax;
            setTimeout(function(){
                this.setState({info_fax:""});
            }.bind(this), 1000);
        }else{
            this.setState({"checkFax":false})
            //val_fax = _val;
            this.setState({info_fax:"請輸入正確的傳真號碼/Please Input Correct Fax Number"})
        }
        this.setState({"val_fax":val_fax})
    }    

    contactEmail(event){
        this.setState({contactEmail:event.target.value})
        var contactEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var _val = ""
        var val_contactEmail = event.target.value
        var checkCEmail = new Boolean

        if(contactEmail.test(val_contactEmail)){
            this.setState({"checkCEmail":true})
            _val = val_contactEmail;
            setTimeout(function(){
                this.setState({info_contactEmail:""});
            }.bind(this), 1000);
        }else{ 
            this.setState({"checkCEmail":false})
            //val_contactEmail = _val;
            this.setState({info_contactEmail:"請輸入正確的郵箱地址/Please Input Correct Email Address"});
        }
        this.setState({"val_contactEmail":val_contactEmail})
    }

    handleChange(event) {
        this.setState({DOSchool: event.target.value});
      }

    render(){

        return (
            <div>
                <form>
                學校會員申請表<br />
                Membership	Application	Form<br /><br/>
                <b>基本資料 Basic	Information</b><br/>
                學校名稱（中文）
                <input type="text"
                     id="CName"
                     placeholder="學校名稱" 
                     value ={this.state.val_CName}
                     onChange={this.CName.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_CName}</font>
                <br/>
                School Name(English)
                <input type="text"
                    id="EName" 
                    placeholder="School Name"  
                    value ={this.state.val_EName}  
                    onChange={this.EName.bind(this)}
                    />&nbsp;
                <font for="title" color="red">{this.state.info_EName}</font>
                <br/><br/>
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
                <br/><br/>
                校長姓名<br/>
                Name of Principal:
                <input type="text"
                     id="PName" 
                     placeholder="校長姓名"  
                     onChange={event => this.setState({ PName: event.target.value })}
                     /><br/><br/>
                <b>聯絡資料 Contact Details</b><br/>
                聯絡人姓名：(中文)
                <input type="text"
                     id="contactCname" 
                     placeholder="聯絡人姓名"  
                     value ={this.state.val_contactCname}
                     onChange={this.contactCname.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_contactCname}</font>
                <br/>
                Name of contact Person(English)
                <input type="text"
                     id="contactEname" 
                     placeholder="Name of contact Person"  
                     value ={this.state.val_contactEname}
                     onChange={this.contactEname.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_contactEname}</font>
                <br/><br/>
                地址:<br/>
                Address
                <input type="text"
                     id="contactAddress" 
                     placeholder="地址" 
                     onChange={event => this.setState({ contactAddress: event.target.value })} 
                     /><br/><br/>
                電話：(辦公室)<br/>
                Telephone(Office)
                <input type="text"
                     id="officeTel" 
                     placeholder="辦公室電話"  
                     value ={this.state.val_officeTel}
                     onChange={this.officeTel.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_officeTel}</font>
                <br/><br/>
                電話：(流動)<br/>
                Telephone(Mobile)
                <input type="text"
                     id="mobileTel" 
                     placeholder="流動電話"  
                     value ={this.state.val_mobileTel}
                     onChange={this.mobileTel.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_mobileTel}</font>
                <br/><br/>
                傳真號碼:<br/>
                Fax
                <input type="text"
                     id="fax" 
                     placeholder="Fax"  
                     value ={this.state.val_fax}
                     onChange={this.fax.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_fax}</font>
                <br/><br/>
                電郵<br/>
                Email address
                <input type="text"
                     id="contactEmail" 
                     placeholder="Email address"  
                     value ={this.state.val_contactEmail}
                     onChange={this.contactEmail.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_contactEmail}</font>
                <br/>
                </form>
                <button
                    className="btn btn-success"
                    onClick={() => this.addSchoolInfor(this.state)}
                    
                >
                    Submit
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => this.signOut()}
                >
                    Sign Out
                </button>
                <br/>
                <font for="title" color="red">{this.state.info}</font>
            </div>
        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }

    addSchoolInfor(state) {
        if(this.state.checkCEname == true && this.state.checkEName == true && this.state.checkCCname == true && this.state.checkCEname == true && this.state.checkOfficeTel == true 
            && this.state.checkMobileTel == true && this.state.checkFax == true && this.state.checkCEmail == true ){
        const uid = this.user.uid;
        db.collection("user").doc(uid).set({
            userType: this.state.userType,
            CName: this.state.CName,
            EName: this.state.EName,
            DOSchool: this.state.DOSchool,
            PName: this.state.PName,
            contactCname: this.state.contactCname,
            contactEname: this.state.contactEname,
            contactAddress: this.state.contactAddress,
            officeTel: this.state.officeTel,
            mobileTel: this.state.mobileTel,
            fax: this.state.fax,
            contactEmail:this.state.contactEmail
        });}else{
            this.setState({info:"ERROR"})
            setTimeout(function(){
                this.setState({info:""})
            }.bind(this),3000);
        }
    }
    
}
export default SchoolInfor;