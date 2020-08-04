import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  detailsForm:FormGroup;
  detailsArrayData:any=[];
  invalidForm:boolean;
  detailsObjData:any={};
  index:number;
  changeButton:string;
  isView:boolean;

  constructor(public formBuilder:FormBuilder,
    private modalService: NgbModal,
    private router:Router) { }


  ngOnInit() {

  this.detailsForm = this.formBuilder.group({
    firstName:['',Validators.required],
    middleName:[''],
    lastName:[''],
    dob:[''],
    age:[''],
    gender:[''],
    bg:[''],
    email:[''],
    phone:[''],
})

this.detailsArrayData = (JSON.parse(localStorage.getItem("detailsFormData")) || []);
  }
  
  onSave(){

    this.invalidForm=true;
    if(this.detailsForm.invalid){
      return;
    }else{
      this.invalidForm=false
      this.detailsObjData=this.detailsForm.value;
       this.detailsObjData['isUpdated'] =true; 
       this.detailsForm.reset();
       

      if(this.index == undefined){
        this.detailsArrayData.push(this.detailsObjData);
        localStorage.setItem('detailsFormData',JSON.stringify(this.detailsArrayData));
        this.modalService.dismissAll()
        
      }else{
      this.detailsArrayData[this.index] = this.detailsObjData;
      localStorage.setItem('detailsFormData',JSON.stringify(this.detailsArrayData));
      this.index=undefined;
      this.modalService.dismissAll()
     
      }
    }
  }
  openModal(content) {
    this.modalService.open(content);
    this.isView=false;
    this.changeButton= 'Save'
    this.detailsForm.reset()
  }
  onCancel(){
      this.modalService.dismissAll()  
  }

  onDelete(data,cIndex){
    this.detailsArrayData.splice(cIndex,1);
    localStorage.setItem('detailsFormData',JSON.stringify(this.detailsArrayData));
  }
  onClose(){
      this.modalService.dismissAll()
  }
  // check
  onEdit(data,content,index){
    this.openModal(content);
    this.changeButton='Update'
    this.detailsForm.enable()
    this.detailsForm.controls['firstName'].setValue(data.firstName);
    this.detailsForm.controls['middleName'].setValue(data.middleName);
    this.detailsForm.controls['lastName'].setValue(data.lastName);
    this.detailsForm.controls['dob'].setValue(data.dob);
    this.detailsForm.controls['age'].setValue(data.age);
    this.detailsForm.controls['gender'].setValue(data.gender);
    this.detailsForm.controls['bg'].setValue(data.bg);
    this.detailsForm.controls['email'].setValue(data.email);
    this.detailsForm.controls['phone'].setValue(data.phone);
    this.index = index;
    
  }

  onView(data,content,index){
    this.onEdit(data,content,index)
    this.isView = true;
    this.detailsForm.disable()
    
  }
 
}