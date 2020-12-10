module.exports = {
  getInfo: async (req, res) => {
    const db = req.app.get("db");
    try {
      const [dm] = await db.auth.get_dm();
      const [player] = await db.auth.get_players();
      const [in_person] = await db.auth.get_offline();
      const [online] = await db.auth.get_online();

      res
        .status(200)
        .send([dm.count, player.count, in_person.count, online.count]);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
