

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
        let matchesData = {}

        // Loop over the match ids and send api request to get the info for each match. 
        matches.forEach(async matchId => {
          let getMatchData = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.LOL_API_KEY}`)
          //next step: parse through the match data to pull pertinent info and organize into easy to digest objects for front end to use
        });

        res.json({fullPlayer: player});
      } catch (err) {
        console.log(err);
      }
    }
}

