const Router = require('express')();
const { isAuth } = require('../controller/user');
const MailboxController = require('../controller/mailboxController');

Router.post('/message', isAuth, MailboxController.createMessages);
Router.get('/message', isAuth, MailboxController.listChannels);
Router.delete('/message/:channelId', isAuth, MailboxController.deleteChannels);
Router.get('/message/:channelId', isAuth, MailboxController.getMessages);
Router.put('/message/:channelId', isAuth, MailboxController.updateUnseenMessage);
Router.get('/message/channel/:userId', isAuth, MailboxController.getchannelByUserId);

module.exports = Router;
