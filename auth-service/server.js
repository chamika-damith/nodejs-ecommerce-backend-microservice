const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./config/database')
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 5003;

try {
    sequelize.sync().then(() => {
        console.log('Database connection successful');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
} catch (err) {
    console.error(err);
}
