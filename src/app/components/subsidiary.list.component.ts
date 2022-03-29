import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Paginator } from './common/model';

@Component({
	selector : 'subsidiary-list',
	templateUrl: 'subsidiary.list.component.html'
})

export class SubsidiaryListComponent {
	private baseApi = environment.baseApi + "api/extrator/";
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();

	private corporationId : string = '';
	public corporationName : string = '';
	public subsidiaries: any[] = [];
	public subsidiariesFull: any[] = [];
	
	public subsidiary: any = {};
	
	constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient){
		this.corporationId = this.route.snapshot.paramMap.get('id')!;
		this.loadCorporationName();
		this.loadSubsidiaries();
	}
	
	loadCorporationName(){
		this.http.get(this.baseApi + `corporations/${this.corporationId}`)
		.subscribe((response : any) => {
			this.corporationName = response.name;
		});
	}
	
	loadSubsidiaries(){
		this.http.get(this.baseApi + `corporations/${this.corporationId}/subsidiaries?page=0&size=1000`)
		.subscribe((response : any) => {
			this.subsidiariesFull = response.content;
			this.totalPages = this.calcPages();
			//alert("this.totalPages:" + this.totalPages);
			this.subsidiaries = this.subsidiariesFull.slice(0, this.pagination.size);
		});
	}
	
	calcPages(){
		let pages = Math.trunc(this.subsidiariesFull.length / this.pagination.size);
		if (this.subsidiariesFull.length%this.pagination.size != 0){
			pages++;
		}
		return pages;
	}
	
	valid(){
		if (!this.subsidiary.cnpj || this.subsidiary.cnpj == ''){
			return false;
		}
		
		if (!this.subsidiary.provinceCode || this.subsidiary.provinceCode == ''){
			return false;
		}
		
		if (!this.subsidiary.townhallUrl || this.subsidiary.townhallUrl == ''){
			return false;
		}
		
		return true;
	}
	
	onDelete(id: number){
		this.http.get(this.baseApi + `corporations/${this.corporationId}/subsidiaries/${id}/D`)//Problems with CORS in BTP
		.subscribe(() => {
			alert("subsidiary excluido com sucesso");
			this.loadSubsidiaries();
		});
	}
	
	onAdd(){
		if (!this.valid()){
			alert("Todos os campos são oberigatório");
			return;
		}
		
		this.subsidiariesFull.splice(0,0,this.subsidiary);
		this.subsidiary = {};
		this.totalPages = this.calcPages(); 
		this.onPage(this.pagination.page);
	}
	
	onSave(){
		this.http.post(this.baseApi +  `corporations/${this.corporationId}/subsidiaries`, this.subsidiariesFull,
		{headers : {"Content-Type": "text/plain"}}//To solve problema with CORS in BTP
		)
		.subscribe((response : any) => {
			alert("Subsidiaries save");
		}, error => {
			alert("Erro saving subsidiaries");
		});

	}

	onBack(){
		this.router.navigate([""]);
	}
	
	onPage(page: number){
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			let start = this.pagination.page*this.pagination.size;
			this.subsidiaries = this.subsidiariesFull.slice(start, start + this.pagination.size);
		}
	}	
}