const User = require('../models/user.model')
app.post('/join', async (req, res) => {
    const { username } = req.body;
    const token = serverSideClient.createToken(username);
    try {
      await serverSideClient.updateUser(
        {
          id: username,
          name: username,
        },
        token
      );
    } catch (err) {
      console.log(err);
    }
  
    const admin = { id: 'admin' };
    const channel = serverSideClient.channel('team', 'talkshop', {
      name: 'Talk Shop',
      created_by: admin,
    });
  
    try {
      await channel.create();
      await channel.addMembers([username, 'admin']);
    } catch (err) {
      console.log(err);
    }
  
    return res
      .status(200)
      .json({ user: { username }, token, api_key: process.env.STREAM_API_KEY });
  });