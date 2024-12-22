import app from './app.js';
import dotenv from 'dotenv';
import { testConnection } from './database/connection.js';

dotenv.config();

app.set('port', process.env.PORT || 3000);

app.use("/", (req, res) => {
  res.send("Soy una API");
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});

app.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} está en uso. Liberando...`);
  }
});
// Probar la conexión a la base de datos
testConnection();