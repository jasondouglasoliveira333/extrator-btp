import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Paginator } from './common/model';


@Component({
	selector: 'corporation-list',
	templateUrl: './corporation.list.component.html'
})
export class CorporationListComponent {
	private baseApi = environment.baseApi + "api/extrator/";
	public corporations : any[] = [];
	public pagination : Paginator = new Paginator();
	public totalPages : number = 0;
	
	
	constructor(private router: Router, private http: HttpClient ){
		this.loadCorporations();
	}
	
	private loadCorporations(){
		this.http.get(this.baseApi + `corporations?page=${this.pagination.page}&size=${this.pagination.size}`)
		.subscribe((response : any) => {
			this.corporations = response.content;
			this.totalPages = response.totalPages;
		}, error => {
			alert("Error getting corporations");
		});
	}
	
	onAdd(){
		this.router.navigate(['corporation']);
	}
	
	onEdit(id: number){
		this.router.navigate(['corporation', { 'id' : id }]);
	}
	
	onEditSubsidiaries(id: number){
		this.router.navigate(['subsidiary-list', { 'id' : id }]);
	}
	
	onEditMails(id: number){
		this.router.navigate(['mail-list', { 'id' : id }]);
	}
	
	onDelete(id:number){
		this.http.get(this.baseApi + `corporations/${id}/D`)//Problems with CORS in BTP
		.subscribe((response : any) => {
			this.loadCorporations();
			alert("Corporation deleted sucessfully");
			
		}, error => {
			alert("Error getting corporations");
		});
	}
	
	onRunJobs(){
		this.http.get(this.baseApi + `corporations/1/runJobs`)
		.subscribe((response : any) => {
			alert("Job ran");
		}, error => {
			alert("Error runing jobs");
		});
	}
	
	onPage(page: number){
		//alert("onPage:" + page);
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			this.loadCorporations();
		}
	}
}

