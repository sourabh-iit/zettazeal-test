import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public langData: any = {};
  public currLang = "";

  constructor(
    private http: HttpClient
  ) {
    this.currLang = localStorage.getItem("langPref");
    if(this.currLang == null) {
      this.currLang = navigator.language;
      if(this.currLang.split('-').length > 1) {
        this.currLang = this.currLang.split('-')[0];
      }
    }
    this.loadLangData();
  }

  loadLangData() {
    localStorage.setItem("langPref", this.currLang);
    this.http.get(`/api/loadLangData?lang=${this.currLang}`).subscribe((res: any) => {
      console.log(res);
      if(res.success) {
        this.langData = res.data;
      } else {
        console.log(res.error);
      }
    });
  }
}
