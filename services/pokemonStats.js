const cpMultiplier = require('../public/resources/cp_multiplier.json')
const max_level = 51

export function calculateCP(attack, defense, stamina, level) {
    const cpm = cpMultiplier[level]
    const cp = Math.floor(attack * Math.sqrt(defense) * Math.sqrt(stamina) * cpm * cpm / 10)
    return (
        Math.max(cp, 10)
    )
}

export function calculateMaxLevel(attack, defense, stamina, maxCp) {
    let level = 1
    let cp = calculateCP(attack, defense, stamina, level)
    while (level < max_level && cp <= maxCp) {
        if (calculateCP(attack, defense, stamina, level + 0.5) > maxCp) {
            break
        } else {
            level += 0.5
            cp = calculateCP(attack, defense, stamina, level) 
        }
    }
    return level
}

export function calculateAtk(attack, level) {
    const cpm = cpMultiplier[level]
    return (attack * cpm)
}

export function calculateDef(defense, level) {
    const cpm = cpMultiplier[level]
    return (defense * cpm)
}

export function calculateSta(stamina, level) {
    const cpm = cpMultiplier[level]
    return (stamina * cpm)
}


export function calculateStatsProduct(attack, defense, stamina) {
    return (attack * defense * stamina)
}

export function getCPMByLevel(level) {
    const cpm = cpMultiplier[level]
    if (cpm !== undefined) {
        return  cpm
    } else {
        return "CPM not found for " + level
    }
}