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