const amqp = require('amqplib/callback_api');
require('dotenv').config();


// const url = 'amqps://weunsyzl:pW-GwMPkHyzEYSdFR95JRwWeh3PgzXlc@lionfish.rmq.cloudamqp.com/weunsyzl';
const url = process.env.MESSAGE_BROKER_URL;
console.log(url);

amqp.connect(url, function(error0, connection) {
  if (error0) {
    console.error('Failed to connect:', error0);
    process.exit(1);
  }
  console.log('Successfully connected to RabbitMQ');
  connection.close();
});
