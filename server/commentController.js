module.exports = {
    getComments: async (req, res) => {
        const db = req.app.get('db')
        const {postId} = req.params;
        try {
            const comments = await db.comments.check_comments(+postId)
            res.status(200).send(comments)
        } catch (err) {
            console.log(err)
            res.status(409).send('Could not locate user comments')
        }
    },
    findComment: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const [comment] = await db.comments.find_post(+id);
        if(comment){
            res.status(200).send(comment)
        } else {
            res.status(409).send('Could not locate the comment')
        }
    },
    // findCommentsByUsersPosts: async(req, res)=>{
    //     const db = req.app.get('db');
    //     const {id} = req.params;
    //     const {post_id} = req.body;
    //     const {userId} = req.session.user;
    //     const comments = await db.comments.find_comment_by_users_posts([+id, +post_id, +userId])
    //     if(comments){
    //         res.status(200).send(comments)
    //     } else {
    //         res.status(409).send('Could not locate user comments')
    //     }
    // },
    postComment: async(req, res) => {
        const db = req.app.get('db');
        const {body, post_id} = req.body
        const {userId} = req.session.user;
        try {
            const comment = await db.comments.post_comment([body, userId, post_id]);
            res.status(200).send(comment)
        } catch(err){
            console.log('Error adding comment', err)
            res.sendStatus(500)
        }
    },
    updateComment: async(req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        const {body} = req.body;

        try {
            const comment = await db.comments.update_comment([+id, body]);
            res.status(200).send(comment)
        } catch (err) {
            console.log('Can not update comment', err);
            res.sendStatus(500);
        }
    },
    deleteComment: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        try{
            const comment = await db.comments.delete_comment(+id);
            res.status(200).send(comment);
        } catch(err){
            console.log('Error deleting comment', err);
            res.sendStatus(500);
        }
    }
}