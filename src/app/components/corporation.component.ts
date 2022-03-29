import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Component({
	selector : 'corporation',
	templateUrl : './corporation.component.html'
})

export class CorporationComponent {
	private baseApi = environment.baseApi + "/api/extrator/";
	public corporation: any = { 'id': 0, 'sapConfId': '0'};
	public file : any = null;
	
	constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute){
		let id = this.route.snapshot.paramMap.get("id")!;
		if (id){
			this.loadCorporation(id);
		}
	}

	loadCorporation(id: string){
		this.http.get(this.baseApi + `corporations/${id}`)
		.subscribe((response) => {
			this.corporation = response;
		});
	}
	
	onOpenUpload(){
		let fileInput = document.getElementById('fileInput');
		if (fileInput){
			fileInput.click();
		}
	}
	
    onSelectFiles(e: any) {
		let files = e.target.files;
        this.file = files.item(0);
    }

	onSave(){
		if (!this.valid()){
			alert("Todos os campos são obrigatorios");
			return;
		}
		const formData = new FormData();
		formData.append('file', this.file);
		formData.append('id', this.corporation.id);
		formData.append('name', this.corporation.name);
		formData.append('rootCnpj', this.corporation.rootCnpj);
		formData.append('retroativeDays', this.corporation.retroativeDays);
		formData.append('certificatePassword', this.corporation.certificatePassword);
		formData.append('sapConfId', this.corporation.sapConfId);
		formData.append('sapConfDestinationName', this.corporation.sapConfDestinationName);
		formData.append('sapConfEntryPoint', this.corporation.sapConfEntryPoint);
		this.http.post(this.baseApi + "/corporations", formData)
		.subscribe(response => {
			this.corporation = {};
			this.file = null;
			alert("Upload realizado com sucesso");
		}, error => {
			alert("Error realizando o upload");
		});
	}
	
	onBack(){
		this.router.navigate([""]);
	}
	
	valid(){
		if (this.file == null && this.corporation.certificateFileName == null){
			return false;
		}
		if (!this.corporation.rootCnpj || this.corporation.rootCnpj == ''){
			return false;
		}
		if (!this.corporation.retroativeDays || this.corporation.retroativeDays == ''){
			return false;
		}
		if (!this.corporation.certificatePassword || this.corporation.certificatePassword == ''){
			return false;
		}
		if (!this.corporation.certificatePassword || this.corporation.certificatePassword == ''){
			return false;
		}
		if (!this.corporation.sapConfDestinationName || this.corporation.sapConfDestinationName == ''){
			return false;
		}
		if (!this.corporation.sapConfEntryPoint || this.corporation.sapConfEntryPoint == ''){
			return false;
		}
		return true;
	}
}