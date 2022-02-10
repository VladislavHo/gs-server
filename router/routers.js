const Router = require('express').Router
const User = require("../controllers/user")
const GamesIGDB = require("../controllers/games")

const router = new Router()

router.post('/auth/registration', User.registration)

router.post('/auth/login', User.login)

router.post('/search-games', GamesIGDB.getGameSearch)

router.get('/genres', GamesIGDB.getGenresofGames)
router.get('/themes', GamesIGDB.getThemesOfGames)
router.get('/platforms', GamesIGDB.getPlatformsOfGames)

router.post('/game-on-genres', GamesIGDB.getGamesOnGenres)
router.post('/game-on-themes', GamesIGDB.getGamesOnThemes)
router.post('/game-on-platforms', GamesIGDB.getGamesOnPlatforms)

router.post('/update-basket', User.updataBasket)

router.post('/remove-basket', User.removeBasket)

module.exports = router