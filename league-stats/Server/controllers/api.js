

module.exports = {
    getPlayer: async (req, res) => {
      try {
        // Use incoming player name from client to search for the player and return info including puuid:
        let getPlayerInfo = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.id}?api_key=${process.env.LOL_API_KEY}`)
        // returns an object with multiple player properties, including name and puuid
        let player = await getPlayerInfo.json()
        let playerName = player.name
        let puuid = player.puuid

        // Use puuid to search for the recent match history of the player
        let getMatchIdList = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=15&api_key=${process.env.LOL_API_KEY}`)
        // returns an array of match ids
        let matches = await getMatchIdList.json()

        // Use .map to create an array of stats from each match. callback sends api request for the game details, creates stats object for the details we care about and returns the stats object to the array:
        let allMatchData = await Promise.all(matches.map(async (matchId) => {
          let getMatchData = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.LOL_API_KEY}`)
          let matchData = await getMatchData.json()

          // get index of the player by puuid from metadata section returned
          let playerIndex = matchData['metadata']['participants'].indexOf(puuid)
          // use index to pull details for specific player
          let playerGameDetails = matchData['info']['participants'][playerIndex]

          // get opponent
          const inversePosition = {
            0: 5,
            1: 6,
            2: 7,
            3: 8,
            4: 9,
            5: 0,
            6: 1,
            7: 2,
            8: 3,
            9: 4,
          }
          let opponent = matchData['info']['participants'][inversePosition[playerIndex]]

          //Organize Meaningful stats from that game
          let stats = {
            "win": playerGameDetails['win'],

            'KDA': {
              "kills": playerGameDetails['kills'],
              "deaths": playerGameDetails['deaths'],
              "assists": playerGameDetails['assists'],
              "takedowns": playerGameDetails['challenges']['takedowns'],
              "kda": playerGameDetails['challenges']['kda'],
              'diff_kda': playerGameDetails['challenges']['killParticipation'] - opponent['challenges']['killParticipation'],
              "killParticipation": playerGameDetails['challenges']['killParticipation'],
              "diff_kp": playerGameDetails['challenges']['killParticipation'] - opponent['challenges']['killParticipation'],
            },

            'Damage': {
              "teamDamagePercentage": playerGameDetails['challenges']['teamDamagePercentage'],
              "damagePerMinute": playerGameDetails['challenges']['damagePerMinute'],
              "damageTakenOnTeamPercentage": playerGameDetails['challenges']['damageTakenOnTeamPercentage'],
              "totalDamageDealt": playerGameDetails['totalDamageDealt'],
              "totalDamageDealtToChampions": playerGameDetails['totalDamageDealtToChampions'],
              "diff_champDamage": playerGameDetails['totalDamageDealtToChampions'] - opponent['totalDamageDealtToChampions'],
            },
            
            'Vision': {
              "visionScoreAdvantageLaneOpponent": playerGameDetails['challenges']['visionScoreAdvantageLaneOpponent'],
              "visionScorePerMinute": playerGameDetails['challenges']['visionScorePerMinute'],
              "diff_visionScorePerMinute": playerGameDetails['challenges']['visionScorePerMinute'] - opponent['challenges']['visionScorePerMinute'],
              "wardTakedowns": playerGameDetails['challenges']['wardTakedowns'],
              "diff_wardTakedowns": playerGameDetails['challenges']['wardTakedowns'] - opponent['challenges']['wardTakedowns'],
              "wardTakedownsBefore20M": playerGameDetails['challenges']['wardTakedownsBefore20M'],
              "wardsGuarded": playerGameDetails['challenges']['wardsGuarded'],
              "controlWardTimeCoverageInRiverOrEnemyHalf": playerGameDetails['challenges']['controlWardTimeCoverageInRiverOrEnemyHalf'],
              "visionScore": playerGameDetails['visionScore'],
              "diff_visionScore": playerGameDetails['visionScore'] - opponent['visionScore'],
              "visionWardsBoughtInGame": playerGameDetails['visionWardsBoughtInGame'],
              "diff_visionWardsBoughtInGame": playerGameDetails['visionWardsBoughtInGame'] - opponent['visionWardsBoughtInGame'],
              "wardsKilled": playerGameDetails['wardsKilled'],
              "diff_wardsKilled": playerGameDetails["wardsKilled"] - opponent['wardsKilled'],
              "wardsPlaced": playerGameDetails['wardsPlaced'],
              "diff_wardsPlaced": playerGameDetails["wardsPlaced"] - opponent["wardsPlaced"],
              "controlWardsPlaced": playerGameDetails['challenges']['controlWardsPlaced'],
              "diff_controlWardsPlaced": playerGameDetails['challenges']['controlWardsPlaced'] - opponent['challenges']['controlWardsPlaced'],
              "stealthWardsPlaced": playerGameDetails['challenges']['stealthWardsPlaced'],
              "diff_stealthWardsPlaced": playerGameDetails['challenges']['stealthWardsPlaced'] - opponent['challenges']['stealthWardsPlaced'],
            },

            'Crowd Control': {
              "enemyChampionImmobilizations": playerGameDetails['challenges']['enemyChampionImmobilizations'],
              "timeCCingOthers": playerGameDetails['timeCCingOthers'],
              "totalTimeCCDealt": playerGameDetails['totalTimeCCDealt'],  
            },

            'Gold and CS': {
              "enemyJungleMonsterKills": playerGameDetails['challenges']['enemyJungleMonsterKills'],
              "goldPerMinute": playerGameDetails['challenges']['goldPerMinute'],
              "diff_goldPerMinute": playerGameDetails['challenges']['goldPerMinute'] - opponent['challenges']['goldPerMinute'],
              "jungleCsBefore10Minutes": playerGameDetails['challenges']['jungleCsBefore10Minutes'],
              "diff_jungleCsBefore10Minutes": playerGameDetails['challenges']['jungleCsBefore10Minutes'] - opponent['challenges']['jungleCsBefore10Minutes'],
              "laneMinionsFirst10Minutes": playerGameDetails['challenges']['laneMinionsFirst10Minutes'],
              "diff_laneMinionsFirst10Minutes": playerGameDetails['challenges']['laneMinionsFirst10Minutes'] - opponent['challenges']['laneMinionsFirst10Minutes'],
              "maxCsAdvantageOnLaneOpponent": playerGameDetails['challenges']['maxCsAdvantageOnLaneOpponent'],
              "diff_maxCsAdvantage": playerGameDetails['challenges']['maxCsAdvantageOnLaneOpponent'] >= opponent['challenges']['maxCsAdvantageOnLaneOpponent'] ? playerGameDetails['challenges']['maxCsAdvantageOnLaneOpponent'] : opponent['challenges']['maxCsAdvantageOnLaneOpponent'] * -1,
              "maxLevelLeadLaneOpponent": playerGameDetails['challenges']['maxLevelLeadLaneOpponent'],
              "diff_maxLevelLead": playerGameDetails['challenges']['maxLevelLeadLaneOpponent'] >= opponent['challenges']['maxLevelLeadLaneOpponent'] ? playerGameDetails['challenges']['maxLevelLeadLaneOpponent'] : opponent['challenges']['maxLevelLeadLaneOpponent'] * -1,
              "goldEarned": playerGameDetails['goldEarned'],
              "diff_goldEarned": playerGameDetails["goldEarned"] - opponent["goldEarned"],
              "goldSpent": playerGameDetails['goldSpent'],
            },


            'Miscellaneous': {
              "skillshotsDodged": playerGameDetails['challenges']['skillshotsDodged'],
              "skillshotsHit": playerGameDetails['challenges']['skillshotsHit'],
              'abilityUses': playerGameDetails['challenges']['abilityUses'],
              "firstBloodAssist": playerGameDetails['firstBloodAssist'],
              "firstBloodKill": playerGameDetails['firstBloodKill'],
              "totalTimeSpentDead": playerGameDetails['totalTimeSpentDead'],
            },
          }
          return stats;

        }));

        // Use .filter to separate out wins and losses into separate arrays. Could do the same for role specific filtering in the future, though api rate limit will make it hard to get a large enough sample size without multiple delayed requests. Because we will use the data to create averages, .map is used to create a deep copy of each match object so that we don't maintain the reference to the original allMatchData version
        let winMatchData = allMatchData.filter(e => e['win'] == true).map(match => {
          return JSON.parse(JSON.stringify(match))
        })
        let lossMatchData = allMatchData.filter(e => e['win'] == false).map(match => {
          return JSON.parse(JSON.stringify(match))
        })

        console.log(lossMatchData)

        // Define objects to house averages to pass to client
        const allAverage = {}
        const winAverage = {}
        const lossAverage ={}

        // for of loops to run through array of games and add values of each property up in average objects

        for (const match of allMatchData){
          for (const category in match){
            if(!allAverage[category]){
                allAverage[category] = match[category]
              }else{
                for (const stat in match[category]){
                  allAverage[category][stat] += match[category][stat]
                }

              }
          }
        }



        for (const match of winMatchData){
          for (const category in match){
            if(!winAverage[category]){
                winAverage[category] = match[category]
              }else{
                for (const stat in match[category]){
                  winAverage[category][stat] += match[category][stat]
                }

              }
          }
        }

        for (const match of lossMatchData){
          for (const category in match){
            if(!lossAverage[category]){
                lossAverage[category] = match[category]
              }else{
                for (const stat in match[category]){
                  lossAverage[category][stat] += match[category][stat]
                }

              }
          }
        }


        delete allAverage['win']
        delete winAverage['win']
        delete lossAverage['win']

        console.log(allAverage)
        console.log(winAverage)
        console.log(lossAverage)

        // average each object based on array.length ie number of games/wins/losses
        for (const category in allAverage){
          for(const stat in allAverage[category])
          allAverage[category][stat] = (allAverage[category][stat] / allMatchData.length).toFixed(2)
        }

        for (const category in winAverage){
          for(const stat in winAverage[category])
          winAverage[category][stat] = (winAverage[category][stat] / winMatchData.length).toFixed(2)
        }

        for (const category in lossAverage){
          for(const stat in lossAverage[category])
          lossAverage[category][stat] = (lossAverage[category][stat] / lossMatchData.length).toFixed(2)
        }



        // Finally, respond to the client with the data we want to use on the front end.
        res.json({allAverage: allAverage, winAverage: winAverage, lossAverage: lossAverage, wins: winMatchData.length, losses: lossMatchData.length});
      } catch (err) {
        console.log(err);
      }
    }
}


