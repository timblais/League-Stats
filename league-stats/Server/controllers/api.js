

module.exports = {
    getPlayer: async (req, res) => {
      try {
        // Use incoming player name from client to search for the player and return info including puuid:
        let getPlayerInfo = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.id}?api_key=${process.env.LOL_API_KEY}`)
        // returns an object with multiple player properties, including name and puuid
        let player = await getPlayerInfo.json()
        let playerName = player.name
        let puuid = player.puuid
        console.log(player)

        // Use puuid to search for the recent match history of the player
        let getMatchIdList = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=5&api_key=${process.env.LOL_API_KEY}`)
        // returns an array of match ids
        let matches = await getMatchIdList.json()
        console.log(matches)

        // Create Holding object to house data from matches that we care about
        let matchesData = []

        // Loop over the match ids and send api request to get the info for each match. 
        matches.forEach(async matchId => {
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
            "opp_kills": opponent['kills'],
            "opp_deaths": opponent['deaths'],
            "opp_assists": opponent['assists'],
            "opp_takedowns": opponent['challenges']['takedowns'],
            "opp_kda": opponent['challenges']['kda'],
            "opp_killParticipation": opponent['challenges']['killParticipation'],
            
            //Damage
            "opp_teamDamagePercentage": opponent['challenges']['teamDamagePercentage'],
            "opp_damagePerMinute": opponent['challenges']['damagePerMinute'],
            "opp_damageTakenOnTeamPercentage": opponent['challenges']['damageTakenOnTeamPercentage'],
            "opp_totalDamageDealt": opponent['totalDamageDealt'],
            "opp_totalDamageDealtToChampions": opponent['totalDamageDealtToChampions'],
            
            //Vision
            "opp_visionScoreAdvantageLaneOpponent": opponent['challenges']['visionScoreAdvantageLaneOpponent'],
            "opp_visionScorePerMinute": opponent['challenges']['visionScorePerMinute'],
            "opp_wardTakedowns": opponent['challenges']['wardTakedowns'],
            "opp_wardTakedownsBefore20M": opponent['challenges']['wardTakedownsBefore20M'],
            "opp_wardsGuarded": opponent['challenges']['wardsGuarded'],
            "opp_controlWardTimeCoverageInRiverOrEnemyHalf": opponent['challenges']['controlWardTimeCoverageInRiverOrEnemyHalf'],
            "opp_visionScore": opponent['visionScore'],
            "opp_visionWardsBoughtInGame": opponent['visionWardsBoughtInGame'],
            "opp_wardsKilled": opponent['wardsKilled'],
            "opp_wardsPlaced": opponent['wardsPlaced'],
            "opp_controlWardsPlaced": opponent['challenges']['controlWardsPlaced'],
            "opp_stealthWardsPlaced": opponent['challenges']['stealthWardsPlaced'],
            "opp_detectorWardsPlaced": opponent['detectorWardsPlaced'],

            //Crowd Control
            "opp_enemyChampionImmobilizations": opponent['challenges']['enemyChampionImmobilizations'],
            "opp_timeCCingOthers": opponent['timeCCingOthers'],
            "opp_totalTimeCCDealt": opponent['totalTimeCCDealt'],

            //Gold and CS
            "opp_enemyJungleMonsterKills": opponent['challenges']['enemyJungleMonsterKills'],
            "opp_goldPerMinute": opponent['challenges']['goldPerMinute'],
            "opp_jungleCsBefore10Minutes": opponent['challenges']['jungleCsBefore10Minutes'],
            "opp_laneMinionsFirst10Minutes": opponent['challenges']['laneMinionsFirst10Minutes'],
            "opp_maxCsAdvantageOnLaneOpponent": opponent['challenges']['maxCsAdvantageOnLaneOpponent'],
            "opp_maxLevelLeadLaneOpponent": opponent['challenges']['maxLevelLeadLaneOpponent'],
            "opp_goldEarned": opponent['goldEarned'],
            "opp_goldSpent": opponent['goldSpent'],

            //Misc
            "opp_totalTimeSpentDead": opponent['totalTimeSpentDead'],


            
          }
          //Next step: use values from opponent to assign difference values to the stats object. Then push each stats object from each game to matchesData array. 
          // Possibly want to create a filter for wins vs losses as well as for positions:
          // stats[win] == 'win' ? winArray.push : lossArray.push
          // stats[postion] == 'support' ? supportArray.push : etc
          //then loop over the array and average out the values for each property in each game object, package into another object, and return to the client

          console.log(stats)
        });

        res.json({fullPlayer: player});
      } catch (err) {
        console.log(err);
      }
    }
}

