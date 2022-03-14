import {
  Injectable, Req,
} from '@nestjs/common';

const fs = require('fs');

@Injectable()
export class AboutService {
  time: Date = new Date();

  aboutJson(req: any) : any {
    const aboutData = {
      "client": {
        "host": ""
      },
      "server": {
        "current_time": 0,
        "services": [
          {
            "name": "Weather",
            "action": [
              {
                "actions": "getWeather",
                "description": "be aware of the weather"
              }
            ]
          },
          {
            "name": "Currency",
            "action": [
              {
                "actions": "getCurrency",
                "description": "get the current currency rate"
              }
            ]
          },
          {
            "name": "Covid",
            "action": [
              {
                "actions": "getCovid",
                "description": "get the number covid infected"
              }
            ]
          },
          {
            "name": "Day or Night",
            "action": [
              {
                "actions": "getDayOrNight",
                "description": "get the current day or night"
              }
            ]
          },
          {
            "name": "Youtube",
            "action": [
              {
                "name": "Youtube views count",
                "description": "youtube alert you when the view count of an account is up to your desired value"
              },
              {
                "name": "Youtube subscribers count",
                "description": "youtube alert you when the subscriber count of an account is up to your desired value"
              },
              {
                "name": "Youtube videos count",
                "description": "Youtube alert you when the number of video from an account is up to your desired value"
              },
              {
                "name": "Youtube video views count",
                "description": "Youtube alert you when the view count of a video is up to your desired value"
              },
              {
                "name": "Youtube likes count",
                "description": "Youtube alert you when the like count of a video is up to your desired value"
              },
              {
                "name": "Youtube comment count",
                "description": "Youtube alert you when the comment count of a video is up to your desired value"
              }
            ]
          },
          {
            "name": "Panda Score",
            "action": [
              {
                "name": "Number champ Valorant",
                "description": "Number of champ Valorant alert you when the number of champ Valorant is up to your desired value"
              },
              {
                "name": "Number champ Overwatch",
                "description": "Number of champ Overwatch alert you when the number of champ Valorant is up to your desired value"
              },
              {
                "name": "Number champ Overwatch",
                "description": "Number of champ Overwatch alert you when the number of champ Valorant is up to your desired value"
              },
              {
                "name": "Number champ Lol",
                "description": "Number of champ Lol alert you when the number of champ Valorant is up to your desired value"
              },
              {
                "name": "Number items Lol",
                "description": "Number of Items Lol alert you when the number of champ Valorant is up to your desired value"
              },
              {
                "name": "Number spell Lol",
                "description": "Number of spell Lol alert you when the number of champ Valorant is up to your desired value"
              },
              {
                "name": "Number Runes Lol",
                "description": "Number of Runes Lol alert you when the number of champ Valorant is up to your desired value"
              },
              {
                "name": "Number masteries Lol",
                "description": "Number of masteries Lol alert you when the number of champ Valorant is up to your desired value"
              },
              {
                "name": "Number champ Dota2",
                "description": "Number of champ Dota2 alert you when the number of champ Valorant is up to your desired value"
              },
              {
                "name": "Number items Dota2",
                "description": "Number of items Dota2 alert you when the number of champ Valorant is up to your desired value"
              },
              {
                "name": "Number abilities Dota2",
                "description": "Number of abilities Dota2 alert you when the number of champ Valorant is up to your desired value"
              },
              {
                "name": "Number weapons CSGO",
                "description": "Number of weapons CSGO alert you when the number of champ Valorant is up to your desired value"
              }
            ]
          },
          {
            "name": "Github",
            "action": [
              {
                "name": "public Repos Github",
                "description": "check if the number of public repos on Github is up to your desired value"
              },
              {
                "name": "followers Github",
                "description": "check if the number of followers on Github is up to your desired value"
              },
              {
                "name": "following Github",
                "description": "check if the number of following on Github is up to your desired value"
              },
              {
                "name": "nb Branches in project Github",
                "description": "check if the nb Branches in project Github is up to your desired value"
              }
            ]
          },
          {
            "name": "Epitech",
            "action": [
              {
                "name": "student Credits",
                "description": "check if the student credits is up to your desired value"
              },
              {
                "name": "student Active",
                "description": "check if the student Active is up to your desired value"
              },
              {
                "name": "student Semesters",
                "description": "check if the student Semesters is up to your desired value"
              },
              {
                "name": "student GPA",
                "description": "check if the student GPA is up to your desired value"
              }
            ]
          },
          {
            "name": "LOL",
            "action": [
              {
                "name": "lol sumoners lvl",
                "description": "check if the lol sumoners lvl is up to your desired value"
              },
              {
                "name": "tft sumoners lvl",
                "description": "check if the tft sumoners lvl is up to your desired value"
              }
            ]
          },
          {
            "name": "Gmail",
            "reaction": [
              {
                "name": "Gmail",
                "description": "send a mail to your gmail account"
              }
            ]
          },
          {
            "name": "Notification",
            "reaction": [
              {
                "name": "Notification",
                "description": "send a notification to your account"
              }
            ]
          },
          {
            "name": "Door",
            "reaction": [
              {
                "name": "Door",
                "description": "Open the door"
              }
            ]
          }
        ]
      }
    }
     
    aboutData.server.current_time = (new Date()).getTime() - this.time.getTime();
    aboutData.client.host = req.ip.slice(7);
    return (aboutData)
  }
}