import app from './src/config/custon-express'
import db from './src/config/database'


db('localhost/alexandrina');

app.listen(3000, () => {
  console.log("🚀 Server started on http://localhost:3000");
});