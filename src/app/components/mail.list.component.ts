import { Component, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Paginator } from './common/model';

@Component({
  selector: 'mail-list',
  templateUrl: './mail.list.component.html'
})
export class MailListComponent implements OnDestroy{
	private baseApi = environment.baseApi + "api/extrator/";
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();
	
	public officePanelVisible: boolean = true;
	public mailConfigPanelVisible: boolean = false;
	public loginOauth2MicrosoftApi = environment.loginOauth2MicrosoftApi;
	private logoutOauth2Microsoft ="https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=https%3A%2F%2Fextrator-job.cfapps.us10.hana.ondemand.com%2FaccessCodeCallback&state=1";

	private corporationId : string = '';
	public corporationName : string = '';

	public mailConfiguration: any;
	public mailInfo: MailInfo = new MailInfo();

	public host: string = 'Hi';

	private intervalId : number;

	public protocols: string[] = ['IMAP', 'POP'];

	public resourcePath = '';
  
	constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router){
		this.corporationId = this.route.snapshot.paramMap.get("id")!;
		this.loadCorporationName();
		this.refreshUser();
		this.treatImagePath(document.URL);
		//ESTSAUTH
		//ESTSAUTHPERSISTENT
		this.intervalId = setInterval(() => this.refreshUser(), 10000);
	}
  
  loadCorporationName(){
	this.http.get(this.baseApi + `corporations/${this.corporationId}`)
	.subscribe((response : any) => {
		this.corporationName = response.name;
	});
  }
  
  onMicrosoftLogin(){
	  document.open(this.loginOauth2MicrosoftApi + this.corporationId, '', '');
  }  
  
  onMicrosoftLogout(){
	  document.open(this.logoutOauth2Microsoft, '', '');
  }
  
  treatImagePath(url: string){
	//alert(url);
	let slashIdx = url.lastIndexOf("/index.html/");
	if  (slashIdx != -1){
		this.resourcePath = url.substring(0, slashIdx);
	}else{
		this.resourcePath = url;
	}
  }
  
  showOfficePanelVisible(officePanelVisible: boolean){
	this.officePanelVisible = officePanelVisible;
  }
  
  ngOnDestroy(){
	  clearInterval(this.intervalId);
  }

  refreshUser(){
    this.http.get(this.baseApi + `corporations/${this.corporationId}/mailConfigurations`).
	  subscribe(response => {
		 //alert("response:" + JSON.stringify(response));xx
		 this.mailConfiguration = response; 
	  });
  }
  
  onSaveMailInfo(){
	  //alert(JSON.stringify(this.mailInfo));
	  if (this.validMailInfo() == false){
		  alert('Todos os campos são obrigatório');
	  }else{
		  //if (this.mailInfo.id == null){
			this.createMailInfo();
		  //}else{
			//this.updateMailInfo();
		  //}
		  this.mailConfigPanelVisible = false;
	  }
  }
  
  onBack(){
	  this.router.navigate(['']);
  }
  
  createMailInfo(){
    //let mailInfoObject = JSON.stringify(this.mailInfo);
	//for some reason the server apparently is blocking CORS
	let mailInfoObject = this.generateFormEnconder();
    this.http.post(this.baseApi + `corporations/${this.corporationId}/mailConfigurations`, mailInfoObject,
	{headers : {"Content-Type": "application/x-www-form-urlencoded"}}).
	  subscribe(response => {
		 alert("salvo: ");
		 this.refreshUser(); //to bring the id together
	  });
  }

  updateMailInfo(){
    let mailInfoJson = JSON.stringify(this.mailInfo);
    this.http.put(this.baseApi + `corporations/${this.corporationId}/mailConfigurations`, mailInfoJson,
	  {headers : {"Content-Type": "application/json"}}).
	  subscribe(response => {
		 alert("salvo: ");
		 this.refreshUser(); //to bring the id together
	  });
  }

  onAddMailInfo(){
	this.mailInfo = new MailInfo(); 
	this.mailConfigPanelVisible = true;
  }
  
  onDelete(mi: MailInfo){
	let mailInfoService = "/1/mailInfos/" + mi.id;
	this.http.get(this.baseApi + `corporations/${this.corporationId}/mailConfigurations` + mailInfoService).
	  subscribe(response => {
		 this.refreshUser(); //to bring the id together
	  });
  }

  onDeleteMailOutlook(moi: MailOutlook){
	let mailOutlookService = "/1/mailOutlooks/" + moi.id;
	this.http.get(this.baseApi + `corporations/${this.corporationId}/mailConfigurations` + mailOutlookService).
	  subscribe(response => {
		 this.refreshUser(); //to bring the id together
	  });
  }
  
  generateFormEnconder(){
	let params = "";
	if (this.mailInfo.id != null) {
		params = "id=" + this.mailInfo.id + "&"; 
	}
	params += "host=" + this.mailInfo.host + 
		"&port=" + this.mailInfo.port + 
		"&protocol=" + this.mailInfo.protocol + 
		"&username=" + this.mailInfo.username + 
		"&password=" + this.mailInfo.password;
	return params;
  }
  
  validMailInfo(){
	  let valid = true;
	  if (this.mailInfo.host.trim() == ''){
		  valid = false;
	  }
	  if ((this.mailInfo.port + "").trim() == ''){
		  valid = false;
	  }
	  if (this.mailInfo.protocol.trim() == ''){
		  valid = false;
	  }
	  if (this.mailInfo.username.trim() == ''){
		  valid = false;
	  }
	  if (this.mailInfo.password.trim() == ''){
		  valid = false;
	  }
	  return valid;
  }
  
  onPortKeyup(e: any){
	  //alert("e.keyCode:" + e.keyCode);
	  console.log(e);
	let specialKeys = [8, 37, 38, 39, 40, 46];
	let numberKeys = [49, 50, 51, 52, 53, 54, 55, 56, 57];
	if (specialKeys.includes(e.keyCode) ||
		(numberKeys.includes(e.keyCode)  && (this.mailInfo.port + "").length < 5)){
		return true;
	}else{
		return false;
	}
  }
  
  onPage(page: number){
	if (page >= 0 && page < this.totalPages){
		this.pagination.page=page;
	}
  }	
}

class MailInfo{
	public id: number | null = null;
	public host: string = '';
	public port: string = '';
	public protocol: string = '';
	public username: string = '';
	public password: string = '';
}

class MailOutlook{
	public id: number | null = null;
	public email: string = '';
	public accessToken: string = '';
}