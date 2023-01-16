// eslint-disable-next-line import/extensions
import db from '../database.js';

const { attachements } = db.postAttachments;
const { post } = db.post;

// create post controller
const createPost = async (req, res) => {
  const createdPost = {
    post_title: req.body.title,
    Description: req.body.description,
  };

  // sending post details in the database
  const postDetails = await post.create(createdPost);

  const file = req.files;

  await file.forEach((e) => {
    const attachementDetails = {
      fileName: e.filename,
      originalName: e.originalname,
      post_id: postDetails.dataValues.post_id,
    };
    // sending post attachments to the database
    attachements.create(attachementDetails);
  });

  res.status(200).json({
    message: 'successifully posted',
  });
};

const getPost = async (req, res) => {
  const allPosts = await post.findAll(
    {
      include: {
        model: attachements,
      },
    },
  );

  res.status(200).json({ Posts: allPosts });
};

export {
  createPost, getPost,
};
