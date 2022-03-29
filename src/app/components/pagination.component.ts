import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Paginator } from './common/model';

@Component({
	selector: 'pagination',
	templateUrl: 'pagination.component.html'
})

export class PaginationComponent {
	@Input() pagination : Paginator = new Paginator();
	@Input() totalPages : number = 0;
	@Output() page : EventEmitter<number> = new EventEmitter();
	
	
	pages(){
		let pages = new Array();
		for (let x=this.pagination.page; x < this.pagination.page+3 && x < this.totalPages; x++){
			pages.push(x);
		}
		let length = pages.length;
		for (let x=0; x < Math.min(3, this.totalPages) - length; x++){
			pages.splice(0,0, pages[0]-1);
		}
		return pages;
	}
	
	onPage(page: number){
		//alert("in this.page.emit");
		this.page.emit(page);
	}

}


