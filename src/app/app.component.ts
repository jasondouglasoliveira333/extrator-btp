import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
	
  public resourcePath = '';

  constructor(private router: Router){
	this.treatImagePath(document.URL);
  }
  
  treatImagePath(url: string){
	//alert(url);
	let slashIdx = url.lastIndexOf("/");
	if  (slashIdx != -1){
		this.resourcePath = url.substring(0, slashIdx);
	}else{
		this.resourcePath = url;
	}
  }
  
  onNavigate(url: string){
	  this.router.navigate([url]);
  }

}