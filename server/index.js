const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');

const app = express();

app.use(express.json());

const client = new OAuth2Client('<client-id>');

app.use(cors());

app.post('/login/google/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '<client-id>'
        });

        const payload = ticket.getPayload();

        if (!payload) {
            throw new Error('Invalid token');
        }

    } catch (err) {
        console.error(err);
        res.json({ message: 'Invalid or expired Google token' });
    }

    // At this point we are sure that the Google Token is valid
    //  and we can register or login the user in our system

    const appToken = 'generated-token'; // generate jwt token, like we do in our login

    res.cookie("authCookie", appToken, {
        httpOnly: true,
        // secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: 'Success!' })
});

const PORT = 3132;
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });
