import { Services } from "src/Entity/services.entity";
import axios from 'axios';
import { async } from "rxjs";

const WEATHER_KEY = 'd0b75ab1ccfac5da6375fabf2317855d'
const CRYPTO_KEY = '0db0fb93-ff9b-424e-82a3-dac92075cd15'
const YOUTUBE_KEY = 'AIzaSyAzRjtIIArBc34Q8Y-fyDWAfYqAkMlvK40'
const PANDASCORE_KEY = 'XEhyuc0SyFRQeHLfA447QJkFPFS2f5Ois4PWL5GcrmeqR5S4OPY'
const GITHUB_KEY = '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'
const INTRA_AERKEY = ''
const RIOT_KEY = 'RGAPI-c22f333f-2dd8-4a03-89fc-90b6769228ae'

async function weather(service: Services): Promise<number> {
  // axios.get weather api call here
  const weather = (await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${service.actionparams}&appid=${WEATHER_KEY}`)).data

  return Math.round((weather.main.temp - 273.15) * 100) / 100
}

async function timer(service: Services): Promise<number> {
  // return timer value here
  return Math.round(new Date(service.actionparams).getTime() / 1000)
}

async function currency(service: Services): Promise<number> {
  //axios.get currency api call to get the current price of the currency service.actionparams by coinmarketcap
  const req = (await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin`)).data
  
  return req.market_data.current_price.usd
}

async function covid(service: Services): Promise<number> {
  //axios.get covid api call to get the current cases of the country service.actionparams
  const req = (await axios.get(`https://disease.sh/v3/covid-19/countries/${service.actionparams}`)).data
  return req.cases
}

async function dayOrNight(service: Services): Promise<number> {
  //axios.get dayornight api tell if it is day or night
  const req = (await axios.get(`https://api.sunrise-sunset.org/json?lat=${service.actionparams.split(',')[0]}&lng=${service.actionparams.split(',')[1]}&date=today`)).data
  if (req.results.day_length > req.results.civil_twilight_begin) {
    return 1
  }
  return 0
}

async function YoutubeViewCount(service: Services): Promise<number> {
  //axios.get youtube api call to get the current view count of the content creator service.actionparams
  const req = (await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${service.actionparams}&key=${YOUTUBE_KEY}`)).data
  return req.items[0].statistics.viewCount
}

async function YoutubeSubscriberCount(service: Services): Promise<number> {
  //axios.get youtube api call to get the current subscriber count of the content creator service.actionparams
  const req = (await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${service.actionparams}&key=${YOUTUBE_KEY}`)).data
  return req.items[0].statistics.subscriberCount
}

async function YoutubeVideoCount(service: Services): Promise<number> {
  //axios.get youtube api call to get the current Video count of the content creator service.actionparams
  const req = (await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${service.actionparams}&key=${YOUTUBE_KEY}`)).data
  return req.items[0].statistics.videoCount
}

async function YoutubeVideoViewCount(service: Services): Promise<number> {
  //axios.get youtube api call to get the current like count of the content creator service.actionparams
  const req = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${service.actionparams}&key=${YOUTUBE_KEY}`)).data
  return req.items[0].statistics.viewCount
}

async function YoutubeVideolikeCount(service: Services): Promise<number> {
  //axios.get youtube api call to get the current like count of the content creator service.actionparams
  const req = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${service.actionparams}&key=${YOUTUBE_KEY}`)).data
  return req.items[0].statistics.likeCount
}

async function YoutubeCommentCount(service: Services): Promise<number> {
  //axios.get youtube api call to get the current like count of the content creator service.actionparams
  const req = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${service.actionparams}&key=${YOUTUBE_KEY}`)).data
  return req.items[0].statistics.commentCount
}

async function NumberChampValorant(service: Services): Promise<number> {
  //axios.get valorant api call to get the current number of champion in the valorant game
  const req = (await axios.get(`https://api.pandascore.co/valorant/agents?sort=&page=1&per_page=100`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data
  return req.length
}

async function NumberChampOverwatch(service: Services): Promise<number> {
  //axios.get Overwatch api call to get the current number of champion in the overwatch game
  const req = (await axios.get(`https://api.pandascore.co/overwatch/agents?sort=&page=1&per_page=50`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data
  return req.length
}

async function NumberChampLol(service: Services): Promise<number> {
  //axios.get Lol api call to get the current number of champion in the lol game

  const req1 = (await axios.get(`https://api.pandascore.co/lol/champions?sort=&page=1&per_page=100`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data
  const req2 = (await axios.get(`https://api.pandascore.co/lol/champions?sort=&page=2&per_page=100`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data

  return req1.length + req2.length
}

async function NumberItemsLol(service: Services): Promise<number> {
  //axios.get Lol api call to get the current number of items in the lol game
  const pages = 3
  let items = 0
  for (let i = 1; i <= pages; i++) {
    const req = (await axios.get(`https://api.pandascore.co/lol/items?sort=&page=${i}&per_page=100`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data
    items += req.length
    if (req.length < 100) {
      return items
    }
  }
  return items
}

async function NumberSpellLol(service: Services): Promise<number> {
  //axios.get Lol api call to get the current number of spells in the lol game
  const pages = 1
  let spells = 0
  for (let i = 1; i <= pages; i++) {
    const req = (await axios.get(`https://api.pandascore.co/lol/spells?sort=&page=${i}&per_page=100`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data
    spells += req.length
    if (req.length < 100) {
      return spells
    }
  }
  return spells
}

async function NumberRunesLol(service: Services): Promise<number> {
  //axios.get Lol api call to get the current number of runes in the lol game
  let runes = 0
  while(true) {
    const req = (await axios.get(`https://api.pandascore.co/lol/runes?sort=&page=${runes+1}&per_page=100`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data
    runes += req.length
    if (req.length < 100) {
      return runes
    }
  }
}


async function NumberMasteriesLol(service: Services): Promise<number> {
  //axios.get Lol api call to get the current number of masteries in the lol game
  const pages = 3
  let masteries = 0
  for (let i = 1; i <= pages; i++) {
    const req = (await axios.get(`https://api.pandascore.co/lol/masteries?sort=&page=${i}&per_page=100`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data
    masteries += req.length
    if (req.length < 100) {
      return masteries
    }
  }
  return masteries
}

async function NumberChampDota2(service: Services): Promise<number> {
  //axios.get dota2 api call to get the current number of champion in the dota2 game
  const pages = 6
  let champions = 0
  for (let i = 1; i <= pages; i++) {
    const req = (await axios.get(`https://api.pandascore.co/dota2/champions?sort=&page=${i}&per_page=100`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data
    champions += req.length
    if (req.length < 100) {
      return champions
    }
  }
  return champions
}

async function NumberItemsDota2(service: Services): Promise<number> {
  //axios.get dota2 api call to get the current number of items in the dota2 game
  let Items = 0
  while(true) {
    const req = (await axios.get(`https://api.pandascore.co/dota2/items?sort=&page=${Items}&per_page=100`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data
    Items += req.length
    if (req.length < 100) {
      return Items
    }
  }
}

async function NumberAbilitiesDota2(service: Services): Promise<number> {
  //axios.get dota2 api call to get the current number of abilities in the dota2 game
  let Abilities = 0
  while(true) {
    const req = (await axios.get(`https://api.pandascore.co/dota2/abilities?sort=&page=${Abilities}&per_page=100`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data
    Abilities += req.length
    if (req.length < 100) {
      return Abilities
    }
  }
}

async function NumberWeaponsCSGO(service: Services): Promise<number> {
  //axios.get csgo api call to get the current number of weapons in the csgo game
  let Weapons = 0
  while(true) {
    const req = (await axios.get(`https://api.pandascore.co/csgo/weapons?sort=&page=${Weapons}&per_page=100`, { headers: { Authorization: `Bearer ${PANDASCORE_KEY}` } })).data
    Weapons += req.length
    if (req.length < 100) {
      return Weapons
    }
  }
}

async function publicReposGithub(service: Services): Promise<number> {
  //axios.get github api call to get the current number of public repos in the github account
  const req = (await axios.get(`https://api.github.com/users/${service.actionparams}`, { headers: { Authorization: `Bearer ${GITHUB_KEY}` } })).data
  return req.public_repos
}

async function followersGithub(service: Services): Promise<number> {
  //axios.get github api call to get the current number of public repos in the github account
  const req = (await axios.get(`https://api.github.com/users/${service.actionparams}`, { headers: { Authorization: `Bearer ${GITHUB_KEY}` } })).data
  return req.followers
}

async function followingGithub(service: Services): Promise<number> {
  //axios.get github api call to get the current number of public repos in the github account
  const req = (await axios.get(`https://api.github.com/users/${service.actionparams}`, { headers: { Authorization: `Bearer ${GITHUB_KEY}` } })).data
  return req.following
}

async function nbBranchesInProjectGithub(service: Services): Promise<number> {
  //axios.get github api call to get the current number of public repos in the github account
  const req = (await axios.get(`https://api.github.com/repos/${service.actionparams.split(',')[0]}/${service.actionparams.split(',')[1]}/branches}`, { headers: { Authorization: `Bearer ${GITHUB_KEY}` } })).data
  return req.length
}

async function studentGPA(service: Services): Promise<number> {
  // Get GPA from the student's profile
  const req = (await axios.get(`${INTRA_AERKEY}/user/${service.actionparams}/?format=json`)).data
  return req.gpa[0].gpa
}

async function studentSemesters(service: Services): Promise<number> {
  // Get  from the student's profile
  const req = (await axios.get(`${INTRA_AERKEY}/user/${service.actionparams}/?format=json`)).data
  return req.semester
}

async function studentCredits(service: Services): Promise<number> {
  // Get  from the student's profile
  const req = (await axios.get(`${INTRA_AERKEY}/user/${service.actionparams}/?format=json`)).data
  return req.credits
}

async function studentActive(service: Services): Promise<number> {
  // Get  from the student's profile
  const req = (await axios.get(`${INTRA_AERKEY}/user/${service.actionparams}/?format=json`)).data
  return req.nsstat.active
}

async function lolSumonersLvl(service: Services): Promise<number> {
  //axios.get lol api call to get the current level of the summoner in the lol game
  const req = (await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${service.actionparams}`, { headers: {"X-Riot-Token": `${RIOT_KEY}`}})).data
  return req.summonerLevel
}

async function TFTSumonersLvl(service: Services): Promise<number> {
  //axios.get lol api call to get the current level of the summoner in the lol game
  const req = (await axios.get(`https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${service.actionparams}`, { headers: {"X-Riot-Token": `${RIOT_KEY}`}})).data
  return req.summonerLevel
}

// async function Template(service: Services): Promise<number> {
//
//   const req =
//   return req.
// }

export async function checkAction(service: Services): Promise<number> {
  switch ((service.action).toLowerCase().split(' ').join('')) {
    case 'weather':
        return await weather(service)
    case 'timer':
      return await timer(service)
    case 'currency':
      return await currency(service)
    case 'covid':
      return await covid(service)
    case 'dayornight':
      return await dayOrNight(service)
    case 'youtubeviewcount':
      return await YoutubeViewCount(service)
    case 'youtubesubscribercount':
      return await YoutubeSubscriberCount(service)
    case 'youtubevideocount':
      return await YoutubeVideoCount(service)
    case 'youtubevideoviewcount':
      return await YoutubeVideoViewCount(service)
    case 'youtubevideolikecount':
      return await YoutubeVideolikeCount(service)
    case 'youtubecommentcount':
      return await YoutubeCommentCount(service)
    case 'numberchampvalorant':
      return await NumberChampValorant(service)
    case 'numberchampoverwatch':
      return await NumberChampOverwatch(service)
    case 'numberchamplol':
      return await NumberChampLol(service)
    case 'numberitemslol':
      return await NumberItemsLol(service)
    case 'numberspelllol':
      return await NumberSpellLol(service)
    case 'numberruneslol':
      return await NumberRunesLol(service)
    case 'numbermasterieslol':
      return await NumberMasteriesLol(service)
    case 'numberchampdota2':
      return await NumberChampDota2(service)
    case 'numberitemsdota2':
      return await NumberItemsDota2(service)
    case 'numberabilitiesdota2':
      return await NumberAbilitiesDota2(service)
    case 'numberweaponscsgo':
      return await NumberWeaponsCSGO(service)
    case 'publicreposgithub':
      return await publicReposGithub(service)
    case 'followersgithub':
      return await followersGithub(service)
    case 'followinggithub':
      return await followingGithub(service)
    case 'nbBranchesinprojectgithub':
      return await nbBranchesInProjectGithub(service)
    case 'studentgpa':
      return await studentGPA(service)
    case 'studentsemesters':
      return await studentSemesters(service)
    case 'studentcredits':
      return await studentCredits(service)
    case 'studentactive':
      return await studentActive(service)
    case 'lolsumonerslvl':
      return await lolSumonersLvl(service)
    case 'tftsumonerslvl':
      return await TFTSumonersLvl(service)
    default:
      return 0
  }
}

/* 
dota & overwatch & csgo
nbBranchesInProjectGithub
*/