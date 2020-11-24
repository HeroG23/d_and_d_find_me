module.exports = {
    checkPosts: async(req, res) => {
        const db = req.app.get('db');
        const posts = await db.posts.check_posts();
        res.status(200).send(posts);
    },
    findPost: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const [post] = await db.posts.find_post(+id);
        if (post){
            res.status(200).send(post)
        } else {
            res.status(404).send('This is not the post you are looking for.')
        }
    },
    createPost: async(req, res) => {
        const db = req.app.get('db');
        const {title, content, post_url} = req.body;
        const {user_id} = req.session.user;
        try{
            const post = await db.posts.create_post([title, content, post_url, user_id]);
            res.status(200).send(post)
        } catch(err) {
            console.log('Error occurred when trying to add post', err)
        }
    },
    updatePost: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {content, post_url} = req.body;

        try{
            const post = await db.posts.update_post([+id, content, post_url]);
            res.status(200).send(post)
        }catch(err){
            console.log('Post could not be updated', err)
            res.sendStatus(404)
        }
    },
    deletePost: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;

        try{
            const post = await db.posts.delete_post(+id);
            res.status(200).send(post)
        } catch(err){
            console.log("Gourdn't delete this masterpiece", err);
            res.sendStatus(500);
        }
    }
}