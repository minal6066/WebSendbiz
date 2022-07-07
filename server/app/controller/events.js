const { EventEmitter } = require('events');
const ProfileView = require('../models/profileViewModel');
const { sendEmail } = require('./emailController');
const eventEmitter = new EventEmitter();

eventEmitter.on('addView', async (user, viewedBy, viewedAt) => {
  const view = await ProfileView.findOne({
    userId: user.id,
    viewedBy: viewedBy.id,
  });
  console.log(view);
  if (!view) {
    console.log(viewedAt);
    const newView = await ProfileView.create({
      viewCount: 1,
      userId: user.id,
      userType: user.user_type,
      viewedBy: viewedBy.id,
      viewedByType: viewedBy.user_type,
      viewedAt,
    });
    return; // console.log('view created', newView);
  }
  view.viewedAt.push(viewedAt);
  view.viewCount = view.viewedAt.length;
  await view.save();
  console.log(view);
  console.log('view updated');
});

eventEmitter.on('sendEmail', async (templateId, email) => {
  try {
    await sendEmail(parseInt(templateId), email);
    console.log('email sent successfully');
  } catch (err) {
    console.log(err);
  }
});

module.exports = eventEmitter;
