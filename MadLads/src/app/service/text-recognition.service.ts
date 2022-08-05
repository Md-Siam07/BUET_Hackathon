import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyImage } from '../shared/image.model';
import { Music } from '../shared/music.model';
import { News } from '../shared/news.model';
import { Note } from '../shared/note.model';
import { Search } from '../shared/search.model';
@Injectable({
  providedIn: 'root'
})
export class TextRecognitionService {

  constructor(private readonly geolocation$: GeolocationService, private http:HttpClient) {
    this.getPosition();
   }

  news: News[] = [];
  musics: Music[] = [];
  tempRes = [];
  tempNews = new News();
  position: any;
  tempMusic = new Music();
  images: MyImage[] = [];
  tempImage = new MyImage();
  searches: Search[] = [];
  tempSearch = new Search();
  flag: boolean = false;
  notes: Note[] = [];
  prev: string = '';

  getPosition() {
    this.geolocation$.subscribe(position => 
     {this.position = position
     console.log(this.position)})
}
  saySpeech(text:any) {
    let reply = "Please say something";
    if (text == null) {
      console.log("MOhsin");
      return;
    }
    if(this.flag == true && !text.includes('stop')){
      console.log('true')
      this.prev = this.prev + text;
    }

    if (text.includes('song')) {
      //this.prev = text
      this.musics = [];
      reply = "la la la"
      if(text.includes('track')){
        console.log(text);
        text = text.substring(11);
        this.http.get(environment.apiBaseUrl + '/music/track:' + text).subscribe(
          (res:any) => {this.tempRes = res;
            console.log(res.length)
          //  var that=this;
           this.tempRes.forEach((tt:any) => {
            console.log(tt);
            this.tempMusic.imageURL = tt.album.images[0].url;
            this.tempMusic.name = tt.album.name;
            this.tempMusic.artist = tt.album.artists[0].name;
            this.tempMusic.track = tt.external_urls.spotify;
            console.log(this.tempMusic);
            this.musics.push(this.tempMusic);
            this.tempMusic = new Music();
           });
          },
          err => console.log(err)
        )
      }
      else if(text.includes('artist')){
        reply = "la la la"
      if(text.includes('artist')){
       // this.prev = text;
        console.log(text);
        text = text.substring(12);
        this.http.get(environment.apiBaseUrl + '/music/artist:' + text).subscribe(
          (res:any) => {this.tempRes = res;
            console.log(res.length)
          //  var that=this;
           this.tempRes.forEach((tt:any) => {
            console.log(tt);
            this.tempMusic.imageURL = tt.album.images[0].url;
            this.tempMusic.name = tt.album.name;
            this.tempMusic.artist = tt.album.artists[0].name;
            this.tempMusic.track = tt.external_urls.spotify;
            console.log(this.tempMusic);
            this.musics.push(this.tempMusic);
            this.tempMusic = new Music();
           });
          },
          err => console.log(err)
        )
      }
      }
      
    } else if (text.includes('news')) {
      //this.prev = text
      reply = "i am fetching the news for you";
      const speech = new SpeechSynthesisUtterance(reply);
      speechSynthesis.speak(speech);
      this.http.post(environment.apiBaseUrl + '/topnews', {'latitude': this.position.coords.latitude, 'longitude': this.position.coords.longitude}).subscribe(
        (res:any) => {this.tempRes = res;
          console.log(res.length)
        //  var that=this;
         this.tempRes.forEach((tt:any) => {
          this.tempNews.headline = tt.description;
          this.tempNews.imageURL = tt.image.thumbnail.contentUrl;
          this.tempNews.normURL = tt.url;

          console.log(this.tempNews);
          this.news.push(this.tempNews);
          this.tempNews = new News();
         });
        },
        err => console.log(err)
       )
      // const ew = this.http.post(environment.apiBaseUrl +'/topnews', {'latitude': this.position.coords.latitude, 'longitude': this.position.coords.longitude} );
      // ew.forEach((e:any) => {
      //   this.tempNews.headline = e.description;
      //      this.tempNews.imageURL = e.image.thumbnail.contentUrl;
      //      this.tempNews.normURL = e.url
      //      console.log(this.tempNews);
      //      this.news.push(this.tempNews);
      // });
    } else if (text.includes('weather')) {
      reply = "Its rainning";
    } else if (text.includes('note') && text.includes("take")) {
      //reply = "Say stop to finish";
      const speech = new SpeechSynthesisUtterance(reply);
      speechSynthesis.speak(speech);
      this.flag=true;
    }
    else if(text.includes('search')) {
      reply = "i am fetching the search result for you";
      const speech = new SpeechSynthesisUtterance(reply);
      speechSynthesis.speak(speech);
      this.searches = [];
      this.images = [];
      text = text.substring(7);
      this.http.post(environment.apiBaseUrl + '/search/', {keyword: text}).subscribe(
        (res:any) =>{
          this.images = res['inline_images'];
          var tempResults = res['organic_results'];
          tempResults.forEach((element:any) => {
            this.tempSearch.link = element.link;
            this.tempSearch.title = element.title;
            this.tempSearch.snippet = element.snippet;
            this.searches.push(this.tempSearch);
            this.tempSearch = new Search();
          });
        }
      )
    }
    else if(text.includes("stop") && this.flag == true){
      this.http.post(environment.apiBaseUrl + '/note', {note: this.prev}).subscribe(
        res => {
          reply = "note added successfully";
          const speech = new SpeechSynthesisUtterance(reply);
          speechSynthesis.speak(speech);
          this.flag = false;
          this.prev = ''
        }
      )
    }

    else if(text.includes("show note")){
      this.http.get(environment.apiBaseUrl+ '/note').subscribe(
        (res:any) => {
          this.notes = res;
          console.log(this.notes)
        }
      )
    }

    if(reply == 'Please say something') {
      return;
    }
    const speech = new SpeechSynthesisUtterance(reply);
    speechSynthesis.speak(speech);
  }
}
