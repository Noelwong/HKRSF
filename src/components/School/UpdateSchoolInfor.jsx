import React, { Component } from 'react';
import { firebaseApp, db } from '../../firebase';


class UpdateSchoolInfor extends Component {
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
            checkCName:true,
            checkEName:true,
            checkCCname:true,
            checkCEname:true,
            checkOfficeTel:true,
            checkMobileTel:true,
            checkFax:true,
            checkCEmail:true,
        }
        this.user = firebaseApp.auth().currentUser;
    }

    CName(event){
        this.setState({CName:event.target.value})
        var chineseName = /^[\u4e00-\u9fa5]{0,}$/;
        var val_CName = event.target.value;

        if(val_CName.length > 0){    
            if(chineseName.test(val_CName)){
                this.setState({"checkCName":true})
                setTimeout(function(){
                    this.setState({info_CName:""});
                }.bind(this), 1000);
            }else{
                this.setState({"checkCName":false}) 
                this.setState({info_CName:"請輸入正確的中文名字"});
            }
        }
        this.setState({"val_CName":val_CName})
    }

    EName(event){
        this.setState({EName:event.target.value})
        var englishName = /^[A-Za-z]+$/;
        var val_EName = event.target.value;

        if(val_EName.length > 0){
            if(englishName.test(val_EName)){
                this.setState({"checkEName":true})
                setTimeout(function(){
                    this.setState({info_EName:""});
                }.bind(this), 1000);
            }else{
                this.setState({"checkEName":false})
                this.setState({info_EName:"Please Input Correct English Name"})
            }
        }
        this.setState({"val_EName":val_EName})
    }

    schoolDistrict(event) {
        this.setState({DOSchool: event.target.value});
    }

    principalName(event){
        this.setState({PName:event.target.value});
    }

    contactCname(event){
        this.setState({contactCname:event.target.value})
        var contactChineseName = /^[\u4e00-\u9fa5]{0,}$/;
        var val_contactCname = event.target.value;

        if(val_contactCname.length > 0){
            if(contactChineseName.test(val_contactCname)){
                this.setState({"checkCCname":true})
                setTimeout(function(){
                    this.setState({info_contactCname:""});
                }.bind(this), 1000);
            }else{ 
                this.setState({"checkCCname":false})
                this.setState({info_contactCname:"請輸入正確的中文名字"});
            }
        }
        this.setState({"val_contactCname":val_contactCname})
    }

    contactEname(event){
        this.setState({contactEname:event.target.value})
        var contactEnglishName = /^[A-Za-z]+$/;
        var val_contactEname = event.target.value;

        if(val_contactEname > 0){
            if(contactEnglishName.test(val_contactEname)){
                this.setState({"checkCEname":true})
                setTimeout(function(){
                    this.setState({info_contactEname:""});
                }.bind(this), 1000);
            }else{
                this.setState({"checkCEname":false})
                this.setState({info_contactEname:"Please Input Correct English Name"})
            }
        }
        this.setState({"val_contactEname":val_contactEname})
    }

    address(event){
        this.setState({contactAddress:event.target.value});
    }

    officeTel(event){
        this.setState({officeTel:event.target.value})
        var officeTel = /^[0-9]*$/;
        var val_officeTel = event.target.value;

        if(val_officeTel.length > 0){
            if(officeTel.test(val_officeTel)){
                this.setState({"checkOfficeTel":true})
                setTimeout(function(){
                    this.setState({info_officeTel:""});
                }.bind(this), 1000);
            }else{
                this.setState({"checkOfficeTel":false})
                this.setState({info_officeTel:"請輸入正確的辦公室電話號碼/Please Input Correct Office Phone Number"})
            }
        }
        this.setState({"val_officeTel":val_officeTel})
    }
    
    mobileTel(event){
        this.setState({mobileTel:event.target.value})
        var mobileTel = /^[0-9]*$/;
        var val_mobileTel = event.target.value;

        if(mobileTel.test(val_mobileTel)){
            this.setState({"checkMobileTel":true})
            setTimeout(function(){
                this.setState({info_mobileTel:""});
            }.bind(this), 1000);
        }else{
            this.setState({"checkMobileTel":false})
            this.setState({info_mobileTel:"請輸入正確的手機電話號碼/Please Input Correct Telephone Number"})
        }
        this.setState({"val_mobileTel":val_mobileTel})
    }
    
    fax(event){
        this.setState({fax:event.target.value})
        var fax = /^[0-9]*$/;
        var val_fax = event.target.value;

        if(val_fax.length > 0){
            if(fax.test(val_fax)){
                this.setState({"checkFax":true})
                setTimeout(function(){
                    this.setState({info_fax:""});
                }.bind(this), 1000);
            }else{
                this.setState({"checkFax":false})
                this.setState({info_fax:"請輸入正確的傳真號碼/Please Input Correct Fax Number"})
            }
        }
        this.setState({"val_fax":val_fax})
    }    

    contactEmail(event){
        this.setState({contactEmail:event.target.value})
        var contactEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var val_contactEmail = event.target.value;

        if(val_contactEmail.length > 0){
            if(contactEmail.test(val_contactEmail)){
                this.setState({"checkCEmail":true})
                setTimeout(function(){
                    this.setState({info_contactEmail:""});
                }.bind(this), 1000);
            }else{ 
                this.setState({"checkCEmail":false})
                this.setState({info_contactEmail:"請輸入正確的郵箱地址/Please Input Correct Email Address"});
            }
        }
        this.setState({"val_contactEmail":val_contactEmail})
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
                <select value={this.state.DOSchool} onChange={this.schoolDistrict.bind(this)} >
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
                     onChange={this.principalName.bind(this)}
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
                     onChange={this.address.bind(this)} 
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
        const uid = this.user.uid;
        if(this.state.checkCEname === true && this.state.checkEName === true && this.state.checkCCname === true && this.state.checkCEname === true && this.state.checkOfficeTel === true 
            && this.state.checkMobileTel === true && this.state.checkFax === true && this.state.checkCEmail === true ){
            if(this.state.CName.length > 0){
                db.collection("user").doc(uid).update({
                    CName: this.state.CName,
                })
            }
        
            if(this.state.EName.length>0){
                db.collection("user").doc(uid).update({
                    EName: this.state.EName,
                })
            }

            if(this.state.DOSchool !== ''){
                db.collection("user").doc(uid).update({
                    DOSchool: this.state.DOSchool,
                })
            }
            
            if(this.state.PName.length>0){
                db.collection("user").doc(uid).update({
                    PName: this.state.PName,
                })
            }

            if(this.state.contactCname.length>0){
                db.collection("user").doc(uid).update({
                    contactCname: this.state.contactCname,
                })
            }
            
            if(this.state.contactEname.length>0){
                db.collection("user").doc(uid).update({
                    contactEname: this.state.contactEname,
                })
            }

            if(this.state.contactAddress.length>0){
                db.collection("user").doc(uid).update({
                    contactAddress: this.state.contactAddress,
                })
            }

            if(this.state.officeTel.length>0){
                db.collection("user").doc(uid).update({
                    officeTel: this.state.officeTel,
                })
            }

            if(this.state.mobileTel.length>0){
                db.collection("user").doc(uid).update({
                    mobileTel: this.state.mobileTel,
                })
            }

            if(this.state.fax.length>0){
                db.collection("user").doc(uid).update({
                    fax: this.state.fax,
                })
            }

            if(this.state.contactEmail.length>0){
                db.collection("user").doc(uid).update({
                    contactEmail: this.state.contactEmail,
                })
            }
        }else{
            this.setState({info:"ERROR"})
            setTimeout(function(){
                this.setState({info:""})
            }.bind(this),3000);
        }
    }
    
}
export default UpdateSchoolInfor;