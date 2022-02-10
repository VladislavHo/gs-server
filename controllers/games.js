const igdb = require("igdb-api-node").default;
require("dotenv").config();

class GamesIGDB {
  async getGameSearch(req, res) {
    const { game = null, id = null } = req.body;
    try {
      const response = await igdb(
        process.env.YOUR_TWITCH_CLIENT_ID,
        process.env.YOUR_TWITCH_APP_ACCESS_TOKEN
      )
        .fields([
          "name",
          "screenshots.*",
          "themes.*",
          "platforms.*",
          "cover.*",
          "rating",
          "involved_companies.*",
          "first_release_date",
          "genres.*",
          "storyline",
          "summary",
          "videos.*",
        ])
        .where(id)
        .limit(350)
        .search(game)
        .request("/games");

      return res.send(response.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  async getGenresofGames(req, res) {
    try {
      const response = await igdb(
        process.env.YOUR_TWITCH_CLIENT_ID,
        process.env.YOUR_TWITCH_APP_ACCESS_TOKEN
      )
        .fields(["*"])
        .limit(350)
        .request("/genres");

      return res.send(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getGamesOnGenres(req, res) {
    const { id } = req.body;
    try {
      const response = await igdb(
        process.env.YOUR_TWITCH_CLIENT_ID,
        process.env.YOUR_TWITCH_APP_ACCESS_TOKEN
      )
      .fields([
        "name",
        "screenshots.*",
        "themes.*",
        "platforms.*",
        "cover.*",
        "rating",
        "involved_companies.*",
        "first_release_date",
        "genres.*",
        "storyline",
        "summary",
        "videos.*",
      ])
        .limit(200)
        .sort('rating')
        .where([`genres = ('${id}')`, 'rating > 40'])
  
        .request(`/games`);

      return res.send(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getThemesOfGames(req, res) {
    try {
      const response = await igdb(
        process.env.YOUR_TWITCH_CLIENT_ID,
        process.env.YOUR_TWITCH_APP_ACCESS_TOKEN
      )
        .fields(["*"])
        .limit(200)
        .request("/themes");

      return res.send(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getGamesOnThemes(req, res) {
    const { id } = req.body;
    try {
      const response = await igdb(
        process.env.YOUR_TWITCH_CLIENT_ID,
        process.env.YOUR_TWITCH_APP_ACCESS_TOKEN
      )
      .fields([
        "name",
        "screenshots.*",
        "themes.*",
        "platforms.*",
        "cover.*",
        "rating",
        "involved_companies.*",
        "first_release_date",
        "genres.*",
        "storyline",
        "summary",
        "videos.*",
      ])
        .limit(200)
        .sort('rating')
        .where([`themes = ('${id}')`, 'rating > 40'])
        .request(`/games`);

      return res.send(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getPlatformsOfGames(req, res) {
    try {
      const response = await igdb(
        process.env.YOUR_TWITCH_CLIENT_ID,
        process.env.YOUR_TWITCH_APP_ACCESS_TOKEN
      )
        .fields(["*"])
        .limit(200)
        .request("/platforms");

      return res.send(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getGamesOnPlatforms(req, res) {
    const { id } = req.body;
    try {
      const response = await igdb(
        process.env.YOUR_TWITCH_CLIENT_ID,
        process.env.YOUR_TWITCH_APP_ACCESS_TOKEN
      )
      .fields([
        "name",
        "screenshots.*",
        "themes.*",
        "platforms.*",
        "cover.*",
        "rating",
        "involved_companies.*",
        "first_release_date",
        "genres.*",
        "storyline",
        "summary",
        "videos.*",
      ])
        .limit(200)
        .sort('rating')
        .where([`platforms = ('${id}')`, 'rating > 40'])
        .request(`/games`);

      return res.send(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new GamesIGDB();
