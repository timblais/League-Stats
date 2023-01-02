

module.exports = {
    getPlayer: async (req, res) => {
        try {
          let player = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.id}?api_key=${process.env.LOL_API_KEY}`)
          console.log(player)
          res.json(player);
        } catch (err) {
          console.log(err);
        }
      },
}