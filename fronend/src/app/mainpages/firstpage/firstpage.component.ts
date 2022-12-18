import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent implements OnInit {

  constructor(private ngZone:NgZone,private router:Router) { }

  ngOnInit(): void {
  
    this.ngZone.run(()=>{
      this.router.navigateByUrl('firstpage/allprofile')
    })
  }

}
