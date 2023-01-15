

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

            'K/D/A and Damage': {
              "Kills": playerGameDetails['kills'],
              "Deaths": playerGameDetails['deaths'],
              "Assists": playerGameDetails['assists'],
              "Takedowns": playerGameDetails['challenges']['takedowns'],
              "K/D/A": playerGameDetails['challenges']['kda'],
              'K/D/A Difference': playerGameDetails['challenges']['killParticipation'] - opponent['challenges']['killParticipation'],
              "Kill Participation": playerGameDetails['challenges']['killParticipation'],
              "Kill Participation Difference": playerGameDetails['challenges']['killParticipation'] - opponent['challenges']['killParticipation'],
              "Team Damage Dealt": playerGameDetails['challenges']['teamDamagePercentage'],
              "Damage Per Minute": playerGameDetails['challenges']['damagePerMinute'],
              "Team Damage Taken": playerGameDetails['challenges']['damageTakenOnTeamPercentage'],
              "Total Damage Dealt": playerGameDetails['totalDamageDealt'],
              "Champion Damage Dealt": playerGameDetails['totalDamageDealtToChampions'],
              "Champion Damage Difference": playerGameDetails['totalDamageDealtToChampions'] - opponent['totalDamageDealtToChampions'],
            },
            
            'Vision': {
              "Vision Score Per Minute": playerGameDetails['challenges']['visionScorePerMinute'],
              "Vision Score/Min Difference": playerGameDetails['challenges']['visionScorePerMinute'] - opponent['challenges']['visionScorePerMinute'],
              "Total Vision Score": playerGameDetails['visionScore'],
              "Vision Score Difference": playerGameDetails['visionScore'] - opponent['visionScore'],
              "Wards Killed": playerGameDetails['wardsKilled'],
              "Wards Killed Difference": playerGameDetails["wardsKilled"] - opponent['wardsKilled'],
              "Wards Placed": playerGameDetails['wardsPlaced'],
              "Wards Placed Difference": playerGameDetails["wardsPlaced"] - opponent["wardsPlaced"],
              "Control Wards Purchased": playerGameDetails['visionWardsBoughtInGame'],
              "Control Wards Purchased Difference": playerGameDetails['visionWardsBoughtInGame'] - opponent['visionWardsBoughtInGame'],
              "Control Wards Placed": playerGameDetails['challenges']['controlWardsPlaced'],
              "Control Wards Placed Difference": playerGameDetails['challenges']['controlWardsPlaced'] - opponent['challenges']['controlWardsPlaced'],
              "Stealth Wards Placed": playerGameDetails['challenges']['stealthWardsPlaced'],
              "Stealth Wards Difference": playerGameDetails['challenges']['stealthWardsPlaced'] - opponent['challenges']['stealthWardsPlaced'],
            },

            'Gold and CS': {
              "Gold Per Minute": playerGameDetails['challenges']['goldPerMinute'],
              "Gold Per Minute Difference": playerGameDetails['challenges']['goldPerMinute'] - opponent['challenges']['goldPerMinute'],
              "Gold Earned": playerGameDetails['goldEarned'],
              "Gold Earned Difference": playerGameDetails["goldEarned"] - opponent["goldEarned"],
              "Gold Spent": playerGameDetails['goldSpent'],
              "CS at 10 Minutes": playerGameDetails['challenges']['laneMinionsFirst10Minutes'],
              "CS at 10 Minutes Difference": playerGameDetails['challenges']['laneMinionsFirst10Minutes'] - opponent['challenges']['laneMinionsFirst10Minutes'],
              "Max CS Advantage vs Opponent": playerGameDetails['challenges']['maxCsAdvantageOnLaneOpponent'],
              "Max CS Advantage/Deficit": playerGameDetails['challenges']['maxCsAdvantageOnLaneOpponent'] >= opponent['challenges']['maxCsAdvantageOnLaneOpponent'] ? playerGameDetails['challenges']['maxCsAdvantageOnLaneOpponent'] : opponent['challenges']['maxCsAdvantageOnLaneOpponent'] * -1,
              "Max Level Lead vs Opponent": playerGameDetails['challenges']['maxLevelLeadLaneOpponent'],
              "Max Level Lead/Deficit": playerGameDetails['challenges']['maxLevelLeadLaneOpponent'] >= opponent['challenges']['maxLevelLeadLaneOpponent'] ? playerGameDetails['challenges']['maxLevelLeadLaneOpponent'] : opponent['challenges']['maxLevelLeadLaneOpponent'] * -1,
              "Jungle CS at 10 Minutes": playerGameDetails['challenges']['jungleCsBefore10Minutes'],
              "Jungle Cs at 10 Minutes Difference": playerGameDetails['challenges']['jungleCsBefore10Minutes'] - opponent['challenges']['jungleCsBefore10Minutes'],
              "Enemy Jungle Monsters Killed": playerGameDetails['challenges']['enemyJungleMonsterKills'],
            },


            'Miscellaneous/Crowd Control': {
              "Enemy Champion Immobilizations": playerGameDetails['challenges']['enemyChampionImmobilizations'],
              "Time Applying Crowd Control": playerGameDetails['timeCCingOthers'],
              "Skillshots Dodged": playerGameDetails['challenges']['skillshotsDodged'],
              "Skillshots Hit": playerGameDetails['challenges']['skillshotsHit'],
              'Ability Uses': playerGameDetails['challenges']['abilityUses'],
              "First Blood Assist": playerGameDetails['firstBloodAssist'],
              "First Blood Kill": playerGameDetails['firstBloodKill'],
              "Time Spent Dead (Seconds)": playerGameDetails['totalTimeSpentDead'],
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


        // Update average stats for percentages to convert to percentage display instead of decimal
        allAverage['K/D/A and Damage']['Kill Participation'] = `${(allAverage['K/D/A and Damage']['Kill Participation'] * 100).toFixed(0)}%`
        allAverage['K/D/A and Damage']['Kill Participation Difference'] = `${(allAverage['K/D/A and Damage']['Kill Participation Difference'] * 100).toFixed(0)}%`
        allAverage['K/D/A and Damage']['Team Damage Dealt'] = `${(allAverage['K/D/A and Damage']['Team Damage Dealt'] * 100).toFixed(0)}%`
        allAverage['Miscellaneous/Crowd Control']['First Blood Assist'] = `${(allAverage['Miscellaneous/Crowd Control']['First Blood Assist'] * 100).toFixed(0)}%`
        allAverage['Miscellaneous/Crowd Control']['First Blood Kill'] = `${(allAverage['Miscellaneous/Crowd Control']['First Blood Kill'] * 100).toFixed(0)}%`

        winAverage['K/D/A and Damage']['Kill Participation'] = `${(winAverage['K/D/A and Damage']['Kill Participation'] * 100).toFixed(0)}%`
        winAverage['K/D/A and Damage']['Kill Participation Difference'] = `${(winAverage['K/D/A and Damage']['Kill Participation Difference'] * 100).toFixed(0)}%`
        winAverage['K/D/A and Damage']['Team Damage Dealt'] = `${(winAverage['K/D/A and Damage']['Team Damage Dealt'] * 100).toFixed(0)}%`
        winAverage['Miscellaneous/Crowd Control']['First Blood Assist'] = `${(winAverage['Miscellaneous/Crowd Control']['First Blood Assist'] * 100).toFixed(0)}%`
        winAverage['Miscellaneous/Crowd Control']['First Blood Kill'] = `${(winAverage['Miscellaneous/Crowd Control']['First Blood Kill'] * 100).toFixed(0)}%`

        lossAverage['K/D/A and Damage']['Kill Participation'] = `${(lossAverage['K/D/A and Damage']['Kill Participation'] * 100).toFixed(0)}%`
        lossAverage['K/D/A and Damage']['Kill Participation Difference'] = `${(lossAverage['K/D/A and Damage']['Kill Participation Difference'] * 100).toFixed(0)}%`
        lossAverage['K/D/A and Damage']['Team Damage Dealt'] = `${(lossAverage['K/D/A and Damage']['Team Damage Dealt'] * 100).toFixed(0)}%`
        lossAverage['Miscellaneous/Crowd Control']['First Blood Assist'] = `${(lossAverage['Miscellaneous/Crowd Control']['First Blood Assist'] * 100).toFixed(0)}%`
        lossAverage['Miscellaneous/Crowd Control']['First Blood Kill'] = `${(lossAverage['Miscellaneous/Crowd Control']['First Blood Kill'] * 100).toFixed(0)}%`

        console.log(allAverage['K/D/A and Damage'])

        // Finally, respond to the client with the data we want to use on the front end.
        res.json({playerName: playerName, allAverage: allAverage, winAverage: winAverage, lossAverage: lossAverage, wins: winMatchData.length, losses: lossMatchData.length});
      } catch (err) {
        console.log(err);
      }
    }
}


