const router = require('express').Router();















//         :
// Comments.insertComment(req.body)
//     .then(comment => {
//         comment ?
//             res.status(200).json({ message: "The comment was successfully added to the database." })
//             :
//             res.status(404).json({ message: `The post with the specified ID ${req.params.id} does not exist.` })
//     })
//     .catch(error => {
//         console.error({ error });
//         res
//             .status(500)
//             .json({ error: "There was an error while saving the comment to the database." });

//     });
// });

module.exports = router;