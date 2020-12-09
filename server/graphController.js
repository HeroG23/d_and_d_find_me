module.exports ={
    getInfo: async (req, res) => {
        const db = req.app.get('db');
        const [dm] = await db.auth.get_dm();
        const [player] = await db.auth.get_players();

        res.status(200).send([dm.count, player.count])
    }
}