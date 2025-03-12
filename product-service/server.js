const express = require('express')
const sequelize = require('./config/database')
const dotenv = require('dotenv');
const productRoutes = require('./routes/Product')

dotenv.config();
const app = express();

app.use(express.json());
app.use('/products', productRoutes);


const PORT = process.env.PORT || 5001;

try {
    sequelize.sync().then(() => {
        console.log('Database connection successful');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
} catch (err) {
    console.error(err);
}
