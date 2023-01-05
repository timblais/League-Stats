

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
        let getMatchIdList = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=5&api_key=${process.env.LOL_API_KEY}`)
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
            //Name and Position
            "summonerName": playerGameDetails['summonerName'],
            "role": playerGameDetails['role'],
            "win": playerGameDetails['win'],

            //KDA
            "kills": playerGameDetails['kills'],
            "deaths": playerGameDetails['deaths'],
            "assists": playerGameDetails['assists'],
            "takedowns": playerGameDetails['challenges']['takedowns'],
            "kda": playerGameDetails['challenges']['kda'],
            "killParticipation": playerGameDetails['challenges']['killParticipation'],
            
            //Damage
            "teamDamagePercentage": playerGameDetails['challenges']['teamDamagePercentage'],
            "damagePerMinute": playerGameDetails['challenges']['damagePerMinute'],
            "damageTakenOnTeamPercentage": playerGameDetails['challenges']['damageTakenOnTeamPercentage'],
            "totalDamageDealt": playerGameDetails['totalDamageDealt'],
            "totalDamageDealtToChampions": playerGameDetails['totalDamageDealtToChampions'],
            
            //Vision
            "visionScoreAdvantageLaneOpponent": playerGameDetails['challenges']['visionScoreAdvantageLaneOpponent'],
            "visionScorePerMinute": playerGameDetails['challenges']['visionScorePerMinute'],
            "wardTakedowns": playerGameDetails['challenges']['wardTakedowns'],
            "wardTakedownsBefore20M": playerGameDetails['challenges']['wardTakedownsBefore20M'],
            "wardsGuarded": playerGameDetails['challenges']['wardsGuarded'],
            "controlWardTimeCoverageInRiverOrEnemyHalf": playerGameDetails['challenges']['controlWardTimeCoverageInRiverOrEnemyHalf'],
            "visionScore": playerGameDetails['visionScore'],
            "visionWardsBoughtInGame": playerGameDetails['visionWardsBoughtInGame'],
            "wardsKilled": playerGameDetails['wardsKilled'],
            "wardsPlaced": playerGameDetails['wardsPlaced'],
            "controlWardsPlaced": playerGameDetails['challenges']['controlWardsPlaced'],
            "stealthWardsPlaced": playerGameDetails['challenges']['stealthWardsPlaced'],
            "detectorWardsPlaced": playerGameDetails['detectorWardsPlaced'],

            //Crowd Control
            "enemyChampionImmobilizations": playerGameDetails['challenges']['enemyChampionImmobilizations'],
            "timeCCingOthers": playerGameDetails['timeCCingOthers'],
            "totalTimeCCDealt": playerGameDetails['totalTimeCCDealt'],

            //Gold and CS
            "enemyJungleMonsterKills": playerGameDetails['challenges']['enemyJungleMonsterKills'],
            "goldPerMinute": playerGameDetails['challenges']['goldPerMinute'],
            "jungleCsBefore10Minutes": playerGameDetails['challenges']['jungleCsBefore10Minutes'],
            "laneMinionsFirst10Minutes": playerGameDetails['challenges']['laneMinionsFirst10Minutes'],
            "maxCsAdvantageOnLaneOpponent": playerGameDetails['challenges']['maxCsAdvantageOnLaneOpponent'],
            "maxLevelLeadLaneOpponent": playerGameDetails['challenges']['maxLevelLeadLaneOpponent'],
            "goldEarned": playerGameDetails['goldEarned'],
            "goldSpent": playerGameDetails['goldSpent'],

            //Misc
            "skillshotsDodged": playerGameDetails['challenges']['skillshotsDodged'],
            "skillshotsHit": playerGameDetails['challenges']['skillshotsHit'],
            'abilityUses': playerGameDetails['challenges']['abilityUses'],
            "firstBloodAssist": playerGameDetails['firstBloodAssist'],
            "firstBloodKill": playerGameDetails['firstBloodKill'],
            "totalTimeSpentDead": playerGameDetails['totalTimeSpentDead'],

            //Opponent

            //KDA
            // "opp_kills": opponent['kills'],
            // "opp_deaths": opponent['deaths'],
            // "opp_assists": opponent['assists'],
            // "opp_takedowns": opponent['challenges']['takedowns'],
            "opp_kda": opponent['challenges']['kda'],
            'diff_kda': playerGameDetails['challenges']['killParticipation'] - opponent['challenges']['killParticipation'],
            "opp_killParticipation": opponent['challenges']['killParticipation'],
            "diff_kp": playerGameDetails['challenges']['killParticipation'] - opponent['challenges']['killParticipation'],
            
            //Damage
            // "opp_teamDamagePercentage": opponent['challenges']['teamDamagePercentage'],
            // "opp_damagePerMinute": opponent['challenges']['damagePerMinute'],
            // "opp_damageTakenOnTeamPercentage": opponent['challenges']['damageTakenOnTeamPercentage'],
            // "opp_totalDamageDealt": opponent['totalDamageDealt'],
            "opp_totalDamageDealtToChampions": opponent['totalDamageDealtToChampions'],
            "diff_champDamage": playerGameDetails['totalDamageDealtToChampions'] - opponent['totalDamageDealtToChampions'],
            
            //Vision
            // "opp_visionScoreAdvantageLaneOpponent": opponent['challenges']['visionScoreAdvantageLaneOpponent'],
            "opp_visionScorePerMinute": opponent['challenges']['visionScorePerMinute'],
            "diff_visionScorePerMinute": playerGameDetails['challenges']['visionScorePerMinute'] - opponent['challenges']['visionScorePerMinute'],
            "opp_wardTakedowns": opponent['challenges']['wardTakedowns'],
            "diff_wardTakedowns": playerGameDetails['challenges']['wardTakedowns'] - opponent['challenges']['wardTakedowns'],
            // "opp_wardTakedownsBefore20M": opponent['challenges']['wardTakedownsBefore20M'],
            // "opp_wardsGuarded": opponent['challenges']['wardsGuarded'],
            // "opp_controlWardTimeCoverageInRiverOrEnemyHalf": opponent['challenges']['controlWardTimeCoverageInRiverOrEnemyHalf'],
            "opp_visionScore": opponent['visionScore'],
            "diff_visionScore": playerGameDetails['visionScore'] - opponent['visionScore'],
            "opp_visionWardsBoughtInGame": opponent['visionWardsBoughtInGame'],
            "diff_visionWardsBoughtInGame": playerGameDetails['visionWardsBoughtInGame'] - opponent['visionWardsBoughtInGame'],
            "opp_wardsKilled": opponent['wardsKilled'],
            "diff_wardsKilled": playerGameDetails["wardsKilled"] - opponent['wardsKilled'],
            "opp_wardsPlaced": opponent['wardsPlaced'],
            "diff_wardsPlaced": playerGameDetails["wardsPlaced"] - opponent["wardsPlaced"],
            "opp_controlWardsPlaced": opponent['challenges']['controlWardsPlaced'],
            "diff_controlWardsPlaced": playerGameDetails['challenges']['controlWardsPlaced'] - opponent['challenges']['controlWardsPlaced'],
            "opp_stealthWardsPlaced": opponent['challenges']['stealthWardsPlaced'],
            "diff_stealthWardsPlaced": playerGameDetails['challenges']['stealthWardsPlaced'] - opponent['challenges']['stealthWardsPlaced'],
            // "opp_detectorWardsPlaced": opponent['detectorWardsPlaced'],

            //Crowd Control
            // "opp_enemyChampionImmobilizations": opponent['challenges']['enemyChampionImmobilizations'],
            // "opp_timeCCingOthers": opponent['timeCCingOthers'],
            // "opp_totalTimeCCDealt": opponent['totalTimeCCDealt'],

            //Gold and CS
            // "opp_enemyJungleMonsterKills": opponent['challenges']['enemyJungleMonsterKills'],
            "opp_goldPerMinute": opponent['challenges']['goldPerMinute'],
            "diff_goldPerMinute": playerGameDetails['challenges']['goldPerMinute'] - opponent['challenges']['goldPerMinute'],
            "opp_jungleCsBefore10Minutes": opponent['challenges']['jungleCsBefore10Minutes'],
            "diff_jungleCsBefore10Minutes": playerGameDetails['challenges']['jungleCsBefore10Minutes'] - opponent['challenges']['jungleCsBefore10Minutes'],
            "opp_laneMinionsFirst10Minutes": opponent['challenges']['laneMinionsFirst10Minutes'],
            "diff_laneMinionsFirst10Minutes": playerGameDetails['challenges']['laneMinionsFirst10Minutes'] - opponent['challenges']['laneMinionsFirst10Minutes'],
            "opp_maxCsAdvantageOnLaneOpponent": opponent['challenges']['maxCsAdvantageOnLaneOpponent'],
            "diff_maxCsAdvantage": playerGameDetails['challenges']['maxCsAdvantageOnLaneOpponent'] >= opponent['challenges']['maxCsAdvantageOnLaneOpponent'] ? playerGameDetails['challenges']['maxCsAdvantageOnLaneOpponent'] : opponent['challenges']['maxCsAdvantageOnLaneOpponent'] * -1,
            "opp_maxLevelLeadLaneOpponent": opponent['challenges']['maxLevelLeadLaneOpponent'],
            "diff_maxLevelLead": playerGameDetails['challenges']['maxLevelLeadLaneOpponent'] >= opponent['challenges']['maxLevelLeadLaneOpponent'] ? playerGameDetails['challenges']['maxLevelLeadLaneOpponent'] : opponent['challenges']['maxLevelLeadLaneOpponent'] * -1,
            "opp_goldEarned": opponent['goldEarned'],
            "diff_goldEarned": playerGameDetails["goldEarned"] - opponent["goldEarned"],
            // "opp_goldSpent": opponent['goldSpent'],

            //Misc
            // "opp_totalTimeSpentDead": opponent['totalTimeSpentDead'],

          }
          return stats;

        }));

        // Use .filter to separate out wins and losses into separate arrays. Could do the same for role specific filtering in the future, though api rate limit will make it hard to get a large enough sample size without multiple delayed requests
        let winMatchData = allMatchData.filter(e => e['win'] == true)
        let lossMatchData = allMatchData.filter(e => e['win'] == false)

        // Define objects to house averages to pass to client
        const allAverage = {}
        const winAverage = {}
        const lossAverage ={}

        // for of loops to run through array of games and add values of each property up in average objects

        for (const match of allMatchData){
          for (const prop in match){
            if(!allAverage[prop]){
                allAverage[prop] = match[prop]
              }else{
                allAverage[prop] += match[prop]
              }
          }
        }

        for (const match of winMatchData){
          for (const prop in match){
            if(!winAverage[prop]){
                winAverage[prop] = match[prop]
              }else{
                winAverage[prop] += match[prop]
              }
          }
        }

        for (const match of lossMatchData){
          for (const prop in match){
            if(!lossAverage[prop]){
                lossAverage[prop] = match[prop]
              }else{
                lossAverage[prop] += match[prop]
              }
          }
        }

        // average each object based on array.length ie number of games/wins/losses
        for (let prop in allAverage){
          allAverage[prop] = allAverage[prop] / allMatchData.length
        }

        for (let prop in winAverage){
          winAverage[prop] = winAverage[prop] / winMatchData.length
        }

        for (let prop in lossAverage){
          lossAverage[prop] = lossAverage[prop] / lossMatchData.length
        }

        // Finally, respond to the client with the data we want to use on the front end.
        res.json({fullPlayer: player, allAverage: allAverage, winAverage: winAverage, lossAverage: lossAverage, wins: winMatchData.length, losses: lossMatchData.length});
      } catch (err) {
        console.log(err);
      }
    }
}


